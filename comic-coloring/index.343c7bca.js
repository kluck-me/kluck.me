!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire8333;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire8333=o),o.register("gTwGg",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o.register("927Pm",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("5RMEf")})),o.register("ai42B",(function(t,n){var r,o;e(t.exports,"getBundleURL",(function(){return r}),(function(e){return r=e})),e(t.exports,"getOrigin",(function(){return o}),(function(e){return o=e}));var i={};function a(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var t=i[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return a(e[2])}return"/"}(),i[e]=t),t},o=function(e){var t=(""+e).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^/]+/);if(!t)throw new Error("Origin not found");return t[0]}})),o.register("4QdMm",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("fxNMV")})),o.register("jejeA",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("9sO94")})),o.register("7IBhE",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("fySNt")})),o.register("iVPsM",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("iTxHX")})),o.register("h5lcT",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("ffWRm")})),o.register("3fheP",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("jPJnb")})),o.register("7yI7x",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("9M8HU")})),o.register("8iBQX",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("lTzFG")})),o.register("7RxV4",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("lsq10")})),o.register("6KoSd",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("gk8fr")})),o.register("1XAgj",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("kjRVD")})),o.register("hoySy",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("8HD1e")})),o.register("5HBOX",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("gDv3J")})),o.register("iw145",(function(e,t){e.exports=o("ai42B").getBundleURL("kuXIH")+"../"+o("gTwGg").resolve("gPojw")})),o("gTwGg").register(JSON.parse('{"kuXIH":"index.343c7bca.js","5RMEf":"ss124-178-179.b2e4ce40.png","fxNMV":"te3-106-107.80c2328a.png","9sO94":"rd63-14-15.5673c11c.png","fySNt":"gs1-14-15.c721b885.png","iTxHX":"ne1-6-7.c3c670d6.png","ffWRm":"wy9-640-641.f91dc600.png","jPJnb":"fh22-4-5.4780af6f.png","9M8HU":"ao1-2-3.a3ca4e9e.png","lTzFG":"ya1-8-9.1f0e9601.png","lsq10":"mm1-14-15.8c973089.png","gk8fr":"ts1-2-3.d3c14a1a.png","kjRVD":"tk9-10-11.89e00f39.png","8HD1e":"st63-2-3.5ac73016.png","gDv3J":"tt75-4-5.a2704919.png","gPojw":"rm17-34-35.baa916f9.png"}'));window.vm=new Vue({el:"#vue",data:{selectedPath:"",uploadedPath:"",uploadedName:"",examplePaths:"localhost"===location.hostname?[o("927Pm"),o("4QdMm"),o("jejeA"),o("7IBhE"),o("iVPsM"),o("h5lcT"),o("3fheP"),o("7yI7x"),o("8iBQX"),o("7RxV4"),o("6KoSd"),o("1XAgj"),o("hoySy"),o("5HBOX"),o("iw145")]:[]},methods:{update:function(){var e=this.selectedPath||this.uploadedPath;if(e){var t=this.$refs.canvas,n=t.getContext("2d"),r=new Image;r.onload=function(){t.width=r.naturalWidth,t.height=r.naturalHeight,n.drawImage(r,0,0),function(e){for(var t=function(e){var t=.299*r[e]+.587*r[e+1]+.114*r[e+2];[t+39,t+14,t-36].forEach((function(t,n){r[e+n]=Math.max(0,Math.min(t,255))})),t>240||t<=10?(r[e]=t,r[e+1]=t,r[e+2]=t):t>200||(t>150?(r[e+1]-=50,r[e+2]-=50):t>100?(r[e]-=50,r[e+2]-=50):(r[e]-=50,r[e+1]-=50,r[e+2]+=100))},n=e.getImageData(0,0,e.canvas.width,e.canvas.height),r=n.data,o=0;o<r.length;o+=4)t(o);e.putImageData(n,0,0)}(n)},r.src=e}},uploadImage:function(e){var t=this,n=e.target.files[0];if(n){this.uploadedName=n.name;var r=new FileReader;r.onload=function(){t.uploadedPath=r.result,t.update()},r.readAsDataURL(n)}}},mounted:function(){"localhost"===location.hostname&&(this.selectedPath=this.examplePaths[0],this.update())}})}();