function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=r.parcelRequire8333;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,r){n[e]=r},r.parcelRequire8333=o),o.register("gC69E",(function(r,t){var n,o;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return o}),(function(e){return o=e}));var s={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)s[r[t]]=e[r[t]]},o=function(e){var r=s[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),o("gC69E").register(JSON.parse('{"kcuam":"index.16d5abdc.js","kFahG":"solver.7b57795e.js"}'));var s={};s=class{stop(){null!=this.worker&&this.worker.terminate(),this.worker=null}run(e,r){this.worker||(this.worker=this.getWorker(),this.worker.addEventListener("message",(e=>{switch(e.data.type){case"result":r(null,e.data.value);break;case"error":r(e.data.value);break;case"finish":this.stop();break;case"debug":console.log(...Array.from(e.data.value||[]))}})),this.worker.postMessage(e))}constructor(e){this.getWorker=e,this.worker=null}};var i,a;a=function(e,r,t){if(r===self.location.origin)return e;var n=t?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))};let u=new URL("../"+o("gC69E").resolve("kFahG"),import.meta.url);i=a(u.toString(),u.origin,!0),window.vm=new Vue({el:"#vue",data:{solver:new s((()=>new Worker(i))),input:"",exprs:[]},computed:{output(){return this.exprs.join("\n")},numbers(){const e=this.input.match(/[+-]?\d+/g);return e?e.filter((e=>1===e.length)).map((e=>parseInt(e,10))):[]},runnable(){return 4===this.numbers.length}},methods:{submit(){if(this.solver.worker)this.solver.stop();else if(this.runnable){const e={};this.exprs=[],this.solver.run({numbers:this.numbers,answer:10},((r,t)=>{e[t]||(e[t]=function(e){let r=0;const t={"+":1,"-":1,"*":2,"/":2,"^":10,"√":11,"!":12};for(let n of e.replace(/[\d()]+/g,""))r+=t[n]||20;return 100*r+e.length}(t),this.exprs.push(t),this.exprs.sort(((r,t)=>e[r]-e[t])))}))}}},mounted(){"localhost"===location.hostname&&(this.input="5,0,2,6",this.submit())}});