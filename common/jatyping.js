var slice=[].slice;!function(e){var n,t,a,i,r,s,o,u,p,l;l=function(){var e,n,t,a,i,r,s,o,u,p,l,c;l={"ん":["ｎ"]},n={"ｋ":"かきくけこ","ｇ":"がぎぐげご","ｓ":"さしすせそ","ｚ":"ざじずぜぞ","ｔ":"たちつてと","ｄ":"だぢづでど","ｎ":"なにぬねの","ｈ":"はひふへほ","ｂ":"ばびぶべぼ","ｐ":"ぱぴぷぺぽ","ｍ":"まみむめも","ｙ":"やゆよ","ｒ":"らりるれろ","ｗ":"わを"},c=["ゃ","ゅ","ょ"];for(i in n){for(s=0,o=(e=n[i].split("")).length;s<o;s++)l[r=e[s]]=[i,r];if(5===e.length)for(t=e[1],p=0,u=c.length;p<u;p++)l[a=""+t+c[p]]="じ"===t?["ｊ",a]:[i,i+"ｙ",a]}return l}(),p=function(e){var n,t,a,i,r,s,o,u,p,c,f;for(f=[],r="",n=i=0,s=(c=e.match(/.[ゃゅょ]|./g)).length;i<s;n=++i){for(u=0,o=(a="っ"===(p=c[n])&&l[c[n+1]]?[l[c[n+1]][0]]:l[p]||[p]).length;u<o;u++)t=a[u],f.push(""+r+t);r+=p}return f[f.length-1]!==r&&f.push(r),f},a=function(e,n){return function(){n&&setTimeout(n,e||0)}},n=function(n,t){var a,i;return i=n[t+"TagName"],a=n[t+"ClassName"],e("<"+i+">").addClass(a)},u=function(e,t,i,r,s){var o,u;o=n(i,"input").addClass(i[e+"ClassName"]).appendTo(r),(u=function(e){var n,r,l,c,f,d,g,m,v,h,y,C;if(t[e]){for(f=t[e-1]||"",r=t[e],v="",l=c=0,d=r.length;c<d&&(n=r[l])===f[l];l=++c)v+=n;if(y=p(r.slice(v.length)).map(function(e){return v+e}),f)for(m=g=v.length,h=f.length;g<=h;m=g+=1)y.unshift(f.slice(0,m));C=function(n){o.text(y[n]),y[n+1]?a(i.typeSpeed,function(){return C(n+1)})():u(e+1)},a(i.typeStartSpeed,function(){return C(0)})()}else s&&s()})(0)},o=function(e,t,i,r){var s,o,u,p,l;for(i.empty(),u=0,p=e.length;u<p;u++)o=e[u],n(t,"input").text(o[0]).appendTo(i);(s=i.find(">."+t.inputClassName)).addClass(t.typingClassName),s.eq(0).addClass(t.convertClassName),l=function(n,i){var o,u,p;if(e[n][i])return s.removeClass(t.convertClassName),s.eq(n).addClass(t.convertClassName).text(e[n][i]),void a(t.convertSpeed,function(){return l(n,i+1)})();for(o=u=n+1,p=e.length;u<p;o=u+=1)if(e[o].length>1)return void a(t.convertJumpSpeed,function(){return l(n+1,0)})();r&&r()},a(t.convertJumpSpeed,function(){return l(0,1)})()},s=function(e,n){n.find(">."+e.inputClassName).removeClass(e.typingClassName+" "+e.convertClassName)},t=function(e,i,r,p){var l,c;i.inputs[e]?(c=function(){return s(i,l),a(i.typeStartSpeed,function(){return t(e+1,i,r,p)})()},l=n(i,"base").insertBefore(r),Array.isArray(i.inputs[e][0])?u("typing",i.inputs[e][0],i,l,function(){i.inputs[e][1]?o(i.inputs[e][1],i,l,a(i.convertJumpSpeed,c)):c()}):u("input",i.inputs[e],i,l,c)):p&&p()},r=function(e,n,t){var i,r,s;i=e[0],s=function(e,t){var i;3===e.nodeType?(i=function(r){r>=0?a(n.removeSpeed,function(){return e.nodeValue=e.nodeValue.slice(0,r),i(r-1)})():(e.parentNode.removeChild(e),t&&t())})(e.nodeValue.length-1):s(e.lastChild,function(){e.lastChild||e.parentNode.removeChild(e),t&&t()})},(r=function(){i.previousSibling?s(i.previousSibling,r):t&&t()})()},i=function(){var n,t,a,i,r,s,o,u,p,l,c,f;for(t=arguments[0],f=2<=arguments.length?slice.call(arguments,1):[],p={},r=0,s=t.length;r<s;r++){if(n=t[r],e.isPlainObject(n)){e.extend(p,n);break}for(a=u=0,o=f.length;u<o;a=++u)if(l=f[a],i=l[0],c=l[1],e.isFunction(c)&&c(n)||typeof n===c){p[i]=n,f.splice(a,1);break}}return p},e.fn.jatyping=function(){var s;return s=e.extend({},e.fn.jatyping.defaults,i(arguments,["inputs",Array.isArray],["complete",e.isFunction],["completeDelay","number"])),e.fn.jatyping.assertOptions(s),this.each(function(){var i,o,u;u=this,o=a(s.completeDelay,function(){return s.complete.call(u)}),(i=e(this).find(">."+s.caretClassName)).length||(i=n(s,"caret").appendTo(this)),s.inputs?t(0,s,i,o):r(i,s,o)})},e.fn.jatyping.assertOptions=function(e){var n,t,a;t=this.defaults;for(n in t)if(!(a=t[n])||/[^a-z0-9_-]/i.test(a))throw new Error("invalid options."+n+": "+a)},e.fn.jatyping.defaults={baseTagName:"span",baseClassName:"jatyping",caretTagName:"span",caretClassName:"jatyping-caret",inputTagName:"span",inputClassName:"jatyping-input",typingClassName:"jatyping-typing",convertClassName:"jatyping-convert",removeSpeed:25,typeSpeed:80,typeStartSpeed:150,convertSpeed:150,convertJumpSpeed:200}}(jQuery);