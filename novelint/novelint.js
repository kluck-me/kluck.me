var Novelint;Novelint=function(){function t(){this.checkers={},this.results=[],this.count=0}return t.match=function(t,n,e){return function(s){var h,i,r,o;for(o=[];r=n.exec(s);)(!e||e(r))&&(h=r.index,i=0,r[2]?(h+=r[1].length,i=r[2].length):r[1]&&(i=r[1].length),o.push([t,h,h+i]));return o}},t.prototype.add=function(t,n){var e;((e=this.checkers)[t]||(e[t]=[])).push(n)},t.prototype.addMatch=function(n,e,s,h){this.add(n,t.match(e,s,h))},t.prototype.check=function(t,n){var e,s,h,i,r,o,c,l,u,p,a,f;this.text=t.replace(/\r\n?/g,"\n"),a=[];for(l in this.checkers)if(n[l])for(p=this.checkers[l],h=0,o=p.length;o>h;h++)e=p[h],a=a.concat(e.call(this,this.text));for(u=[],s={},r=0,c=a.length;c>r;r++)f=a[r],i=f.join("\n"),s[i]||(u.push([""+f[0],f[1],f[1]],[null,f[1],f[2]]),s[i]=!0);return u.sort(function(t,n){return t[2]-n[2]||t[1]-n[1]||(null===t[0]?1:null===n[0]?-1:0)}),this.count=u.length/2,this.results=u,this},t.prototype.html=function(){var t,n,e,s,h,i,r;for(r=[],t=0,i=this.results,n=0,e=i.length;e>n;n++)h=i[n],t!==h[2]&&(r.push(this.text.slice(t,h[2])),t=h[2]),null===h[0]?r.push("</span>"):(s=h[0].split(":"),r.push('<span class="bg-'+s[0]+'" data-toggle="tooltip" title="'+(s[1]||"エラー")+'">&shy;'));return t!==this.text.length&&r.push(this.text.slice(t)),r.join("")},t}();