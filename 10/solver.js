var Node,expandUnary,finder,generateBinary,generateExpr,generateUnary,pp,time,slice=[].slice;pp=function(){var t;t=1<=arguments.length?slice.call(arguments,0):[],self.postMessage({type:"debug",value:t})},time=function(t){var e;return e=Date.now(),t(),Date.now()-e},Node=function(){function t(t,e,n,i){this.type=t,this.value=e,this.left=n,this.right=i}return t.nuddyBoth=function(t,e){for(;t.value===e.value&&t.type===e.type&&"number"!==t.type&&!t.right;)t=t.left,e=e.left;return[t,e]},t.prototype.clone=function(){return new t(this.type,this.value,this.left,this.right)},t.prototype.nuddy=function(){var t;for(t=this;"number"!==t.type&&!t.right;)t=t.left;return t},t.prototype.minus=function(){switch(this.type){case"minus":return this.left.clone();case"add":return this.left.minus()[this.type](this.right.minus());case"mul":case"div":return this.left.minus()[this.type](this.right);default:return"pow"===this.type&&this.left.value<0&&this.right.value%2==1?this.left.minus().pow(this.right):0===this.value?this.clone():new t("minus",-this.value,this.clone())}},t.prototype.hasMinus=function(){switch(this.type){case"minus":return!0;case"add":return this.left.hasMinus()&&this.right.hasMinus();case"mul":case"div":return this.left.hasMinus()||this.right.hasMinus();default:return!1}},t.prototype.sqrtable=function(){return this.value>0&&1!==this.value&&isFinite(this.value)},t.prototype.sqrt=function(){return new t("sqrt",Math.sqrt(this.value),this.clone())},t.prototype.factable=function(){return(0===this.value||this.value>2)&&isFinite(this.value)&&Math.round(this.value)===this.value},t.prototype.fact=function(){var e,n,i,r;for(r=1,e=n=1,i=this.value;n<=i&&isFinite(r);e=n+=1)r*=e;return new t("fact",r,this.clone())},t.prototype.calcable=function(t){return isFinite(this.value)===isFinite(t.value)},t.prototype.add=function(e){return"minus"===this.type&&this.value===-e.value?this.minus().sub(e):"minus"===e.type?this.sub(e.minus()):new t("add",this.value+e.value,this.clone(),e.clone())},t.prototype.sub=function(e){var n,i;return n=t.nuddyBoth(this,e),i=n[0],e=n[1],new t("add",i.value-e.value,i.clone(),e.minus())},t.prototype.mul=function(e){var n,i;return i=this,0===i.value&&(e=e.nuddy()),0===e.value&&(i=i.nuddy()),n=e.hasMinus()?"minus":"clone",new t("mul",this.value*e.value,i[n](),e[n]())},t.prototype.div=function(e){var n,i,r;return i=t.nuddyBoth(this,e),r=i[0],e=i[1],n=e.hasMinus()?"minus":"clone",new t("div",r.value/e.value,r[n](),e[n]())},t.prototype.powable=function(t){return 0===this.value||Math.abs(Math.pow(this.value,t.value))>1e-10},t.prototype.pow=function(e){var n,i;return i=this,1===Math.abs(i.value)&&(e=e.nuddy()),0===e.value&&(i=i.nuddy()),n=i.value<0&&e.value%2==0?"minus":"clone",new t("pow",Math.pow(i.value,e.value),i[n](),e.clone())},t.prototype.toString=function(t){var e,n,i,r;switch(null==t&&(t=""),this.type){case"number":return this.value.toString();case"minus":e="-"+this.left.toString("-");break;case"sqrt":e="√"+this.left.toString("@");break;case"fact":e=this.left.toString("@")+"!";break;case"add":if(i=this.right.toString("+"),"-"!==i[0]&&(i="+"+i),e=""+this.left.toString("+")+i,""!==t&&"+"!==t)return"("+e+")";break;case"mul":case"div":if(n={mul:"*",div:"/"}[this.type],r=n,e=""+this.left.toString(r)+n+this.right.toString(r),"/"===n&&"/"===t)return"("+e+")";break;case"pow":e=this.left.toString("@")+"^"+this.right.toString("@");break;default:new Error("not support: "+this.type)}return"@"===t?"("+e+")":e},t}(),expandUnary=function(t,e){t.sqrtable()&&e(t.sqrt()),t.factable()&&e(t.fact())},generateUnary=function(t,e,n){n(e),n(e.minus()),t>0&&expandUnary(e,function(e){generateUnary(t-1,e,n)})},generateBinary=function(t,e,n,i){generateExpr(t,e,function(e){generateExpr(t,n,function(n){e.calcable(n)&&(i(e.add(n)),i(e.sub(n)),i(e.mul(n)),0!==e.value&&1!==Math.abs(n.value)&&i(e.div(n)),t>0&&0!==e.value&&1!==n.value&&e.powable(n)&&i(e.pow(n)))})})},generateExpr=function(t,e,n){var i,r,a;switch(e.length){case 0:throw new Error;case 1:generateUnary(t,e[0],n);break;default:for(i=r=1,a=e.length;r<a;i=r+=1)generateBinary(t,e.slice(0,i),e.slice(i,+e.length+1||9e9),function(e){generateUnary(t,e,n)})}},finder=function(t,e,n,i){var r;return r=!1,generateExpr(n,e.map(function(t){return new Node("number",t)}),function(e){t===e.value&&(r=!0,i(e))}),r},self.addEventListener("message",function(t){pp(time(function(){var e,n,i;for(e=function(t){self.postMessage({type:"result",value:t.toString()})},n=i=0;i<=3&&!finder(t.data.answer,t.data.numbers,n,e);n=++i);})),self.postMessage({type:"finish"})},!1);