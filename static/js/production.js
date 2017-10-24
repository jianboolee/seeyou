$(document).ready(function(){
	var h = $(window).height();
	var w = $(window).width();
	// $(".full-page-section").css('height',h);

	var start_top = $(document).scrollTop();
	var end_top = $(document).scrollTop();

	var $body = $("html, body");

	var last_top = $(document).scrollTop();

	var i = 0;

	// $(document).scroll(function(){
	// 	var current_top = $(document).scrollTop();
	// 	var n = parseInt(current_top/h);
	// 	if(current_top>last_top){
	// 		console.log('scroll down');
	// 		i = i-8;
	// 	}else{
	// 		console.log('scroll up');
	// 		i = i+8;
	// 	}
	// 	$(".fly-inbox").css("margin-top",i);
	// 	last_top = current_top;
	// })
	
	// $(document).scrollStopped(function(){
	// 	end_top = $(document).scrollTop();
	// 	var n = parseInt(end_top/h);
	// 	var target_top ;

	// 	if(end_top>(start_top)){
	// 		target_top = (n+1)*h;
	// 	}else{
	// 		target_top = (n)*h;
	// 	}
	// 	$body.animate({scrollTop:target_top});

	// 	start_top = target_top;
	// 	return this;
	// });
});

$.fn.scrollStopped = function(callback) {           
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,100,self));
        });
    };





