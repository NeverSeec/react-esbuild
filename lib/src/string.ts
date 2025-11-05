export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const reverse = (str: string): string =>
    str.split('').reverse().join('');
