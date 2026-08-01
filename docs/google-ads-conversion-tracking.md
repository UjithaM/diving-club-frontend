# Google Ads conversion tracking — setup guide

Everything needed to get the booking form reporting into Google Ads, end to end.

The Google Ads UI steps are yours to click. The code side is already written — where a step needs
a code change it says so and shows exactly what changes.

**Accounts and IDs used here**

| Thing | Value |
|---|---|
| Google Ads conversion ID | `AW-18356209738` |
| GTM container | `GTM-MGSS98BV` |
| WhatsApp conversion (already live) | `AW-18356209738/OOyDCM3yktgcEMqQ9rBE` |
| Booking form conversion | **not created yet — that's Part 1** |

---

## What already works, and what doesn't

Both tags load in [`app/layout.tsx`](../app/layout.tsx). All tracking goes through one helper,
[`lib/ads.ts`](../lib/ads.ts), which pushes a GTM dataLayer event and — when a `send_to` is
present — fires the Google Ads conversion.

| Event | Fires from | dataLayer | Ads conversion |
|---|---|---|---|
| `whatsapp_click` | [`WhatsAppCta.tsx`](../components/ads/WhatsAppCta.tsx) | ✅ | ✅ live |
| `booking_submit` | [`AdBookingForm.tsx`](../components/ads/AdBookingForm.tsx) | ✅ | ❌ **`send_to` is blank** |
| `book_click` | [`BookCta.tsx`](../components/ads/BookCta.tsx) | ✅ | — deliberately none (it's a scroll, not a lead) |

That one blank string is the whole problem:

```ts
// lib/ads.ts
export const CONVERSIONS = {
  whatsapp: `${ADS_ID}/OOyDCM3yktgcEMqQ9rBE`,
  form: "",   // ← nothing reaches Google Ads
};
```

`trackConversion` returns early on an empty `send_to`, so the dataLayer event still fires and GTM
still sees it — but Google Ads never hears about a single form booking. **Smart Bidding is
currently optimising on WhatsApp clicks alone**, and is blind to the higher-intent lead.

The payload is already correct and needs no changes:

```ts
trackConversion("booking_submit", CONVERSIONS.form, {
  data: { source, item: itemName },
  conversion: {
    value: selected ? selected.price * (Number(people) || 1) : undefined,
    currency: selected?.currency ?? "USD",
    transaction_id: data.reference ?? undefined,   // the booking reference
  },
  userData: { email, phone_number: phone },        // phone is E.164
});
```

---

## Two things that changed in 2026

Most tutorials online are now wrong about these. Both are worth knowing before you start.

1. **Offline conversion uploads moved to the Data Manager API.** Since **15 June 2026**,
   `UploadClickConversion` in the Google Ads API fails for any developer token that wasn't already
   using it. A new integration must use the **Data Manager API**. This matters for Part 3.
2. **Enhanced conversions for web and leads became a single setting** (April 2026). You no longer
   pick an implementation method — Google accepts user-provided data from the site tag, Data
   Manager and API connections at the same time.

---

# Part 1 — The enquiry conversion

Goal: a form submit shows up in Google Ads.

### Step 1. Create the conversion action

**Google Ads → Goals → Conversions → Summary → + New conversion action → Website.**

Enter `divingclub.lk`. When it offers to scan the site, choose to **add the action manually**
instead — the scan-based flow doesn't hand you the label, and you need the label.

| Setting | Choose | Why |
|---|---|---|
| Goal category | **Submit lead form** | Tells Ads this is a lead, not a purchase. Drives the reporting bucket and some bidding defaults. |
| Conversion name | `Booking form submitted` | Name it for what it *is* — an enquiry. Part 3 adds a separate "confirmed" action, and you'll thank yourself for not calling this one "Booking". |
| Value | **Use different values for each conversion** | The code sends `price × people`. Without this setting, Ads throws that number away and counts every lead as equal. |
| Default value | e.g. `100` | Used when the code sends no value — which happens when someone picks *"Not sure yet — help me choose"*, since there's no item and therefore no price. |
| Count | **One** | One person enquiring three times is one lead. "Every" would let a single indecisive visitor look like three conversions. |
| Click-through window | 30 days | Diving trips get researched days before booking. |
| Attribution model | **Data-driven** | Leave it. Part 3 (enhanced conversions for leads) requires a Google-default model. |

### Step 2. Get the conversion label

After creating it, open the action → **Tag setup** → **Install the tag yourself**. You'll see an
event snippet like:

```js
gtag('event', 'conversion', {
    'send_to': 'AW-18356209738/AbC-D_efGhIjKlMnOp',
    'value': 1.0,
    'currency': 'USD'
});
```

**Copy the whole `send_to` value.** That's the only thing needed from this screen — ignore the rest
of the snippet, the code already does all of it.

> Do **not** paste the snippet into the site. The Google tag is already installed sitewide, and the
> event is already being fired from the form. Adding the snippet would double-count.

### Step 3. Put the label in the code

One line in [`lib/ads.ts`](../lib/ads.ts):

```diff
  export const CONVERSIONS = {
    whatsapp: `${ADS_ID}/OOyDCM3yktgcEMqQ9rBE`,
-   form: "",
+   form: `${ADS_ID}/AbC-D_efGhIjKlMnOp`,
  };
```

Deploy. That's the entire code change for Part 1.

### Step 4. Verify

1. **Browser.** Open `/dive`, DevTools console, submit the form with real details. You should see
   the dataLayer entry and the conversion call, with `transaction_id` matching the booking
   reference shown on the success screen:
   ```js
   dataLayer.filter(e => e.event === 'booking_submit')
   ```
2. **Tag Assistant.** [tagassistant.google.com](https://tagassistant.google.com) → connect to the
   live URL → submit the form → confirm a Google Ads Conversion tag fired with your label.
3. **Google Ads.** The action sits at **"Unverified"** until it records real data — allow up to
   24 hours. Then check **Goals → Conversions → Diagnostics** for warnings.

⚠️ Test submissions create real bookings in the Laravel admin. Tell whoever watches WhatsApp, and
delete the test rows afterwards.

---

# Part 2 — Enhanced conversions for leads

Improves match rates by sending hashed customer data alongside the conversion. The code already
sends it; this switches on the receiving end.

### Step 5. Turn it on and accept the terms

**Goals → Settings → Enhanced conversions → turn on**, then **accept the customer data terms**.

This is a legal step, not a checkbox. You are asserting you have the right to send Google hashed
customer data. Your form collects email and phone for the purpose of confirming a booking — make
sure your privacy policy says data may be shared with advertising partners in hashed form.

### Step 6. Confirm auto-tagging

**Admin → Account settings → Auto-tagging** must be on, or GCLIDs never land and matching degrades.

### Step 7. Understand what the code sends — and don't "fix" it

```ts
if (opts.userData) window.gtag?.("set", "user_data", opts.userData);
window.gtag?.("event", "conversion", { send_to: sendTo, ...opts.conversion });
```

Two things worth knowing, because both look like bugs and aren't:

- **The email and phone are sent unhashed.** That is correct. The Google tag normalises and
  SHA-256-hashes them in the browser before anything leaves the page. Hashing them yourself first
  would produce a double hash and break every match.
- **`set user_data` must come before the conversion event.** It does. Don't reorder them.

The phone arrives as E.164 (`+94771234567`) from `react-phone-number-input`, which is the format
Google requires.

A code change already shipped for this: `gtag('config', …)` in [`app/layout.tsx`](../app/layout.tsx)
now passes `allow_enhanced_conversions: true`.

---

# Part 3 — Confirmed bookings

**This is the part that decides whether the ad spend works.**

A form submit is an *enquiry*. Your team confirms on WhatsApp afterwards, and some fraction never
convert — wrong dates, no reply, price. If Google Ads only ever sees enquiries, Smart Bidding
optimises for **people who fill in forms**, which is not the same as people who go diving. It will
happily find you cheap enquiries that never book.

The fix is to report the confirmed booking back to Ads.

### Step 8. Create a second conversion action

**+ New conversion action → Import → From clicks.**

| Setting | Choose |
|---|---|
| Name | `Booking confirmed` |
| Category | **Qualified lead** or **Converted lead** |
| Value | Use different values — send the real booking value |
| Count | One |
| Primary / secondary | **Secondary for the first 2–3 weeks** |

Keeping it secondary at first means it reports without steering bidding, so a thin first fortnight
of data can't wreck your campaigns.

### Step 9. Upload from the Laravel backend

When your admin marks a booking confirmed, push it to Google via the **Data Manager API** (not the
Google Ads API — see the 2026 note above).

What to send:

| Field | Value |
|---|---|
| Conversion action | `Booking confirmed` |
| `order_id` | The booking reference — the same one the browser sent as `transaction_id`. This is what deduplicates the two. |
| User identifiers | SHA-256 hashed email and/or E.164 phone from the booking record |
| Conversion time | When it was confirmed |
| Value / currency | What they're actually paying |

Upload **daily**, and upload **every** confirmed booking including ones that didn't come from
Google — the model needs the negatives to learn from.

> This step is a project in your Laravel repo, not this one. It's the only piece of the funnel that
> isn't already built.

### Step 10. Switch what you bid on

Once `Booking confirmed` has meaningful volume (~30 conversions in 30 days):

- Promote **Booking confirmed** → primary
- Demote **Booking form submitted** → secondary

That's the moment the campaign stops buying enquiries and starts buying divers.

---

## Where you should end up

| Conversion action | Source | Fires when | Primary? |
|---|---|---|---|
| WhatsApp click | Website (gtag) | Any WhatsApp CTA clicked | Primary |
| Booking form submitted | Website (gtag) | Form submits successfully | Primary → later secondary |
| Booking confirmed | Import from clicks | Admin confirms the booking | Secondary → later primary |

## Troubleshooting

| Symptom | Cause |
|---|---|
| Action stuck "Unverified" past 24h | Label wrong or not deployed. Check the rendered page for your label. |
| Conversions recorded but no value | "Use different values" not set on the action. |
| Value present but wrong | Someone picked "Not sure yet" — no item, so the action's default value is used. Working as intended. |
| Enhanced conversions warning in Diagnostics | Terms not accepted, or data being hashed twice. The code must send plaintext. |
| Counts roughly double | The event snippet from Step 2 was pasted into the site as well as being fired from the form. Remove the snippet. |
| Confirmed bookings double-counting the form submit | `order_id` on the upload doesn't match the browser's `transaction_id`. |

## Sources

- [Use the Google tag for Google Ads conversion tracking](https://support.google.com/google-ads/answer/7548399)
- [Enhanced conversions for leads implementation checklist](https://support.google.com/google-ads/answer/16782203)
- [Configure the Google tag for enhanced conversions for leads](https://support.google.com/google-ads/answer/11021502)
- [Manage offline conversions — Data Manager API migration](https://developers.google.com/google-ads/api/docs/conversions/upload-offline)
- [About offline conversion imports](https://support.google.com/google-ads/answer/2998031)
