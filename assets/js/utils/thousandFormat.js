const thousandFormat = (num, decimals = 2) => Number(num)
  .toLocaleString('de-DE', { maximumFractionDigits: decimals })

export default thousandFormat;
