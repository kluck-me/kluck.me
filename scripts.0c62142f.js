parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"3vCv":[function(require,module,exports) {
function n(n){return i(n)||e(n)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function i(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}(function(){!function(t){var e,i,a,o,r;r=[],a={},e=function(n){var e,i,a,o;for(a=[],e=0,i=n.length;e<i;e++)o=n[e],a.push(t.getJSON("https://api.tumblr.com/v2/tagged?callback=?",{tag:o,api_key:"3jJQBJhS6MidfygWrYPVUqzop3dkdk3kYUc5RUoSxSLL7OUonx"}));return a},i=function(n){/\.gif$/.test(n)&&!a[n]&&(a[n]=!0,r.push(n))},o=function(n){t("#anime".concat(n)).attr("class","anime anime-show"),t("#anime".concat(n=(n+1)%3)).attr("class","anime anime-load").css("background-image",'url("'.concat(r[Math.random()*r.length|0],'")')),t("#anime".concat(n=(n+1)%3)).attr("class","anime anime-hide")},t.when.apply(t,n(e(["gif","gifs","anime","anime-gif"]))).done(function(){var n,e,a,r,c,s,l,u,m,f;for(n=0,r=arguments.length;n<r;n++)for(e=0,c=(u=arguments[n][0].response).length;e<c;e++)if((f=u[e]).photos)for(a=0,s=(m=f.photos).length;a<s;a++)l=m[a],i(l.original_size.url);t(function(){var n;t("body").append('<div class="anime anime-hide" id="anime0">','<div class="anime anime-hide" id="anime1">','<div class="anime anime-hide" id="anime2">'),o(1),o(2),n=0,setInterval(function(){o(n),n=(n+1)%3},3e3)})}),t(function(){var n,e,i;n=t("body"),i=null,e=function(){n.removeClass("hide-content"),clearTimeout(i)},window.onfocus=e,n.mouseover(e).mouseout(function(){i=setTimeout(function(){n.addClass("hide-content")},1e3)}).click(function(e){var i;i=t(e.target),(n.hasClass("hide-content")||!i.closest("a").length&&!i.closest("section").length)&&n.toggleClass("hide-content")})})}($)}).call(this);
},{}]},{},["3vCv"], null)