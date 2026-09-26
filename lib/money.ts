/** "$" for USD, "€" for EUR — whatever the admin set; an unknown code shows as itself. */
export function currencySymbol(code = "USD"): string {
  try {
    return (
      new Intl.NumberFormat("en", { style: "currency", currency: code })
        .formatToParts(0)
        .find((p) => p.type === "currency")?.value ?? code
    );
  } catch {
    return `${code} `;
  }
}

export function money(amount: number, code = "USD"): string {
  return `${currencySymbol(code)}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}
