# Storing ad attribution on bookings — backend guide

What to change in `diving-club-backend` so a booking row records which ad paid for it.

The frontend side is **done and deployed-ready**. It now posts one extra key with every booking:

```json
{
  "name": "…", "email": "…", "item": "…",
  "attribution": {
    "gclid": "CjwKCAjw...",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "trinco-diving",
    "landing_page": "/dive",
    "referrer": "https://www.google.com/",
    "clicked_at": "2026-08-02T10:38:34.577Z"
  }
}
```

The key is **absent entirely** on organic traffic — no empty object to special-case.
Possible keys: `gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
`utm_content`, `landing_page`, `referrer`, `clicked_at`. All strings.

> Nothing breaks if you ship the frontend first — `$request->validate()` just ignores the unknown
> key. But every booking taken before these four changes land loses its attribution permanently,
> so do them soon.

---

## a. Migration

```bash
php artisan make:migration add_attribution_to_bookings_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * One JSON column rather than eleven string columns. These keys are read, never joined on,
     * and Google keeps adding click-id types — gbraid and wbraid were themselves additions.
     * NULL means organic, so `whereNotNull('attribution')` is "came from a campaign".
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->json('attribution')->nullable()->after('admin_notes');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('attribution');
        });
    }
};
```

You're on SQLite, where `json` maps to TEXT — but the JSON1 extension is built in, so
`Booking::whereNotNull('attribution->gclid')->count()` still works if you ever want to count
ad-driven bookings directly.

## b. `app/Models/Booking.php`

Two lines:

```diff
     protected $fillable = [
         …
         'status', 'payment_status', 'notes', 'admin_notes',
+        'attribution',
         'payment_gateway_id', 'paid_at', 'deposit_paid_at',
     ];

     protected function casts(): array
     {
         return [
             'booking_date' => 'date',
             …
             'deposit_paid_at' => 'datetime',
+            'attribution' => 'array',
         ];
     }
```

## c. `app/Http/Controllers/Api/BookingController.php` — `store()`

Add the import:

```php
use Illuminate\Support\Arr;
```

Add to the `$request->validate([…])` array, after `'discount_code'`:

```php
'attribution' => ['nullable', 'array'],
'attribution.*' => ['nullable', 'string', 'max:500'],   // strings only, no nested payloads
```

Add to the `Booking::create([…])` call, after `'notes'`:

```php
// Whitelisted, not stored as-received: this endpoint is public and unauthenticated, so
// without Arr::only anyone can POST arbitrary keys straight into the database.
'attribution' => array_filter(Arr::only($validated['attribution'] ?? [], [
    'gclid', 'gbraid', 'wbraid',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'landing_page', 'referrer', 'clicked_at',
])) ?: null,
```

The `?: null` keeps organic bookings NULL instead of `{}`. The `array_filter` drops empty strings so
a half-tagged URL doesn't leave `"utm_term": ""` sitting in the record.

That's the whole write path. `Booking::create()` already runs inside `store()`, and the discount
logic afterwards only touches price columns, so nothing else moves.

## d. Admin — surface it

`Admin\BookingController@show` passes the model straight to Inertia, so once (b) is done the cast
array is already on the page. **No PHP change needed here** — only the view.

`resources/js/pages/admin/bookings/show.tsx` — add a "Came from" block:

```tsx
{booking.attribution && (
  <section>
    <h3>Came from</h3>
    <dl>
      <dt>Campaign</dt><dd>{booking.attribution.utm_campaign ?? '—'}</dd>
      <dt>Source / medium</dt>
      <dd>{[booking.attribution.utm_source, booking.attribution.utm_medium].filter(Boolean).join(' / ') || '—'}</dd>
      <dt>Landed on</dt><dd>{booking.attribution.landing_page ?? '—'}</dd>
      {/* Small and muted — this is for the offline upload job, not for reading. */}
      <dt>Click ID</dt>
      <dd className="font-mono text-xs opacity-60 break-all">
        {booking.attribution.gclid ?? booking.attribution.wbraid ?? booking.attribution.gbraid ?? '—'}
      </dd>
    </dl>
  </section>
)}
```

Render nothing when it's null — an "unknown / organic" row on every second booking is noise.

**Optional**, `resources/js/pages/admin/bookings/index.tsx`: a small "Ads" badge on rows where
`booking.attribution` is set, so paid bookings are countable at a glance. Needs
`Admin\BookingController@index` to keep the column — it already selects everything, so no change.

`app/Http/Resources/BookingResource.php` — **leave alone.** It carries the gclid and nothing
currently consumes it on the public API.

---

## Verify

```bash
php artisan migrate
php artisan serve
```

Then from the frontend (`pnpm dev`), open
`http://localhost:3000/dive?gclid=TEST123&utm_source=google&utm_medium=cpc&utm_campaign=trinco-diving`
and submit the form. Back in the backend:

```bash
php artisan tinker --execute="dump(App\Models\Booking::latest()->first()->attribution);"
```

You should see the array with `gclid => "TEST123"`. Then open that booking in the admin and confirm
the "Came from" block renders.

Two negative checks worth doing, because they're the ones that go wrong quietly:

1. **Organic stays clean.** Submit from `/book` in a fresh incognito window with no query params →
   `attribution` is `NULL`, not `{}`.
2. **Junk is rejected.** `curl` the booking endpoint with `"attribution": {"evil": "x", "gclid": "ok"}`
   → the stored array contains `gclid` only.

⚠️ Test submissions create real booking rows and email the admin address. Delete them afterwards.

---

## What this sets up next

The `gclid` is the one field you can't backfill — Google's click window is 90 days, so any click not
captured is gone for good. Once you have a few weeks of confirmed bookings carrying one, you can
build the offline "Booking confirmed" upload described in Part 3 of
[`google-ads-conversion-tracking.md`](./google-ads-conversion-tracking.md) — matching on
`order_id` = the booking `reference`, which the browser already sends as `transaction_id`.

Note the 2026 change covered in that doc: since **15 June 2026** offline conversion uploads must go
through the **Data Manager API**, not `UploadClickConversion` in the Google Ads API, unless your
developer token was already using it between January and June 2026. The Python client already set up
at the workspace root (`test_connection.py`, `get_refresh_token.py`) authenticates fine for reads
either way.

The contacts table gets none of this. Deliberate — a contact form message isn't a booking, and one
funnel is enough to get right first.
