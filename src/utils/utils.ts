export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function unusedFunction(): string {
    console.log("Эта функция не используется и не должна попасть в бандл");
    return "unused";
}

export const CONSTANT_VALUE = 42;
