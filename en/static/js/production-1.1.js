
var page = {};
page.$ele = $(".full-page-section"); //满屏元素
page.$eleImg = $(".full-page-section img"); //满屏元素内的图片
page.imgWidth = 1440; //图片宽度
page.imgHeight = 800; //图片高度

page.$moreInfo = $(".more-info"); //更多内容元素
page.$moreInfoHead = $('.more-info-head');//头高度


page.autoSize = function(){
	page.height = $(window).height(); //可视区域高度
	page.width = $(window).width(); // 可视区域宽度

	page.$ele.css('height',page.height); //设置内容高度

	var now_img_w =  page.imgWidth*(page.height/page.imgHeight); //计算当前图片宽度
	var m_l = (page.width-now_img_w)/2; //图片左偏移
	
	//
	if( (page.width/page.height)<(page.imgWidth/page.imgHeight) ){
		//圖片的高度100%, 寬度兩邊超出部份隱藏
		page.$ele.removeClass('full-page-section-2'); //移除图片宽度自适应
		page.$eleImg.css('margin-left',m_l); //设置图片左偏移 
		
	}else{
		//圖片的寬度100％ ，高度不限
		page.$ele.addClass('full-page-section-2'); //添加图片宽度自适应
		page.$eleImg.css('margin-left',0); //设置图片左偏移
	}
	//更多内容位置 TOP
	var more_info_top = page.height - page.$moreInfoHead.height();
	page.$moreInfo.css('top',more_info_top);

	return this;
}

/**
* play code
* 
**/
var play = {};
play.$ele = $("[data-play]"); //播放的元素
play.speed = 3000; //切换速度
play.fadeSpeed = 1000; //渐隐渐现速度
play.status = true; //默认播放状态
play.current = 0; //起始页

//开始播放
play.start = function(){
	if(play.loop) play.stop(); //停止之前的循环
	play.fadeToggle(); //显示指定页面
	
	//如果大于1个页面，就循环显示
	if(play.$ele.length>1){
		//开始循环
		play.loop = setInterval(function(){
			play.current++; //从第二个开始显示
			play.fadeToggle() //可以显示内容了
		}
		,play.speed);
	}

	play.status = true; //设置播放状态为 true
	return this;
}

//停止播放
play.stop = function(){
	if(play.loop) clearInterval(play.loop); //停止循环
	play.status = false; //设置播放状态为 false
	return this;
}

//开始/停止播放
play.toggle = function(){
	if(play.status){
		play.stop(); //停止播放
	}else{
		play.current++; //下一页
		play.start(); //开始播放
	}
}

//下一张
play.next = function(){
	play.current++; //当前页面加1
	if(play.status){
		play.start();
	}else{
		play.fadeToggle(play.current);
	}
	return this;
}
//上一张
play.prev = function(){
	play.current--; //当前页面减1
	if(play.status){
		play.start();
	}else{
		play.fadeToggle(play.current);
	}
	return this;
}

//页面显示切换
play.fadeToggle = function(id){
	if(id) play.current = id; 

	if(play.current>=play.$ele.length) play.current = 0; //已经是最后一张
	if(play.current<0) play.current = play.$ele.length-1; //已经是第一张

	play.$ele.fadeOut(this.fadeSpeed); //隐藏全部
	var $target = $(play.$ele[play.current]); //目标
	$target.fadeIn(this.fadeSpeed); //显示

	return this;
}



$(document).ready(function(){
	page.autoSize(); //满屏自适应

	play.start(); //开始播放
	
	var $palyButton = page.$ele; //开始/停止播放 按钮
	$palyButton.click(play.toggle); //当点击 开始/停止 按钮时

	page.$moreInfoHead.click(function(){
		$("html, body").animate({scrollTop:page.height});
	});

	play.$ele.on('swipeleft',function(){
		play.next();
	});
	play.$ele.on('swiperight',function(){
		play.prev();
	});

});

$(window).resize(page.autoSize); //当页面宽度、高度有变化时重置满屏

//监听键盘事件
$(function(){
	document.onkeydown = function(e){
		var ev = document.all ? window.event : e;
		//空格键
		if(ev.keyCode==32) {
			play.toggle(); //开始/停止 播放
		}
		//左方向键 或者 上方向键
		if(ev.keyCode==37 || ev.keyCode==38) {
			play.prev(); //前一个
		}
		//右方向键 或者 下方向键
		if(ev.keyCode==39 || ev.keyCode==40) {
			play.next(); //后一个
		}
	}
});   





