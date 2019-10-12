// https://dev.to/jtenner/an-assemblyscript-primer-for-typescript-developers-lf1

// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}


// @ts-ignore: import a custom_add function from the customMath.times namespace
@external("customMath", "times")
export declare function times(a: f64, b: f64): f64;