parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"v0jR":[function(require,module,exports) {
(function(){var t,e,r;r=function(t){return t.replace(/\r\n?/g,"\n")},t=function(t){return(""+t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},e=function(e){return e.split("\n").map(function(e){return'<mark class="alert-primary">'.concat(t(e),"</mark>")}).join("\n")},window.vm=new Vue({el:"#vue",data:{old_str:"下記の文章を比較してください。\n   Betty Botter bought some butter, \nBut, she said, this butter's bitter;\nIf I put it in my batter,\nIt will make my batter bitter,\nBut a bit of better butter\nWill make my batter better.\nSo she bought a bit of butter\nBetter than her bitter butter,\nAnd she put it in her batter,\nAnd it made her batter better,\nSo 'twas better Betty Botter\nBought a bit of better butter.",new_str:"下記の文章を，ﾋﾋ較してくだちい．\nBetty Botter bought some butter,\nbut, she said, the butter's bitter;\nIf I put it in my batter,\nThat will make my batter bitter.\nBut a bit of better butter, \nThat will make my batter better.\nSo she bought a bit of butter\nBetter than her bitter butter.\nAnd she put it in her batter,\nAnd it made her batter better.\nSo it was better Betty Botter\nBought a bit of better butter.",result_html:""},methods:{diff:function(){var n,a,i,u,o,b,h,l,s,c,d,f,m;for(a=Diff.diffChars("".concat(r(this.old_str),"\n"),"".concat(r(this.new_str),"\n")),f=[],c="",l="",b=0,h=a.length;b<h;b++)for((n=a[b]).added||(c+=n.removed?e(n.value):t(n.value)),n.removed||(l+=n.added?e(n.value):t(n.value));d=/^.+\n/.exec(c),s=/^.+\n/.exec(l),d||s;)u=["",""],d&&(u[0]=d[0],c=c.slice(d[0].length)),s&&(u[1]=s[0],l=l.slice(s[0].length)),f.push(u);m=function(){var t,e,r;for(r=[],t=0,e=f.length;t<e;t++)u=f[t],o=function(){var t,e,r;for(r=[],t=0,e=u.length;t<e;t++)i=u[t],r.push('<div class="col-6">'.concat(i,"</div>"));return r}(),r.push('<div class="row">'.concat(o.join(""),"</div>"));return r}(),this.result_html=m.join("")}},mounted:function(){0}})}).call(this);
},{}]},{},["v0jR"], null)