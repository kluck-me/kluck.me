var Novelint,novelint,pp;pp=console.log.bind(console),Novelint=function(){function t(){this.checkers={},this.results=[],this.count=0}return t.match=function(t,n,e){return function(i){var o,r,a,h;for(h=[];a=n.exec(i);)(!e||e(a))&&(o=a.index,r=0,a[2]?(o+=a[1].length,r=a[2].length):a[1]&&(r=a[1].length),h.push([t,o,o+r]));return h}},t.prototype.add=function(t,n){var e;((e=this.checkers)[t]||(e[t]=[])).push(n)},t.prototype.addMatch=function(n,e,i,o){this.add(n,t.match(e,i,o))},t.prototype.check=function(t,n){var e,i,o,r,a,h,l,c,s,d;this.text=t.replace(/\r\n?/g,"\n"),s=[];for(h in this.checkers)if(n[h])for(c=this.checkers[h],i=0,r=c.length;r>i;i++)e=c[i],s=s.concat(e.call(this,this.text));for(l=[],o=0,a=s.length;a>o;o++)d=s[o],l.push([d[0],d[1],d[1]],["end",d[1],d[2]]);return l.sort(function(t,n){return t[2]-n[2]||n[1]-t[1]||("end"===t[0]?1:"end"===n[0]?-1:0)}),this.count=s.length,this.results=l,this},t.prototype.html=function(){var t,n,e,i,o,r,a;for(a=[],t=0,r=this.results,n=0,e=r.length;e>n;n++)o=r[n],t!==o[2]&&(a.push(this.text.slice(t,o[2])),t=o[2]),"end"===o[0]?a.push("</span>"):(i=o[0].split(":"),a.push('<span class="bg-'+i[0]+'" data-toggle="tooltip" title="'+(i[1]||"エラー")+'">&shy;'));return t!==this.text.length&&a.push(this.text.slice(t)),a.join("")},t}(),novelint=new Novelint,novelint.addMatch("indent","danger:間違った字下げです。",/^[^　（｟「『［〚｛〔〘〈《【〖«‘“]/gm,function(t){return"\n"!==t.input.slice(t.index,t.index+1)}),novelint.addMatch("mark-before-close-quote","danger:閉じ括弧前に句読点は不要です。",/([、。])[）｠」』］〛｝〕〙〉》】〗»’”]/gm),novelint.addMatch("space-after-mark","danger:感嘆符・疑問符の後にはスペースが必要です。",/([！？])[^　！？）｠」』］〛｝〕〙〉》】〗»’”\n]/gm),novelint.addMatch("double-mark","danger:二つ一組で使う必要があります。",/(\u2014+|\u2026+)/gm,function(t){return 2!==t[1].length}),novelint.addMatch("single-mark","danger:単体で使う必要があります。",/([、。]{2,})/gm),novelint.addMatch("halfwidth-char","warning:半角文字です。",/([ -~]+)/gm),novelint.addMatch("fullwidth-char","warning:全角文字です。",/([０-９Ａ-Ｚａ-ｚ]+)/gm),novelint.addMatch("extra-space","warning:末尾の不要なスペースです。",/(　+)$/gm),novelint.addMatch("extra-space","warning:不要なスペースです。",/([^\n！？])(　+)/gm),$(function(t){var n,e;n=-1,t("#checker").submit(function(){var e;return e={},t(this).find('input[type="checkbox"]').each(function(){e[this.name]=this.checked}),novelint.check(this.text.value,e),t("h2").text(t("h2").text().replace(/\d+/,novelint.count)),t("#result").html(novelint.html()),t('#result [data-toggle="tooltip"]').tooltip(),n=-1,t(".hide").removeClass("hide"),!1}),t("#prev-error").click(function(){var i;return i=t('#result [data-toggle="tooltip"]'),0>=n&&(n=i.length),n--,e(i,n),!1}),t("#next-error").click(function(){var i;return i=t('#result [data-toggle="tooltip"]'),n>=i.length-1&&(n=-1),n++,e(i,n),!1}),e=function(n,e){n.not(":eq("+e+")").tooltip("hide"),n.eq(e).tooltip("show"),t("html,body").animate({scrollTop:n.eq(e).offset().top-window.innerHeight/2})},"localhost"===location.hostname&&t("#checker").find('[name="text"]').val("　あ　い。う？　え？　\n　お！").end().submit()});