$(document).on("click","a",function(){var c,i;if(!(c=$(this)).hasClass("clicked"))return i=c.find("img")[0],$("body").css({backgroundImage:"url("+i.src+")",backgroundSize:i.width+"px "+i.height+"px"}),c.addClass("clicked"),!1});