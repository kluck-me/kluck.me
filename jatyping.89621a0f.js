parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"APfv":[function(require,module,exports) {
function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(t)}function t(n,t){return o(n)||a(n,t)||e()}function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function a(n,t){var e=[],a=!0,o=!1,r=void 0;try{for(var i,c=n[Symbol.iterator]();!(a=(i=c.next()).done)&&(e.push(i.value),!t||e.length!==t);a=!0);}catch(s){o=!0,r=s}finally{try{a||null==c.return||c.return()}finally{if(o)throw r}}return e}function o(n){if(Array.isArray(n))return n}(function(){var e,a,o,r,i,c,s,u,l,p,f;e=jQuery,f=function(){var n,t,e,a,o,r,i,c,s,u,l,p,f;for(o in l={"ん":["ｎ"]},f=["ゃ","ゅ","ょ"],t={"ｋ":"かきくけこ","ｇ":"がぎぐげご","ｓ":"さしすせそ","ｚ":"ざじずぜぞ","ｔ":"たちつてと","ｄ":"だぢづでど","ｎ":"なにぬねの","ｈ":"はひふへほ","ｂ":"ばびぶべぼ","ｐ":"ぱぴぷぺぽ","ｍ":"まみむめも","ｙ":"やゆよ","ｒ":"らりるれろ","ｗ":"わを"}){for(i=0,c=(n=t[o].split("")).length;i<c;i++)l[r=n[i]]=[o,r];if(5===n.length)for(e=n[1],u=0,s=f.length;u<s;u++)p=f[u],l[a="".concat(e).concat(p)]="じ"===e?["ｊ",a]:[o,"".concat(o,"ｙ"),a]}return l}(),p=function(n){var t,e,a,o,r,i,c,s,u,l,p;for(p=[],r="",t=o=0,i=(l=n.match(/.[ゃゅょ]|./g)).length;o<i;t=++o){for(s=0,c=(a="っ"===(u=l[t])&&f[l[t+1]]?[f[l[t+1]][0]]:f[u]||[u]).length;s<c;s++)e=a[s],p.push("".concat(r).concat(e));r+=u}return p[p.length-1]!==r&&p.push(r),p},r=function(n,t,e){return function(){t&&setTimeout(function(){t.call(e||this)},n||0)}},a=function(n,t){var a,o;return o=n["".concat(t,"TagName")],a=n["".concat(t,"ClassName")],e("<".concat(o,">")).addClass(a)},l=function(n,t,e,o,i,c){var s,u;s=a(e,"input").addClass(e["".concat(n,"ClassName")]).appendTo(o),(u=function(n){var a,o,l,f,d,y,m,v,g,h,C,S;if(t[n]){for(d=t[n-1]||"",o=t[n],g="",l=f=0,y=o.length;f<y&&(a=o[l])===d[l];l=++f)g+=a;if(C=p(o.slice(g.length)).map(function(n){return g+n}),d)for(v=m=g.length,h=d.length;m<=h;v=m+=1)C.unshift(d.slice(0,v));S=function(t){s.text(C[t]),i&&i(),C[t+1]?r(e.typeSpeed,function(){S(t+1)})():u(n+1)},r(e.typeStartSpeed,function(){S(0)})()}else c&&c()})(0)},u=function(n,t,e,o,i){var c,s,u,l,p;for(e.empty(),u=0,l=n.length;u<l;u++)s=n[u],a(t,"input").text(s[0]).appendTo(e);(c=e.find(">.".concat(t.inputClassName))).addClass(t.typingClassName),c.eq(0).addClass(t.convertClassName),o&&o(),p=function(e,a){var s,u,l;if(n[e][a])return c.removeClass(t.convertClassName),c.eq(e).addClass(t.convertClassName).text(n[e][a]),o&&o(),void r(t.convertSpeed,function(){p(e,a+1)})();for(s=u=e+1,l=n.length;u<l;s=u+=1)if(n[s].length>1)return void r(t.convertJumpSpeed,function(){p(e+1,0)})();i&&i()},r(t.convertJumpSpeed,function(){p(0,1)})()},s=function(n,t,e){t.find(">.".concat(n.inputClassName)).removeClass("".concat(n.typingClassName," ").concat(n.convertClassName)),e&&e()},o=function(n,t,e,i,c){var p,f;t.inputs[n]?(f=function(){s(t,p,i),r(t.typeStartSpeed,function(){o(n+1,t,e,i,c)})()},p=a(t,"base").insertBefore(e),Array.isArray(t.inputs[n][0])?l("typing",t.inputs[n][0],t,p,i,function(){t.inputs[n][1]?u(t.inputs[n][1],t,p,i,r(t.convertJumpSpeed,f)):f()}):l("input",t.inputs[n],t,p,i,f)):c&&c()},c=function(n,t,e,a){var o,i,c;o=n[0],c=function(n,a){var o;3===n.nodeType?(o=function(i){i>=0?r(t.removeSpeed,function(){n.nodeValue=n.nodeValue.slice(0,i),e&&e(),o(i-1)})():(n.parentNode.removeChild(n),e&&e(),a&&a())})(n.nodeValue.length-1):c(n.lastChild,function(){n.lastChild||n.parentNode.removeChild(n),e&&e(),a&&a()})},(i=function(){o.previousSibling?c(o.previousSibling,i):a&&a()})()},i=function(a){var o,r,i,c,s,u,l,p,f;p={};for(var d=arguments.length,y=new Array(d>1?d-1:0),m=1;m<d;m++)y[m-1]=arguments[m];for(c=0,s=a.length;c<s;c++){if(o=a[c],e.isPlainObject(o)){e.extend(p,o);break}for(r=l=0,u=y.length;l<u;r=++l){var v=t(y[r],2);if(i=v[0],f=v[1],e.isFunction(f)&&f(o)||n(o)===f){p[i]=o,y.splice(r,1);break}}}return p},e.fn.jatyping=function(){var n;return n=e.extend({},e.fn.jatyping.defaults,i(arguments,["inputs",Array.isArray],["complete",e.isFunction],["completeDelay","number"])),e.fn.jatyping.assertOptions(n),this.each(function(){var t,i,s,u;s=this,n.complete&&(i=r(n.completeDelay,n.complete,s)),n.update&&(u=function(){n.update.call(s)}),(t=e(this).find(">.".concat(n.caretClassName))).length||(t=a(n,"caret").appendTo(this)),n.inputs?o(0,n,t,u,i):c(t,n,u,i)})},e.fn.jatyping.assertOptions=function(n){var t,e,a;for(t in e=this.defaults)if(!(a=e[t])||/[^a-z0-9_-]/i.test(a))throw new Error("invalid options.".concat(t,": ").concat(a))},e.fn.jatyping.defaults={baseTagName:"span",baseClassName:"jatyping",caretTagName:"span",caretClassName:"jatyping-caret",inputTagName:"span",inputClassName:"jatyping-input",typingClassName:"jatyping-typing",convertClassName:"jatyping-convert",removeSpeed:25,typeSpeed:80,typeStartSpeed:150,convertSpeed:150,convertJumpSpeed:200}}).call(this);
},{}]},{},["APfv"], null)