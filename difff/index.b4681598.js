var tolf=function(t){return t.replace(/\r\n?/g,"\n")},h=function(t){return(""+t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},mark=function(t){return t.split("\n").map((function(t){return'<mark class="alert-primary">'.concat(h(t),"</mark>")})).join("\n")};window.vm=new Vue({el:"#vue",data:{inputs:["下記の文章を比較してください。\n   Betty Botter bought some butter, \nBut, she said, this butter's bitter;\nIf I put it in my batter,\nIt will make my batter bitter,\nBut a bit of better butter\nWill make my batter better.\nSo she bought a bit of butter\nBetter than her bitter butter,\nAnd she put it in her batter,\nAnd it made her batter better,\nSo 'twas better Betty Botter\nBought a bit of better butter.","下記の文章を，ﾋﾋ較してくだちい．\nBetty Botter bought some butter,\nbut, she said, the butter's bitter;\nIf I put it in my batter,\nThat will make my batter bitter.\nBut a bit of better butter, \nThat will make my batter better.\nSo she bought a bit of butter\nBetter than her bitter butter.\nAnd she put it in her batter,\nAnd it made her batter better.\nSo it was better Betty Botter\nBought a bit of better butter."],row_htmls:[],stats:[],global_stat:null},methods:{diff:function(){var t,e=this,r=function(){var r=[],n=!0,a=!1,o=void 0;try{for(var l,i=e.inputs[Symbol.iterator]();!(n=(l=i.next()).done);n=!0)t=l.value,r.push(tolf(t))}catch(t){a=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(),n=function(){var e=[],n=!0,a=!1,o=void 0;try{for(var l,i=r[Symbol.iterator]();!(n=(l=i.next()).done);n=!0){var u=(t=l.value).replace(/\s+/g,"").length,h=t.replace(/\n+/g,"").length;e.push({char_count:u,space_count:h-u,line_count:t.length-h,word_count:t.split(/\s+/).filter((function(t){return t.length})).length})}}catch(t){a=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return e}(),a=Diff.diffChars("".concat(r[0],"\n"),"".concat(r[1],"\n"));"development"===process.env.NODE_ENV&&pp(a);var o=["removed","added"],l=[],i=["",""],u={same_char_count:0,total_char_count:0,same_line_count:0,total_line_count:0},b=[0,0],c=!0,s=!1,f=void 0;try{for(var m,p=a[Symbol.iterator]();!(c=(m=p.next()).done);c=!0){var d,v=m.value,y=v.value.replace(/\s+/g,"").length;for(v.removed?b[0]+=y:v.added?b[1]+=y:(u.same_char_count+=y,u.total_char_count+=y+Math.max.apply(this,b),b=[0,0]),d=0;d<o.length;d++){var _=o[d];v[o[1-d]]||(i[d]+=v[_]?mark(v.value):h(v.value))}for(;;){var g=i.map((function(t){return/^.*\n/.exec(t)}));if(!g[0]&&!g[1])break;var B=["",""];for(d=0;d<g.length;d++){var w=g[d];w&&(B[d]=w[0],i[d]=i[d].slice(w[0].length))}B[0]===B[1]&&(u.same_line_count+=1),u.total_line_count+=1,l.push(B)}}}catch(t){s=!0,f=t}finally{try{c||null==p.return||p.return()}finally{if(s)throw f}}u.total_char_count+=Math.max.apply(this,b),this.stats=n,this.global_stat=u,this.row_htmls=l}},mounted:function(){"development"===process.env.NODE_ENV&&this.diff()}});