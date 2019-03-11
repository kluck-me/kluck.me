parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"lj3c":[function(require,module,exports) {
function t(t){return n(t)||a(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function n(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e,a){return e&&o(t.prototype,e),a&&o(t,a),t}(function(){var e,a,n,o,s,u,c,l;s=function(){function t(){r(this,t),this.callbacks=[]}return i(t,[{key:"onMessage",value:function(t){this.callbacks.push(t)}},{key:"parseBoard",value:function(t){return this.board=t.trim().split("\n").map(function(t){return t.trim().split(/\D+/).map(function(t){return parseInt(t,10)})}),this}},{key:"stop",value:function(){var t;return null!=(t=this.worker)&&t.terminate(),this.worker=null,this}},{key:"run",value:function(){var t,e,a,n;if(!this.worker){for(this.worker=new Worker("/solver.78ead72e.js"),e=0,a=(n=this.callbacks).length;e<a;e++)t=n[e],this.worker.addEventListener("message",t,!1);this.worker.postMessage({board:this.board})}return this}}]),t}(),n=$("#result"),a=$("#error"),o=$("form textarea"),e=$("form button"),(c=new s).onMessage(function(e){var n;switch(e.data.type){case"result":u.init(c.board,e.data.value),u.renderNextMove(),c.stop();break;case"error":console.error(e.data),a.show().find("p").text(e.data.value),c.stop();break;case"debug":(n=console).log.apply(n,t(e.data.value))}l()}),l=function(){c.worker?(e.text("とめる"),o.prop("disabled",!0)):(e.text("さがす"),o.prop("disabled",!1))},$("form").submit(function(){return c.worker?c.stop():(c.parseBoard(o.val()),n.hide(),a.hide(),c.run()),l(),!1}),l(),"localhost"===location.hostname&&$("form").submit(),u={moves:{u:{x:0,y:-1,path:"u"},r:{x:1,y:0,path:"r"},d:{x:0,y:1,path:"d"},l:{x:-1,y:0,path:"l"}},init:function(t,e){var a,r,o,i,s,u,c,l,d,p,f;for(r=n.find("#puzzle").empty(),l=-1,o=t.length,d=t[0].length,f=i=0,u=o;i<u;f=i+=1)for(p=s=0,c=d;s<c;p=s+=1)a=$("<span>").text(t[f][p]).appendTo(r),this.updatePanel(a,p,f),t[f][p]||(l={x:p,y:f});r.css({width:"".concat(2*d,"em"),height:"".concat(2*o,"em")}),n.data({actions:e,index:-1,space:l}).show()},getPanel:function(t,e){return $("#puzzle span[data-x=".concat(Number(t),"][data-y=").concat(Number(e),"]"))},updatePanel:function(t,e,a){return t.attr({"data-x":e,"data-y":a}).css({left:"".concat(2*e,"em"),top:"".concat(2*a,"em")})},renderNextMove:function(){var t,e,a,r;r=n.data("space"),e=n.data("index")+1,(t=n.data("actions")[e])&&(a=this.moves[t],$("#puzzle span").removeClass("next-move"),this.getPanel(r.x+a.x,r.y+a.y).addClass("next-move"))},renderMoved:function(){var t,e,a,r,o,i,s,u;i=n.data("space"),r=n.data("index")+1,(a=n.data("actions")[r])&&(o=this.moves[a],s=i.x+o.x,u=i.y+o.y,e=this.getPanel(i.x,i.y),t=this.getPanel(s,u),this.updatePanel(e,s,u),this.updatePanel(t,i.x,i.y),n.data({index:r,space:{x:s,y:u}}))}},$('button[rel="next"]').click(function(){return u.renderMoved(),u.renderNextMove(),!1})}).call(this);
},{"./solver.coffee":[["solver.78ead72e.js","Y4I/"],"Y4I/"]}]},{},["lj3c"], null)