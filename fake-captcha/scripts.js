var createTextImageData,rand,reload,updateCaptcha;rand=function(a,t){return Math.floor(Math.random()*(t+1-a))+a},createTextImageData=function(a,t,e){var n,r;return n=document.createElement("canvas"),n.width=t,n.height=e,r=n.getContext("2d"),r.fillStyle="white",r.fillRect(0,0,t,e),r.fillStyle="black",r.font=.75*Math.min(e,t/a.length)+"px serif",r.textAlign="center",r.textBaseline="middle",r.fillText(a,t/2,e/2,t),r.getImageData(0,0,t,e)},updateCaptcha=function(a,t,e,n){var r,d,l,i,o,h,c,u,f,g,m,x,p,M,s,v,D,I,C,$,T,w,k,y,S,b,A,B,E,R,j,q,z,F,G,H,J,K,L,N,O,P;for(h=a.getContext("2d"),N=a.width,x=a.height,c=h.getImageData(0,0,N,x),J=createTextImageData(t,N,x),$=rand(75e4,12e5)/1e7,T=rand(75e4,12e5)/1e7,w=rand(75e4,12e5)/1e7,k=rand(75e4,12e5)/1e7,y=rand(0,3141592)/5e5,S=rand(0,3141592)/5e5,b=rand(0,3141592)/5e5,A=rand(0,3141592)/5e5,B=rand(330,420)/110,C=rand(330,450)/110,s=function(a,t){return 4*(a+t*N)},O=p=0,E=N;p<E;O=p+=1)for(P=v=0,R=x;v<R;P=v+=1){for(r=1,G=O+(Math.sin(O*$+y)+Math.sin(P*w+S))*B,H=P+(Math.sin(O*T+b)+Math.sin(P*k+A))*C,K=Math.floor(G),L=Math.floor(H),0<=G&&G<N&&0<=H&&H<x&&(d=null!=(j=J.data[s(K,L)+2])?j:255,i=null!=(q=J.data[s(K+1,L)+2])?q:255,l=null!=(z=J.data[s(K,L+1)+2])?z:255,o=null!=(F=J.data[s(K+1,L+1)+2])?F:255,f=1-(u=G-K),m=1-(g=H-L),r=Math.min(255,d*f*m+i*u*m+l*f*g+o*u*g)/255),M=s(O,P),I=D=0;D<=2;I=++D)c.data[M+I]=(1-r)*e[I]+r*n[I];c.data[M+3]=255}h.putImageData(c,0,0)},reload=function(){var a;a=$("#text").val(),updateCaptcha($("#captcha")[0],a,[rand(0,100),rand(0,100),rand(0,100)],[rand(200,255),rand(200,255),rand(200,255)]),$("#length").text(a.length)},$("#reload").click(reload),$("#text").on("input",reload),reload();