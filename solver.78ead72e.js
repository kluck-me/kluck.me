parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Y4I/":[function(require,module,exports) {
function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(function(){var a,i,s,r,h;r=function(){for(var t=arguments.length,e=new Array(t),a=0;a<t;a++)e[a]=arguments[a];self.postMessage({type:"debug",value:e})},h=function(t){var e;return e=Date.now(),t(),Date.now()-e},a=function(){function t(){e(this,t),this.data=[]}return n(t,[{key:"push",value:function(t){this.data.push(t),this._up(this.data.length-1)}},{key:"pop",value:function(){var t;if(this.data.length)return t=this.data[0],this.data.length-1>0&&(this.data[0]=this.data[this.data.length-1],this._down(0)),this.data.pop(),t}},{key:"_up",value:function(t){var e,a,n;for(a=this.data[t];t>0&&(n=t-1>>1,e=this.data[n],!(a.compareTo(e)>=0));)this.data[t]=e,t=n;this.data[t]=a}},{key:"_down",value:function(t){var e,a,n,i,s;for(n=this.data[t],a=this.data.length>>1;t<a&&(s=(i=1+(t<<1))+1,e=this.data[i],s<this.data.length&&this.data[s].compareTo(e)<0&&(i=s,e=this.data[s]),!(e.compareTo(n)>=0));)this.data[t]=e,t=i;this.data[t]=n}}]),t}(),i=function(){var a=function(){function a(){e(this,a)}return n(a,[{key:"clone",value:function(){var e,n,i;for(e in n=new a,this,this)i=this[e],this.hasOwnProperty(e)&&(n[e]=i&&"object"===t(i)?i.concat():i);return n}},{key:"setBoard",value:function(t){var e,n,i,s,r,h,o;for(a.validateBoard(t),this.height=t.length,this.width=t[0].length,this.panel=[],this.space=-1,this.path="",e=0,o=n=0,s=this.height;n<s;o=n+=1)for(h=i=0,r=this.width;i<r;h=i+=1)0===t[o][h]?(this.panel[e]=this.height*this.width,this.space=e):this.panel[e]=t[o][h],e+=1;if(-1===this.space)throw new Error("space not found");if(!this.panel.concat().sort(function(t,e){return t-e}).every(function(t,e){return t===e+1}))throw new Error("panel is broken");this.setCalculatedDistance()}},{key:"calcManhattanDistance",value:function(t,e){var a,n,i,s;return a=t%this.width,i=t/this.width|0,n=e%this.width,s=e/this.width|0,Math.abs(a-n)+Math.abs(i-s)}},{key:"setCalculatedDistance",value:function(){var t,e,a;for(this.distance=0,t=e=0,a=this.panel.length;e<a;t=e+=1)t!==this.space&&(this.distance+=this.calcManhattanDistance(t,this.panel[t]-1));this.estimate=this.distance,this.cost=0}},{key:"moveSpace",value:function(t,e){var a;a=t+e*this.width,this.distance+=this.calcManhattanDistance(this.space,this.panel[a]-1),this.distance-=this.calcManhattanDistance(a,this.panel[a]-1),this.panel[this.space]=this.panel[a],this.panel[a]=this.height*this.width,this.space=a}},{key:"compareTo",value:function(t){return this.estimate-t.estimate}},{key:"toString",value:function(){return this.panel.join(",")}}],[{key:"validateBoard",value:function(t){var e;if(!Array.isArray(t))throw new Error("board is broken");if(!t.length)throw new Error("board is broken");if(!(e=t[0].length))throw new Error("board is broken");if(!t.every(function(t){return t.length===e&&t.every(function(t){return"number"==typeof t})}))throw new Error("board should be two-dimensional array")}}]),a}();return a.MOVES=[{x:0,y:-1,path:"u"},{x:1,y:0,path:"r"},{x:0,y:1,path:"d"},{x:-1,y:0,path:"l"}],a}.call(this),s=function(t){var e,n,s,r,h,o,c,u,l,f,d,p;for(e={},l=new a,(c=new i).setBoard(t),c.estimate=c.distance,l.push(c);l.data.length;){if(0===(c=l.pop()).distance)return c.path;for(e[c]=!0,d=c.space%c.width,p=c.space/c.width|0,n=0,s=(f=i.MOVES).length;n<s;n++)h=d+(r=f[n]).x,o=p+r.y,h<0||c.width<=h||o<0||c.height<=o||((u=c.clone()).moveSpace(h,o),e[u]||(u.cost+=1,u.estimate=u.distance+u.cost,u.path+=r.path,l.push(u)))}return null},"undefined"!=typeof self?self.addEventListener("message",function(t){r(h(function(){try{self.postMessage({type:"result",value:s(t.data.board)})}catch(e){t=e,self.postMessage({type:"error",value:t.message})}}))},!1):(r=console.log.bind(console))(h(function(){r(s([[1,7,2,4],[6,0,14,3],[13,10,11,8],[5,9,15,12]]))}))}).call(this);
},{}]},{},["Y4I/"], null)