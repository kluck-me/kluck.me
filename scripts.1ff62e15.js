parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FoJ6":[function(require,module,exports) {
(function(){var n,t,e,o,c,a,i,r,d,s;a=new URLSearchParams(window.location.search),r=a.get("prefix")||"NHK",d=a.get("suffix")||"Japan",o=function(){return new Date},s=function(n){return"".concat(n).padStart(2,"0")},e=function(n){var t,e,o,c,a,i,u,v;if(v=n.getUTCMonth()+1,a=n.getUTCDate(),i=n.getUTCHours(),u=n.getUTCMinutes()<30?0:30,9===v&&(11===a&&12<=i||12<=a&&a<17||17===a&&i<6))return c=60*(n.getUTCMinutes()-u)+n.getUTCSeconds()+1,e=Math.min(1801,c+1800),(t=new Date).setTime(n.getTime()+1e3*(e-c)),o="".concat(r,"_2001").concat(s(v)).concat(s(a),"_").concat(s(i)).concat(s(u),"00_").concat(d),{url:"https://archive.org/download/".concat(o,"/").concat(o,".mp4?start=").concat(c,"&end=").concat(e,"&ignore=x.mp4"),start:n,end:t}},c=[],t=function(n){var t;t=$("<video>"),n.video=t[0],n.canplay=!1,t.css("z-index",-1).attr({src:n.url,controls:!1}).on("canplay",function(){n.canplay=!0}).appendTo("#videos")},n=function(n){var o;if(o=e(n))return t(o),c.push(o),o.start},i=function(){var t,e,a,r;(t=c.shift())&&(r=n(t.end),a=function(){$(t.video).css("z-index",-1),i(),$(t.video).remove(),t.video=null},e=function(){$(t.video).css("z-index",2),t.video.play()},$(t.video).on("timeupdate",function(){r<o()&&a()}).on("ended",a),t.canplay||$(t.video).on("canplay",e),e())},$("#videos").one("click",function(){var t;$("#videos").empty(),t=setInterval(function(){n(o())&&(clearInterval(t),i())},1e3)})}).call(this);
},{}]},{},["FoJ6"], null)