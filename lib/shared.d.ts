export declare type Decoder<T> = (value: any) => T;
export interface DecoderDict {
    [key: string]: Decoder<any>;
}
export declare type DecoderValueDict<T extends DecoderDict> = {
    [K in keyof T]: T[K] extends Decoder<infer U> ? U : never;
};
export declare class DecodeError extends Error {
    expected: string;
    received: string;
    constructor(expected: string, received: string);
}
export declare class ParseError extends Error {
    input: string;
    constructor(input: string);
}
export declare function getAccurateTypeOf(value: any): string;
export declare function hasOwnProperty(value: any, key: string): boolean;
