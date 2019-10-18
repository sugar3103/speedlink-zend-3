export function formatCurrency(input) {
    if (input !== undefined && input !== '') {
        if (isNaN(input)) {
            return input;
        } else {
            const convertedInput = new Intl.NumberFormat().format(input);
            return convertedInput;
        }
    } else {
        return '';
    }
}

export function normalizeCurrency(val) {
    return val.replace(/,/g , '');
}