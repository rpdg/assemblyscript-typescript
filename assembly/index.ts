// https://dev.to/jtenner/an-assemblyscript-primer-for-typescript-developers-lf1

// The entry file of your WebAssembly module.

NativeMath.seedRandom(1234);

export function scramble(input: string): string {
  let result = input;
  for (let n = 0; n < 100; n++) {
    const start = <i32> Math.floor(Math.random() * input.length);
    const end = start + <i32> Math.floor(Math.random() * (input.length - start));
    result = result.substring(0, start) + result.substring(end) + result.substring(start, end);
  }
  return result;
}

export function add(a: i32, b: i32): i32 {
  return a + b;
}


export function factorial(num: f64): f64 {
  /* if (value == 0 || value == 1) return 1;
  return value * factorial(value - 1); */

  let rval: f64 = 1;
  let l = num + 1;
  for (let i: f64 = 2; i < l; i++)
    rval = rval * i;
  return rval;
}


// @ts-ignore: import a custom_add function from the customMath.times namespace
@external("customMath", "times")
export declare function times(a: i32, b: i32): i32;