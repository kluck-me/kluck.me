!function(n,t){var e,i,a,o,s,c;c=[],o={},i=3e3,e=function(t){var e,i,a,o;for(a=[],e=0,i=t.length;e<i;e++)o=t[e],a.push(n.getJSON("https://api.tumblr.com/v2/tagged?callback=?",{tag:o,api_key:"3jJQBJhS6MidfygWrYPVUqzop3dkdk3kYUc5RUoSxSLL7OUonx"}));return a},a=function(n){/\.gif$/.test(n)&&!o[n]&&(o[n]=!0,c.push(n))},s=function(t){n("#anime"+(1^t)).css({opacity:"","background-image":'url("'+c[Math.random()*c.length|0]+'")'}),n("#anime"+t).css({opacity:"1"})},n.when.apply(n,e(["gif","gifs","anime","anime-gif"])).done(function(){var t,e,o,c,l,r,g,f,h,d,u;for(e=0,l=arguments.length;e<l;e++)for(t=arguments[e],h=t[0].response,o=0,r=h.length;o<r;o++)if(u=h[o],u.photos)for(d=u.photos,c=0,g=d.length;c<g;c++)f=d[c],a(f.original_size.url);n(function(){var t;n("body").append('<div class="anime" id="anime0">','<div class="anime" id="anime1">'),s(1),s(0),t=0,setInterval(function(){s(t^=1)},i)})}),n(t).click(function(t){var e,i;if(e=n("body"),i=n(t.target),e.hasClass("hide-content")||!i.closest("a").length&&!i.closest("section").length)return e.toggleClass("hide-content"),!1})}($,document);