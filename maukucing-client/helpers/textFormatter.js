export const textFormatter = (text) => {
    return text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
}   