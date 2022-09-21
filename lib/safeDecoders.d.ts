import { Decoder, DecoderDict, DecoderValueDict } from "./shared";
export interface Composeable {
    <A, B>(decoder1: Decoder<A>, decoder2: Decoder<B>): Decoder<A & B>;
    <A, B, C>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>): Decoder<A & B & C>;
    <A, B, C, D>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>): Decoder<A & B & C & D>;
    <A, B, C, D, E>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>): Decoder<A & B & C & D & E>;
    <A, B, C, D, E, F>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder: Decoder<F>): Decoder<A & B & C & D & E & F>;
    <A, B, C, D, E, F, G>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>): Decoder<A & B & C & D & E & F & G>;
    <A, B, C, D, E, F, G, H>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>): Decoder<A & B & C & D & E & F & G & H>;
    <A, B, C, D, E, F, G, H, I>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>, decoder9: Decoder<I>): Decoder<A & B & C & D & E & F & G & H & I>;
    <A, B, C, D, E, F, G, H, I, J>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>, decoder9: Decoder<I>, decoder10: Decoder<J>): Decoder<A & B & C & D & E & F & G & H & I & J>;
}
export interface OneOf {
    <A, B>(decoder1: Decoder<A>, decoder2: Decoder<B>): Decoder<A | B>;
    <A, B, C>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>): Decoder<A | B | C>;
    <A, B, C, D>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>): Decoder<A | B | C | D>;
    <A, B, C, D, E>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>): Decoder<A | B | C | D | E>;
    <A, B, C, D, E, F>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder: Decoder<F>): Decoder<A | B | C | D | E | F>;
    <A, B, C, D, E, F, G>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>): Decoder<A | B | C | D | E | F | G>;
    <A, B, C, D, E, F, G, H>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>): Decoder<A | B | C | D | E | F | G | H>;
    <A, B, C, D, E, F, G, H, I>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>, decoder9: Decoder<I>): Decoder<A | B | C | D | E | F | G | H | I>;
    <A, B, C, D, E, F, G, H, I, J>(decoder1: Decoder<A>, decoder2: Decoder<B>, decoder3: Decoder<C>, decoder4: Decoder<D>, decoder5: Decoder<E>, decoder6: Decoder<F>, decoder7: Decoder<G>, decoder8: Decoder<H>, decoder9: Decoder<I>, decoder10: Decoder<J>): Decoder<A | B | C | D | E | F | G | H | I | J>;
}
export declare type Map = <Decoders extends Array<Decoder<any>>, T>(f: (...values: {
    [key in keyof Decoders]: Decoders[key] extends Decoder<infer U> ? U : never;
}) => T, ...decoders: Decoders) => Decoder<T>;
export declare type Union = <T extends string | number | boolean, Values extends Array<T>>(decoder: Decoder<T>, ...values: Values) => Decoder<Values[number]>;
export declare const str: Decoder<string>;
export declare const num: Decoder<number>;
export declare const bool: Decoder<boolean>;
export declare const nil: Decoder<null>;
export declare const array: <T>(decoder: Decoder<T>) => Decoder<T[]>;
export declare const oneOf: OneOf;
export declare const nullable: <T>(decoder: Decoder<T>) => Decoder<T | null>;
export declare const maybe: <T>(decoder: Decoder<T>) => Decoder<T | undefined>;
export declare const union: Union;
export declare const object: <T extends DecoderDict>(decoders: T) => Decoder<DecoderValueDict<T>>;
export declare const astype: <T extends DecoderDict>(decoders: T) => Decoder<DecoderValueDict<T>>;
export declare const record: <T>(decoder: Decoder<T>) => Decoder<Record<string, T>>;
export declare const field: <T>(name: string, decoder: Decoder<T>) => Decoder<T>;
export declare const compose: Composeable;
export declare const map: Map;
