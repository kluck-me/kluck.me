var $button,$input,$pre,Solver,cache,solver,updateView;Solver=function(){function e(){this.callbacks=[]}return e.prototype.onMessage=function(e){this.callbacks.push(e)},e.prototype.parseNumbers=function(e){var t;return t=e.match(/[+-]?\d+/g),this.numbers=t?t.filter(function(e){return 1===e.length}).map(function(e){return parseInt(e,10)}):[],this.runnable=4===this.numbers.length,this},e.prototype.stop=function(){return this.running&&(this.worker.terminate(),this.worker=null,this.running=!1),this},e.prototype.run=function(){var e,t,n,r;if(this.runnable&&!this.running){for(this.running=!0,this.worker=new Worker("solver.js"),r=this.callbacks,t=0,n=r.length;t<n;t++)e=r[t],this.worker.addEventListener("message",e,!1);this.worker.postMessage({numbers:this.numbers,answer:10})}return this},e}(),solver=new Solver,cache=null,$pre=$("pre"),$input=$('form input[name="numbers"]'),$button=$("form button"),updateView=function(){solver.running?($button.text("とめる"),$input.prop("disabled",!0)):($button.text("さがす").prop("disabled",!solver.parseNumbers($input.val()).runnable),$input.prop("disabled",!1))},solver.onMessage(function(e){var t;switch(e.data.type){case"result":t=e.data.value,cache[t]||(cache[t]=!0,$pre.append(document.createTextNode(t+"\n")));break;case"finish":solver.stop();break;case"debug":console.log.apply(console,e.data.value)}updateView()}),$("form").submit(function(){return solver.running?solver.stop():(solver.parseNumbers($input.val()),solver.runnable&&(cache={},$pre.empty(),solver.run())),updateView(),!1}),$input.on("input",updateView);