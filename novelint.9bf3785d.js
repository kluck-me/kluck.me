parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Dz7E":[function(require,module,exports) {
function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function e(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}(function(){var t;t=function(){function t(){n(this,t),this.lintsSet={}}return e(t,null,[{key:"matcher",value:function(n,t){return function(e){var i,r,l,u;for(u=[];l=n.exec(e);)t&&!t(l)||(i=l.index,r=0,l[2]?(i+=l[1].length,r=l[2].length):l[1]&&(r=l[1].length),u.push([i,i+r]));return u}}}]),e(t,[{key:"add",value:function(n,t){var e;((e=this.lintsSet)[n]||(e[n]=[])).push(t)}},{key:"addLint",value:function(n,e,i){this.add(n,t.matcher(e,i))}},{key:"review",value:function(n){var t,e,i,r,l,u,o,a,c,h,f,s,v,g,d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(c in n=n.replace(/\r\n?/g,"\n"),v=[],this.lintsSet)if(!1!==d[c])for(e=0,u=(f=this.lintsSet[c]).length;e<u;e++)for(i=0,o=(s=f[e].call(this,n)).length;i<o;i++)h=s[i],v.push([""+c].concat(h));for(h=[],t={},l=0,a=v.length;l<a;l++)t[r=(g=v[l]).join("\n")]||(t[r]=!0,h.push([""+g[0],g[1],g[1]],[null,g[1],g[2]]));return h.sort(function(n,t){return n[2]-t[2]||n[1]-t[1]||(null===n[0]?1:null===t[0]?-1:0)}),{indexes:h,length:h.length/2}}}]),t}(),window.Novelint=t}).call(this);
},{}]},{},["Dz7E"], null)