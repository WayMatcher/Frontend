/**
 * Classifies if a given text is an email address or a username.
 * @param text - The text to classify.
 * @returns 'email' if the text is an email address, 'username' if the text is a username.
 */
const classifyText = (text: string): 'email' | 'username' => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (emailRegex.test(text)) {
        return 'email';
    } else if (usernameRegex.test(text)) {
        return 'username';
    } else {
        throw new Error('Invalid text format');
    }
};

export default classifyText;