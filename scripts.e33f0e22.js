parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"RfRb":[function(require,module,exports) {
module.exports="/kuroto.b7d24fdb.jpg";
},{}],"PAXg":[function(require,module,exports) {
(function(){var e,t,i;e=function(e,t,i,a){e.beginPath(),e.arc(t,i,a,0,2*Math.PI,!1),e.closePath(),e.fill()},t=function(t,i,a,s,h){var n,o,l,r;r=parseFloat(s),n=6/Math.PI,l=Math.PI*r,e(t,i+(o=n*l)*Math.cos(l),a+o*Math.sin(l),parseFloat(h))},(i=new Image).src=require("./kuroto.jpg"),i.onload=function(){var e;e={left_eye_pos:"1.07",left_eye_size:"6",right_eye_pos:"1.07",right_eye_size:"6"},new Vue({el:"#vue",data:Object.assign({},e),methods:{update:function(){var e,a;(a=(e=this.$refs.canvas).getContext("2d")).fillStyle="white",a.fillRect(0,0,e.width,e.height),a.drawImage(i,0,0,e.width,e.height),a.fillStyle="black",t(a,85,172,this.left_eye_pos,this.left_eye_size),t(a,179,178,this.right_eye_pos,this.right_eye_size),this.$refs.download.href=e.toDataURL()},reset:function(){Object.assign(this,e),this.update()}},mounted:function(){this.update()}})}}).call(this);
},{"./kuroto.jpg":"RfRb"}]},{},["PAXg"], null)