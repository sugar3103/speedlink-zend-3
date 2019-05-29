export function formatCurrency(input) {
    if (!input) return '';
    const convertedInput = new Intl.NumberFormat().format(input);
    return convertedInput;
}

export function normalizeCurrency(val) {
    return val.replace(/,/g , '');
}