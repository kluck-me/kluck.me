parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FKnV":[function(require,module,exports) {
(function(){$.fn.autofit=function(){return this.each(function(){var s,t,i,n,e;if(!((n=(s=$(this)).width())<1)&&(i=parseInt(s.css("font-size"),10),e=(t=s.clone().css("display","none").insertBefore(s)).width())){for(;e<n;)i*=n/e,t.css("font-size",i+"px"),e=t.width();for(;e>=n;)i-=Math.max(1,i*(1-n/e)),t.css("font-size",i+"px"),e=t.width();t.remove(),s.css("font-size",i+"px")}})}}).call(this);
},{}]},{},["FKnV"], null)