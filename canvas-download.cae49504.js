parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"AF1H":[function(require,module,exports) {
(function(){var n;n=function(n){return new Promise(function(o,t){var c;(c=n.img=new Image).crossOrigin="anonymous",c.onload=function(){o(n)},c.onerror=function(){t(n)},c.src=n.url})},Promise.all([{url:"https://4.bp.blogspot.com/-Anllqq6pDXw/VRUSesbvyAI/AAAAAAAAsrc/CIHz6vLsuTU/s800/computer_jinkou_chinou.png",x:180,y:40,w:90},{url:"https://4.bp.blogspot.com/-4xxTe_qeV1E/Vd7FkNUlwjI/AAAAAAAAxFc/8u9MNKtg7gg/s800/syachiku.png",x:0,y:0,w:300}].map(n)).then(function(n){var o,t,c;for(o=$("canvas")[0].getContext("2d"),c=n.length-1;c>=0;c+=-1)t=n[c],o.drawImage(t.img,t.x,t.y,t.w,t.w/t.img.width*t.img.height)}),$("button").click(function(){return $("canvas")[0].toBlob(function(n){var o;(o=document.createElement("a")).href=window.URL.createObjectURL(n),o.download="canvas-download.png",o.click(),URL.revokeObjectURL(o.url)}),!1})}).call(this);
},{}]},{},["AF1H"], null)