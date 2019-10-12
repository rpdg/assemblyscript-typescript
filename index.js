function sFact(num) {
  var rval = 1;
  for (var i = 2; i <= num; i++)
    rval = rval * i;
  return rval;
}

WebAssembly.instantiateStreaming(fetch("./build/optimized.wasm"), {
  customMath: {
    times(a, b) {
      return a * b;
    }
  },
  env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at main.ts:" + line + ":" + column);
    }
  },
}).then(result => {
  const { add, times, factorial } = result.instance.exports;
  document.getElementById("container").innerHTML = `3+8=${add(3, 8)} ,3x8=${times(3, 8)}`;


  var start, end, rTime, sTime;

  start = new Date().getTime();

  for (var i = 0; i < 10000; i++)
    factorial(1000);

  end = new Date().getTime();

  rTime = end - start;

  start = new Date().getTime();

  for (var i = 0; i < 10000; i++)
    sFact(1000);

  end = new Date().getTime();


  sTime = end - start;

  alert('wasm: ' + rTime + '\n v8: ' + sTime);

}).catch(console.error);
