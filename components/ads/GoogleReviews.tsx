import Script from "next/script";

/** Elfsight "Google Reviews" apps. Each is configured in the Elfsight dashboard, not here. */
export const ELFSIGHT_REVIEWS = "9c3c2f62-3e60-4b3f-8d51-4ed320822111";
export const ELFSIGHT_HERO = "3c4f0a7e-4913-41f3-8405-b884871a61a8";

/**
 * Elfsight renders the reviews entirely client-side inside its own container, so
 * nothing here can inspect or gate what it shows — whatever the app is pointed at in
 * the Elfsight dashboard is what visitors get.
 *
 * lazyOnload + data-elfsight-app-lazy: neither widget is the LCP element, so they have
 * no business competing with the hero image for bandwidth. Callers reserve space with a
 * min-height so the page doesn't jump when a widget mounts.
 *
 * Rendered more than once per page — next/script guarantees platform.js loads only once
 * regardless, and Elfsight picks up every matching div.
 */
export default function GoogleReviews({ appId }: { appId: string }) {
  return (
    <>
      <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </>
  );
}
