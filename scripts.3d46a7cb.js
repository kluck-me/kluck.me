parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"bLKz":[function(require,module,exports) {
(function(){new Vue({el:"#vue",data:{clocks:[]},methods:{update:function(){var t,e,n,o;t=(e=moment()).clone().tz("Asia/Tokyo"),o=e.clone().tz("America/Los_Angeles"),this.clocks=[{time:t},{time:6<=(n=t.hour())&&n<22?t:o,tz:"MLT"},{time:o}],this.clocks.forEach(function(t){t.tz||(t.tz=t.time.format("z")),t.tz_name||(t.tz_name={JST:"日本標準時",PST:"太平洋標準時",PDT:"太平洋夏時間",MLT:"マミー生活時間"}[t.tz])})}},mounted:function(){var t=this;setInterval(function(){return t.update()},500),this.update()}})}).call(this);
},{}]},{},["bLKz"], null)