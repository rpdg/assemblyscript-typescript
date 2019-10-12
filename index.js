/* 
 */

WebAssembly.instantiateStreaming(fetch("./build/optimized.wasm"), {
  customMath: {
    times(a ,b) {
      return a * b;
    }
  },
  env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at main.ts:" + line + ":" + column);
    }
  },
}).then(result => {
  const {add , times , factorial} = result.instance.exports;
  document.getElementById("container").innerHTML = `3+8=${add(3, 8)} ,3x8=${times(3,8)} , 24!=${factorial(24)}`;
}).catch(console.error);
