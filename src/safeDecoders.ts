import { Decoder, DecodeError, DecoderDict, DecoderValueDict } from "./shared";

export type Composeable = <Decoders extends Array<Decoder<any>>>(
  ...decoders: Decoders
) => Decoder<Decoders[number] extends Decoder<infer T> ? T : never>;

export type Map = <Decoders extends Array<Decoder<any>>, T>(
  // TypeScript is not able to fully understand the types of values yet.
  // For example a in a decoder like `map((a, b) => ..., str, num);`,
  // `a` and `b` will have type `string | number` except of `a` being `string` and `b` being `number`
  f: (
    ...values: Array<Decoders[number] extends Decoder<infer U> ? U : never>
  ) => T,
  ...decoders: Decoders
) => Decoder<T>;

export type Union = <
  T extends string | number | boolean,
  Values extends Array<T>
>(
  decoder: Decoder<T>,
  ...values: Values
) => Decoder<Values[number]>;

const isPlainObject = (value: any): boolean => {
  if (typeof value !== "object") {
    return false;
  }

  return Object.prototype.toString.call(value) === "[object Object]";
};

export const str: Decoder<string> = value => {
  if (typeof value !== "string") {
    throw new DecodeError("string", typeof value);
  }

  return value;
};

export const num: Decoder<number> = value => {
  if (typeof value !== "number") {
    throw new DecodeError("number", typeof value);
  }

  return value;
};

export const bool: Decoder<boolean> = value => {
  if (typeof value !== "boolean") {
    throw new DecodeError("boolean", typeof value);
  }

  return value;
};

export const nil: Decoder<null> = value => {
  if (value !== null) {
    throw new DecodeError("null", typeof value);
  }

  return value;
};

export const array = <T>(decoder: Decoder<T>): Decoder<Array<T>> => (
  values,
): Array<T> => {
  if (!Array.isArray(values)) {
    throw new DecodeError("array", typeof values);
  }

  values.forEach(decoder);

  return values;
};

export const oneOf: Composeable = (...decoders: Array<Decoder<any>>) => (
  value: any,
) => {
  for (const decoder of decoders) {
    try {
      decoder(value);

      return value;
    } catch {}
  }

  throw new DecodeError("one of the provided decoders", typeof value);
};

export const nullable = <T>(decoder: Decoder<T>): Decoder<T | null> =>
  oneOf(nil, decoder);

export const maybe = <T>(decoder: Decoder<T>): Decoder<T | undefined> =>
  oneOf(value => {
    if (value !== undefined) {
      throw new DecodeError("undefined", typeof value);
    }

    return value;
  }, decoder);

// TypeScript does not try to infer the subtype of functions parameters,
// Therefore a decoder like `union(str, "foo", "bar")` will result in a `Decoder<string>`
// The only way to prevent this is to provide the generics
// like `union<string, Array<'foo', 'bar'>>(str, 'foo', 'bar')`
export const union: Union = (decoder: Decoder<any>, ...values: Array<any>) =>
  compose(
    decoder,
    value => {
      if (!values.includes(value)) {
        throw new DecodeError(`${values.join(" or ")}`, value);
      }

      return value;
    },
  );

export const object = <T extends DecoderDict>(
  decoders: T,
): Decoder<DecoderValueDict<T>> => (value): DecoderValueDict<T> => {
  if (!isPlainObject(value)) {
    throw new DecodeError("object", typeof value);
  }

  for (const key in decoders) {
    decoders[key](value[key]);
  }

  return value;
};

export const field = <T>(name: string, decoder: Decoder<T>): Decoder<T> => (
  value,
): T => decoder(value[name]);

export const compose: Composeable = (...decoders: Array<Decoder<any>>) => (
  value: any,
) => decoders.reduce((acc, reducer) => reducer(acc), value);

export const map: Map = (
  f: (...values: Array<any>) => any,
  ...decoders: Array<Decoder<any>>
) => (value: any) => f(...decoders.map(decoder => decoder(value)));