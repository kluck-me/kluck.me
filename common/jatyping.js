var slice=[].slice;!function(e){var n,t,a,i,s,r,o,p,u,l;l=function(){var e,n,t,a,i,s,r,o,p,u,l,c;l={"ん":["ｎ"]},n={"ｋ":"かきくけこ","ｇ":"がぎぐげご","ｓ":"さしすせそ","ｚ":"ざじずぜぞ","ｔ":"たちつてと","ｄ":"だぢづでど","ｎ":"なにぬねの","ｈ":"はひふへほ","ｂ":"ばびぶべぼ","ｐ":"ぱぴぷぺぽ","ｍ":"まみむめも","ｙ":"やゆよ","ｒ":"らりるれろ","ｗ":"わを"},c=["ゃ","ゅ","ょ"];for(i in n){for(r=0,o=(e=n[i].split("")).length;r<o;r++)l[s=e[r]]=[i,s];if(5===e.length)for(t=e[1],u=0,p=c.length;u<p;u++)l[a=""+t+c[u]]="じ"===t?["ｊ",a]:[i,i+"ｙ",a]}return l}(),u=function(e){var n,t,a,i,s,r,o,p,u,c,f;for(f=[],s="",n=i=0,r=(c=e.match(/.[ゃゅょ]|./g)).length;i<r;n=++i){for(p=0,o=(a="っ"===(u=c[n])&&l[c[n+1]]?[l[c[n+1]][0]]:l[u]||[u]).length;p<o;p++)t=a[p],f.push(""+s+t);s+=u}return f[f.length-1]!==s&&f.push(s),f},a=function(e,n){return function(){n&&setTimeout(n,e||0)}},n=function(n,t){var a,i;return i=n[t+"TagName"],a=n[t+"ClassName"],e("<"+i+">").addClass(a)},p=function(e,t,i,s,r){var o,p;o=n(i,"input").addClass(i[e+"ClassName"]).appendTo(s),(p=function(e){var n,s,l,c,f,d,g,m,v,h,y,C;if(t[e]){for(f=t[e-1]||"",s=t[e],v="",l=c=0,d=s.length;c<d&&(n=s[l])===f[l];l=++c)v+=n;if(y=u(s.slice(v.length)).map(function(e){return v+e}),f)for(m=g=v.length,h=f.length;g<=h;m=g+=1)y.unshift(f.slice(0,m));C=function(n){o.text(y[n]),y[n+1]?a(i.typeSpeed,function(){C(n+1)})():p(e+1)},a(i.typeStartSpeed,function(){C(0)})()}else r&&r()})(0)},o=function(e,t,i,s){var r,o,p,u,l;for(i.empty(),p=0,u=e.length;p<u;p++)o=e[p],n(t,"input").text(o[0]).appendTo(i);(r=i.find(">."+t.inputClassName)).addClass(t.typingClassName),r.eq(0).addClass(t.convertClassName),l=function(n,i){var o,p,u;if(e[n][i])return r.removeClass(t.convertClassName),r.eq(n).addClass(t.convertClassName).text(e[n][i]),void a(t.convertSpeed,function(){l(n,i+1)})();for(o=p=n+1,u=e.length;p<u;o=p+=1)if(e[o].length>1)return void a(t.convertJumpSpeed,function(){l(n+1,0)})();s&&s()},a(t.convertJumpSpeed,function(){l(0,1)})()},r=function(e,n){n.find(">."+e.inputClassName).removeClass(e.typingClassName+" "+e.convertClassName)},t=function(e,i,s,u){var l,c;i.inputs[e]?(c=function(){r(i,l),a(i.typeStartSpeed,function(){t(e+1,i,s,u)})()},l=n(i,"base").insertBefore(s),Array.isArray(i.inputs[e][0])?p("typing",i.inputs[e][0],i,l,function(){i.inputs[e][1]?o(i.inputs[e][1],i,l,a(i.convertJumpSpeed,c)):c()}):p("input",i.inputs[e],i,l,c)):u&&u()},s=function(e,n,t){var i,s,r;i=e[0],r=function(e,t){var i;3===e.nodeType?(i=function(s){s>=0?a(n.removeSpeed,function(){e.nodeValue=e.nodeValue.slice(0,s),i(s-1)})():(e.parentNode.removeChild(e),t&&t())})(e.nodeValue.length-1):r(e.lastChild,function(){e.lastChild||e.parentNode.removeChild(e),t&&t()})},(s=function(){i.previousSibling?r(i.previousSibling,s):t&&t()})()},i=function(){var n,t,a,i,s,r,o,p,u,l,c,f;for(t=arguments[0],f=2<=arguments.length?slice.call(arguments,1):[],u={},s=0,r=t.length;s<r;s++){if(n=t[s],e.isPlainObject(n)){e.extend(u,n);break}for(a=p=0,o=f.length;p<o;a=++p)if(l=f[a],i=l[0],c=l[1],e.isFunction(c)&&c(n)||typeof n===c){u[i]=n,f.splice(a,1);break}}return u},e.fn.jatyping=function(){var r;return r=e.extend({},e.fn.jatyping.defaults,i(arguments,["inputs",Array.isArray],["complete",e.isFunction],["completeDelay","number"])),e.fn.jatyping.assertOptions(r),this.each(function(){var i,o,p;p=this,o=a(r.completeDelay,function(){r.complete.call(p)}),(i=e(this).find(">."+r.caretClassName)).length||(i=n(r,"caret").appendTo(this)),r.inputs?t(0,r,i,o):s(i,r,o)})},e.fn.jatyping.assertOptions=function(e){var n,t,a;t=this.defaults;for(n in t)if(!(a=t[n])||/[^a-z0-9_-]/i.test(a))throw new Error("invalid options."+n+": "+a)},e.fn.jatyping.defaults={baseTagName:"span",baseClassName:"jatyping",caretTagName:"span",caretClassName:"jatyping-caret",inputTagName:"span",inputClassName:"jatyping-input",typingClassName:"jatyping-typing",convertClassName:"jatyping-convert",removeSpeed:25,typeSpeed:80,typeStartSpeed:150,convertSpeed:150,convertJumpSpeed:200}}(jQuery);