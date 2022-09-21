import { Decoder } from "./shared";
export * from "./safeDecoders";
export * from "./shared";
export * from "./unsafeDecoders";
export declare function decodeString<T>(decoder: Decoder<T>): (input: string) => T;
export declare function decodeString<T>(decoder: Decoder<T>, input: string): T;
export declare function decodeValue<T>(decoder: Decoder<T>): (input: any) => T;
export declare function decodeValue<T>(decoder: Decoder<T>, input: any): T;
