parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"MrZ7":[function(require,module,exports) {
(function(){var t,e,n,a,i,o;t=function(t,e,n){var a,i,o,r;for(o=0,r=t.length-1;o<=r;)if((a=n(e,t[i=r+o>>1]))>0)o=i+1;else{if(!(a<0))return i;r=i-1}return-o-1},e=function(t){return new Promise(function(e,n){t?$.get({url:"//video.google.com/timedtext",data:{type:"list",v:t},dataType:"xml"}).then(function(n){var a;a={},$("transcript_list>track",n).each(function(){var e,n;n=(e=$(this)).attr("lang_code"),a[n]={label:e.attr("lang_original"),params:{name:e.attr("name"),lang:n,v:t}}}),e(a)},n):n()})},n=function(t,e){var n;return n={},e.forEach(function(e){var a,i;(a=t[e])&&(i=n[e]=[],$.get({url:"//video.google.com/timedtext",data:a.params,dataType:"xml"}).done(function(t){$("transcript>text",t).each(function(){var t,e,n;t=$(this),n=parseFloat(t.attr("start")),e=parseFloat(t.attr("dur")),i.push({start:n,end:n+e,text:t.text()})})}))}),n},window.vm=new Vue({el:"#vue",data:{videoId:null,texts:[],subs:null,langs:null,selectedCodes:{},url:""},computed:{codes:function(){var t=this;return Object.keys(this.selectedCodes).filter(function(e){return t.selectedCodes[e]}).sort()}},watch:{url:function(t){var e;this.fetchLangs(null!=(e=/v=([^=&?]+)/.exec(t))?e[1]:void 0)}},methods:{play:function(){$("#modal-conf").modal("hide"),this.videoId&&player.getVideoData().video_id!==this.videoId&&player.loadVideoById(this.videoId)},fetchLangs:function(t){var n=this;return this.videoId=t,this.langs=null,e(t).then(function(t){n.langs=t})},fetchSubs:function(t){if(!this.langs||this.videoId!==t)return this.subs=null,void this.fetchLangs(t);this.subs||(this.subs=n(this.langs,this.codes))},updateSubs:function(e){var n=this;this.texts=this.codes.map(function(a){var i,o;if(n.subs&&(i=n.subs[a],null!=e&&i&&(o=t(i,e,function(t,e){return t>e.end?1:t<e.start?-1:0}))>=0))return i[o].text})}}}),(o=function(){window.vm.updateSubs("undefined"!=typeof player&&null!==player&&"function"==typeof player.getCurrentTime?player.getCurrentTime():void 0),requestAnimationFrame(o)})(),a=function(t){var e;t.target;$("#modal-conf").modal("show"),"localhost"===location.hostname&&(e=function(t){return setTimeout(t,500)})(function(){return window.vm.$data.url="https://www.youtube.com/watch?v=WqUBWz3YR7s",e(function(){return window.vm.$data.selectedCodes={en:!0,"zh-TW":!0},window.vm.$data.url="https://www.youtube.com/watch?v=4cQ4ZQn-KRA",e(function(){return $("#modal-conf .btn-primary").click()})})})},i=function(t){var e=t.target;window.vm.fetchSubs(e.getVideoData().video_id)},window.onYouTubeIframeAPIReady=function(){window.player=new YT.Player("ytplayer",{height:"480",width:"853",events:{onReady:a,onStateChange:i}})}}).call(this);
},{}]},{},["MrZ7"], null)