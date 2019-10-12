// https://dev.to/jtenner/an-assemblyscript-primer-for-typescript-developers-lf1

/**
 * Import the AssemblyScript loader here. If this code runs in the browser,
 * call the `instantiateStreaming` function, otherwise the `instantiateBuffer`
 * method is used in node.js.
 */
import { instantiateBuffer , ASUtil } from "./loader";
import { readFileSync } from "fs";
/**
 * Defining an interface like this allows you to define the shape of the exported
 * Web Assembly module. Each parameter is a number. Later, when we want to push
 * a string into our module, we will have to generate a pointer to a string.
 * The add function takes two integer parameters and will assume the value is `0`
 * if the parameter is not provided.
 */
interface MyApi {
    add(a: number, b: number): number;
    times(a: number, b: number): number;
    factorial(a: number): number;
}

/**
 * Imports are used to specify functions that need to be linked. This will be
 * discussed in greater detail later. For now, leave the imports object empty.
 **/
const importsObject: any = {
    customMath: {
        times(a: number, b: number): number {
          return a * b;
        }
      }
};

/**
 * Now, let's instantiate our module. Using `fetch()` allows the browser to 
 * download and parse the module at exactly the same time.
 */
function main() {
    let wasm = readFileSync("../build/optimized.wasm");
    // const compiled = new WebAssembly.Module(wasm);
    var interop: ASUtil & MyApi = instantiateBuffer<MyApi>(wasm, importsObject);

    // Finally, call the add function we exported
    console.log("The result is:", interop.add(12, 23));
    console.log("The result is:", interop.times(3, 2));
    console.log("The result is:", interop.factorial(24));
}
main();