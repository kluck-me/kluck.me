parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"gYYD":[function(require,module,exports) {
module.exports="/ss124-178-179.3b18be9c.png";
},{}],"FSkf":[function(require,module,exports) {
module.exports="/te3-106-107.6a73f74b.png";
},{}],"UltC":[function(require,module,exports) {
module.exports="/rd63-14-15.4b51436d.png";
},{}],"fqHE":[function(require,module,exports) {
module.exports="/gs1-14-15.2f65061c.png";
},{}],"ty8B":[function(require,module,exports) {
module.exports="/ne1-6-7.05b85115.png";
},{}],"anET":[function(require,module,exports) {
module.exports="/wy9-640-641.e86762f6.png";
},{}],"DayR":[function(require,module,exports) {
module.exports="/fh22-4-5.9eb7a424.png";
},{}],"PuMM":[function(require,module,exports) {
module.exports="/ao1-2-3.aaebc074.png";
},{}],"bN8c":[function(require,module,exports) {
module.exports="/ya1-8-9.a35b5e4e.png";
},{}],"g3Ss":[function(require,module,exports) {
module.exports="/mm1-14-15.49422a9f.png";
},{}],"y0Lc":[function(require,module,exports) {
module.exports="/ts1-2-3.c9cdcf68.png";
},{}],"BsEz":[function(require,module,exports) {
module.exports="/tk9-10-11.8817b132.png";
},{}],"QHOk":[function(require,module,exports) {
module.exports="/st63-2-3.fc6cfbfe.png";
},{}],"HrFQ":[function(require,module,exports) {
module.exports="/tt75-4-5.28086877.png";
},{}],"D9cT":[function(require,module,exports) {
module.exports="/rm17-34-35.0e3f26e5.png";
},{}],"dVdk":[function(require,module,exports) {
var e=function(e){for(var a=e.getImageData(0,0,e.canvas.width,e.canvas.height),t=a.data,n=function(e){var a=.299*t[e]+.587*t[e+1]+.114*t[e+2];[a+39,a+14,a-36].forEach(function(a,n){t[e+n]=Math.max(0,Math.min(a,255))}),a>240||a<=10?(t[e]=a,t[e+1]=a,t[e+2]=a):a>200||(a>150?(t[e+1]-=50,t[e+2]-=50):a>100?(t[e]-=50,t[e+2]-=50):(t[e]-=50,t[e+1]-=50,t[e+2]+=100))},r=0;r<t.length;r+=4)n(r);e.putImageData(a,0,0)};window.vm=new Vue({el:"#vue",data:{selectedPath:"",uploadedPath:"",uploadedName:"",examplePaths:"localhost"===location.hostname?[require("./ss124-178-179.png"),require("./te3-106-107.png"),require("./rd63-14-15.png"),require("./gs1-14-15.png"),require("./ne1-6-7.png"),require("./wy9-640-641.png"),require("./fh22-4-5.png"),require("./ao1-2-3.png"),require("./ya1-8-9.png"),require("./mm1-14-15.png"),require("./ts1-2-3.png"),require("./tk9-10-11.png"),require("./st63-2-3.png"),require("./tt75-4-5.png"),require("./rm17-34-35.png")]:[]},methods:{update:function(){var a=this.selectedPath||this.uploadedPath;if(a){var t=this.$refs.canvas,n=t.getContext("2d"),r=new Image;r.onload=function(){t.width=r.naturalWidth,t.height=r.naturalHeight,n.drawImage(r,0,0),e(n)},r.src=a}},uploadImage:function(e){var a=this,t=e.target.files[0];if(t){this.uploadedName=t.name;var n=new FileReader;n.onload=function(){a.uploadedPath=n.result,a.update()},n.readAsDataURL(t)}}},mounted:function(){"localhost"===location.hostname&&(this.selectedPath=this.examplePaths[0],this.update())}});
},{"./ss124-178-179.png":"gYYD","./te3-106-107.png":"FSkf","./rd63-14-15.png":"UltC","./gs1-14-15.png":"fqHE","./ne1-6-7.png":"ty8B","./wy9-640-641.png":"anET","./fh22-4-5.png":"DayR","./ao1-2-3.png":"PuMM","./ya1-8-9.png":"bN8c","./mm1-14-15.png":"g3Ss","./ts1-2-3.png":"y0Lc","./tk9-10-11.png":"BsEz","./st63-2-3.png":"QHOk","./tt75-4-5.png":"HrFQ","./rm17-34-35.png":"D9cT"}]},{},["dVdk"], null)