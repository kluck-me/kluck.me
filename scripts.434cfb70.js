parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pijN":[function(require,module,exports) {
(function(){"speechSynthesis"in window||alert("Not support speech API"),window.vm=new Vue({el:"#vue",data:{lang:"ja-JP",text:"",voices:[],selectedVoiceURI:null,volume:1,pitch:1,rate:1,playing:!1,speaking:!1},computed:{selectedVoice:function(){var e=this;return this.voices.find(function(s){return s.voiceURI===e.selectedVoiceURI})}},methods:{play:function(){var e;speechSynthesis.paused?speechSynthesis.resume():(speechSynthesis.cancel(),(e=new SpeechSynthesisUtterance(this.text)).lang=this.lang,e.voice=this.selectedVoice,e.volume=this.volume,e.pitch=this.pitch,e.rate=this.rate,speechSynthesis.speak(e))},pause:function(){speechSynthesis.pause()},stop:function(){speechSynthesis.cancel()},updateVoices:function(){var e;e=/^[a-z]+/i.exec(this.lang)[0],this.voices=speechSynthesis.getVoices().filter(function(s){return s.lang.startsWith(e)}),this.voices.length&&!this.selectedVoice&&(this.selectedVoiceURI=this.voices[0].voiceURI)}},mounted:function(){var e=this;this.updateVoices(),speechSynthesis.onvoiceschanged=function(){e.updateVoices()},setInterval(function(){e.playing=speechSynthesis.speaking&&!speechSynthesis.paused},100)}})}).call(this);
},{}]},{},["pijN"], null)