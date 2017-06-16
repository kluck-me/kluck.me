(function(){!function(t){function n(t,n,o){this.x=t,this.y=n,this.z=o}function o(t){return t*t*t*(t*(6*t-15)+10)}function r(t,n,o){return(1-o)*t+o*n}var e=t.noise={};n.prototype.dot2=function(t,n){return this.x*t+this.y*n},n.prototype.dot3=function(t,n,o){return this.x*t+this.y*n+this.z*o};var a=[new n(1,1,0),new n(-1,1,0),new n(1,-1,0),new n(-1,-1,0),new n(1,0,1),new n(-1,0,1),new n(1,0,-1),new n(-1,0,-1),new n(0,1,1),new n(0,-1,1),new n(0,1,-1),new n(0,-1,-1)],i=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],s=new Array(512),d=new Array(512);e.seed=function(t){t>0&&t<1&&(t*=65536),(t=Math.floor(t))<256&&(t|=t<<8);for(var n=0;n<256;n++){var o;o=1&n?i[n]^255&t:i[n]^t>>8&255,s[n]=s[n+256]=o,d[n]=d[n+256]=a[o%12]}},e.seed(0);var u=.5*(Math.sqrt(3)-1),l=(3-Math.sqrt(3))/6,f=1/6;e.simplex2=function(t,n){var o,r,e,a,i,f=(t+n)*u,c=Math.floor(t+f),h=Math.floor(n+f),v=(c+h)*l,p=t-c+v,y=n-h+v;p>y?(a=1,i=0):(a=0,i=1);var w=p-a+l,M=y-i+l,b=p-1+2*l,g=y-1+2*l,x=d[(c&=255)+s[h&=255]],m=d[c+a+s[h+i]],$=d[c+1+s[h+1]],k=.5-p*p-y*y;o=k<0?0:(k*=k)*k*x.dot2(p,y);var z=.5-w*w-M*M;r=z<0?0:(z*=z)*z*m.dot2(w,M);var q=.5-b*b-g*g;return e=q<0?0:(q*=q)*q*$.dot2(b,g),70*(o+r+e)},e.simplex3=function(t,n,o){var r,e,a,i,u,l,c,h,v,p,y=(t+n+o)*(1/3),w=Math.floor(t+y),M=Math.floor(n+y),b=Math.floor(o+y),g=(w+M+b)*f,x=t-w+g,m=n-M+g,$=o-b+g;x>=m?m>=$?(u=1,l=0,c=0,h=1,v=1,p=0):x>=$?(u=1,l=0,c=0,h=1,v=0,p=1):(u=0,l=0,c=1,h=1,v=0,p=1):m<$?(u=0,l=0,c=1,h=0,v=1,p=1):x<$?(u=0,l=1,c=0,h=0,v=1,p=1):(u=0,l=1,c=0,h=1,v=1,p=0);var k=x-u+f,z=m-l+f,q=$-c+f,A=x-h+2*f,I=m-v+2*f,j=$-p+2*f,B=x-1+.5,C=m-1+.5,D=$-1+.5,E=d[(w&=255)+s[(M&=255)+s[b&=255]]],F=d[w+u+s[M+l+s[b+c]]],G=d[w+h+s[M+v+s[b+p]]],H=d[w+1+s[M+1+s[b+1]]],J=.5-x*x-m*m-$*$;r=J<0?0:(J*=J)*J*E.dot3(x,m,$);var K=.5-k*k-z*z-q*q;e=K<0?0:(K*=K)*K*F.dot3(k,z,q);var L=.5-A*A-I*I-j*j;a=L<0?0:(L*=L)*L*G.dot3(A,I,j);var N=.5-B*B-C*C-D*D;return i=N<0?0:(N*=N)*N*H.dot3(B,C,D),32*(r+e+a+i)},e.perlin2=function(t,n){var e=Math.floor(t),a=Math.floor(n);t-=e,n-=a;var i=d[(e&=255)+s[a&=255]].dot2(t,n),u=d[e+s[a+1]].dot2(t,n-1),l=d[e+1+s[a]].dot2(t-1,n),f=d[e+1+s[a+1]].dot2(t-1,n-1),c=o(t);return r(r(i,l,c),r(u,f,c),o(n))},e.perlin3=function(t,n,e){var a=Math.floor(t),i=Math.floor(n),u=Math.floor(e);t-=a,n-=i,e-=u;var l=d[(a&=255)+s[(i&=255)+s[u&=255]]].dot3(t,n,e),f=d[a+s[i+s[u+1]]].dot3(t,n,e-1),c=d[a+s[i+1+s[u]]].dot3(t,n-1,e),h=d[a+s[i+1+s[u+1]]].dot3(t,n-1,e-1),v=d[a+1+s[i+s[u]]].dot3(t-1,n,e),p=d[a+1+s[i+s[u+1]]].dot3(t-1,n,e-1),y=d[a+1+s[i+1+s[u]]].dot3(t-1,n-1,e),w=d[a+1+s[i+1+s[u+1]]].dot3(t-1,n-1,e-1),M=o(t),b=o(n),g=o(e);return r(r(r(l,v,M),r(f,p,M),g),r(r(c,y,M),r(h,w,M),g),b)}}(this),$(function(){var t=0,n=function(){var n=$(".entry-content img:visible,.entry-content [data-entry-image]");if(n.length){var o=$(n[t++%n.length]),r=o.attr("data-entry-image")||o.attr("src");return!!r&&($("html").find(":visible:first").css("background","url("+r+")"),!0)}};n(),setInterval(n,1e3);var o=$("<style>");o.html(["#container-inner, .entry-list {","background: rgba(255, 255, 255, 0.9);","}","body {","transition: background-position 0.2s ease-in-out 0, background-size 0.2s ease-in-out 0;","}"].join("\n")),$("body").append(o)}),noise.seed(Math.random());var t=0,n=function(){$("body").css("background-position",100*noise.perlin2(t,2*t)+"px "+100*noise.perlin2(2*t,3*t)+"px"),$("body").css("background-size",250*noise.perlin2(t/2,t)+260+"px "+(250*noise.perlin2(t/3,t/2)+260)+"px"),t+=.05};n(),setInterval(n,100)}).call(this);