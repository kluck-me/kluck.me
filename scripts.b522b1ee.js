parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"qzOW":[function(require,module,exports) {
function t(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=n(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,c=!0,a=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return c=t.done,t},e:function(t){a=!0,u=t},f:function(){try{c||null==r.return||r.return()}finally{if(a)throw u}}}}function n(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}window.vm=new Vue({el:"#vue",data:{text:"",limit_config:"10000",regex_config:"\\n|[。！？）｠」』］〛｝〕〙〉》】〗]+",blocks:[]},computed:{input:function(){return this.text.trim().replace(/\r\n?/,"\n")},limit:function(){return+this.limit_config},regex:function(){try{return new RegExp(this.regex_config,"g")}catch(t){}}},methods:{submit:function(){var n,e=this;if(this.blocks=[],this.input&&this.limit&&this.regex){for(var r=[0];n=this.regex.exec(this.input);)r.push(n.index+1);var i,o=[""],u=0,c=0,a=t(r.map(function(t,n){return e.input.slice(t,r[n+1])}));try{for(a.s();!(i=a.n()).done;){var f=i.value;c+f.length>this.limit&&(u=o.push("")-1),o[u]+=f,c=o[u].length}}catch(l){a.e(l)}finally{a.f()}this.blocks=o}},copy:function(t){t.target.text.focus(),t.target.text.select(),document.execCommand("copy")}},mounted:function(){}});
},{}]},{},["qzOW"], null)