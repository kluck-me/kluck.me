parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bLKz":[function(require,module,exports) {
(function(){window.vm=new Vue({el:"#vue",data:{clocks:[]},methods:{update:function(){var t,e,n,o;t=(e=moment()).clone().tz("Asia/Tokyo"),o=e.clone().tz("America/Los_Angeles"),this.clocks=[{time:t},{time:6<=(n=t.hour())&&n<22?t:o,tz:"MLT"},{time:o}],this.clocks.forEach(function(t){t.tz||(t.tz=t.time.format("z")),t.tz_name||(t.tz_name={JST:"日本標準時",PST:"太平洋標準時",PDT:"太平洋夏時間",MLT:"マミー生活時間"}[t.tz])})}},mounted:function(){var t=this;setInterval(function(){return t.update()},500),this.update()}})}).call(this);
},{}]},{},["bLKz"], null)