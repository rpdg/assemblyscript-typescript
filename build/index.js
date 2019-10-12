WebAssembly.instantiateStreaming(fetch("optimized.wasm"), {
  main: {
    sayHello() {
      console.log("Hello from WebAssembly!");
    }
  },
  env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at main.ts:" + line + ":" + column);
    }
  },
}).then(result => {
  const { add } = result.instance.exports;
  document.getElementById("container").textContent = "Result: " + add(13, 22);
}).catch(console.error);
