var update;update=function(){var n;return n=function(){var n;return(n=function(n,t){return"{<big><big>%"+n+"</big>"+t+"</big>}"})("y","年")+n("d","日")+n("h","時間")+n("m","分")+n("s","秒")}(),function(){var t;window.deadline?(t=(deadline-new Date)/1e3|0,t>0?($("#t").html(countdown(n,t)),$("#c").show(),$("#r").hide()):($("#c").hide(),$("#r").show())):($("#c").show(),$("#r").hide()),$(".f").each(function(){autofit(this)})}}(),$(window).on("load",function(){$(window).resize(function(){update()}),setInterval(update,500),update()});