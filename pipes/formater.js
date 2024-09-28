export const moneyFormatter = Intl.NumberFormat("id-ID", {
    currency: "IDR",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0,
    // maximumFractionDigits: 2,
  });


  export const moneyFormat = (amount) => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits:0,
    }).format(amount)

    return formatted
}