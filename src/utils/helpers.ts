/* Должен удалитсья, не используется */
export function formatMessage(message: string): string {
    return `${message.toUpperCase()}`;
}

export function createGreeting(name: string): string {
    return `Hello, ${name}!`;
}
