parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"QcYY":[function(require,module,exports) {
(function(){var t;t=function(){var t,i;return(i=(t=$("canvas")[0]).getContext("2d")).fillStyle="rgb(170,191,218)",i.fillRect(0,0,t.width,t.height),i.fillStyle="rgb(105,122,148)",i.textAlign="center",i.font='17px "M PLUS Rounded 1c"',i.fillText($("#first-text").val(),t.width/2-5,t.height/2+8),i.font='italic 12px "M PLUS Rounded 1c"',i.fillText($("#second-text").val(),t.width/2-5,t.height/2+23)},$("button").click(function(){return $("input").each(function(){$(this).val(this.defaultValue)}),t(),!1}),$("input").on("input",t),t()}).call(this);
},{}]},{},["QcYY"], null)