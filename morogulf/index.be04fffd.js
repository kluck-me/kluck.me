var inital_data={first_text:"モロ湾",second_text:"Moro Gulf"};window.vm=new Vue({el:"#vue",data:Object.assign({},inital_data),methods:{update:function(){var t=this.$refs.canvas,e=t.getContext("2d");e.fillStyle="rgb(170,191,218)",e.fillRect(0,0,t.width,t.height),e.fillStyle="rgb(105,122,148)",e.textAlign="center",e.font='17px "M PLUS Rounded 1c"',e.fillText(this.first_text,t.width/2-5,t.height/2+8),e.font='italic 12px "M PLUS Rounded 1c"',e.fillText(this.second_text,t.width/2-5,t.height/2+23),this.$refs.download.href=t.toDataURL()},reset:function(){Object.assign(this,inital_data),this.update()}},mounted:function(){this.update()}});