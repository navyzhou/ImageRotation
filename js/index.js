// JavaScript Document
var index=0; //当前的索引
var total=0; //总共要显示的图片的数量
var time; //定时器

$(function(){
	total=$("#navy_show_img li").length;
	
	$("#navy_show_imgsmall img").addClass("navy_out");
	
	$("#navy_show_img").mousemove(function(e){ //当鼠标在图片显示层上移动时
		//var e=arguments.callee.caller.arguments[0]||window.event;
		//console.info(e);
		var num=(e.layerX||e.offsetX); //谷歌 火狐 e.layerX //获取鼠标相对于当前图片显示层的位置
		if(num<200){ //如果距显示层左边的距离小于200，则修改鼠标的箭头为向左
			$(this).css("cursor","url('images/left.png'),default");
			window.clearInterval(time);
			time=null;
		}else if(num>450){ //如果距显示层左边的距离大于450，则修改鼠标的箭头为向右
			$(this).css("cursor","url('images/right.png'),default");
			window.clearInterval(time);
			time=null;
		}else{ //如果在中间位置，则使用默认的箭头
			$(this).css("cursor","default");
			if(time==null){
				time=window.setInterval("showPicAuto()",1000);
			}
		}
	});
	
	$("#navy_show_img").click(function(e){ //当在图片显示层上点击时，先要获得当前鼠标相对于显示层左边的距离
		//var e=arguments.callee.caller.arguments[0]||window.event;
		//console.info(e);
		var num=(e.layerX||e.offsetX); //谷歌 火狐 e.layerX
		if(num<200){ //如果小于200，则说明是要查看上张图片
			if(index<=0){ //如果已经是第一张，则提示
				//alert("已经是第一张了....");
				//$("#tishiInfo").text("已经是第一张了....").mywin({left:"center",top:"center"}).fadeOut(3000);
				showInfo("已经是第一张了....");
				return;
			}else{
				if(index!=0 && index%8==0){
					//$("#navy_show_imgsmall_view").scrollLeft(index/8*592);
					$("#navy_show_imgsmall_view").animate({scrollLeft:((index/8-1)*592)},300);
				}
				
				var now_index=$("#navy_show_imgsmall img[class='navy_over']").parent().index();
				//console.info(now_index+"  "+index);
				if(now_index!=index){
					index=now_index;
				}
				index-=1;
			}
		}else if(num>450){ //如果大于450，则说明要查看下一张图片
			if(index>=total-1){ //判断是否已经到了最后一张
				//alert("已经是最后一张了....")
				//$("#tishiInfo").text("已经是最后一张了....").mywin({left:"center",top:"center"}).fadeOut(3000);
				showInfo("已经是最后一张了....");
				return;
			}else{
				var now_index=$("#navy_show_imgsmall img[class='navy_over']").parent().index();
				if(now_index!=index){
					index=now_index;
				}
				index+=1;
				if(index!=0 && index%8==0){
					//$("#navy_show_imgsmall_view").scrollLeft(index/8*592);
					$("#navy_show_imgsmall_view").animate({scrollLeft:(index/8*592)},300);
				}
			}
		}
		
		/*//现将所有要显示的图片隐藏
		$("#navy_show_img li").css("display","none");
		//将要查看的图片显示
		$("#navy_show_img li").eq(index).css("display","block");
		
		//标题的修改
		$("#navy_show_title li").css("display","none");
		$("#navy_show_title li").eq(index).css("display","block");*/
		showPic(index);
	});
	
	//当用户点击向右的按钮时
	$("#navy_right").click(function(){
		//先判断有没有两页或两页以上
		if(total>8){
			var num=parseInt(index/8)+1; //1 2
			//判断有没有到最后
			// total/index  24  num   total 24  8   23 8   3
			var page= total%8==0?total/8-1:Math.floor(total/8);
			if(num<=page){
				$("#navy_show_imgsmall_view").animate({scrollLeft:592*num},300);
				index=num*8;
				showPic(index);
			}else{
				showInfo("已经是最后一页了....");
			}
		}
	});
	
	//当用户点击向左的按钮时
	$("#navy_left").click(function(){
		//先判断是不是已经是第一页了
		var left=$("#navy_show_imgsmall_view").scrollLeft(); //获取对象向左卷进的距离
		if(left>=592){ //说明至少向右翻了一页
			$("#navy_show_imgsmall_view").animate({scrollLeft:left-592},300) ;//则向右释放592
			index=(Math.floor(left/592)-1)*8;
			showPic(index);
		}else{
			//$("#tishiInfo").text("已经是第一页了....").mywin({left:"center",top:"center"}).fadeOut(3000);
			showInfo("已经是第一页了....");
		}
	});
	
	//当鼠标不再图片显示区是启动定时器
	$("#navy_show_img_div").mouseout(function(){
		window.clearInterval(time);
		time=null;
		if(time==null){
			time=window.setInterval("showPicAuto()",1000);
		}
	});
	
	$("#navy_show_imgsmall li").unbind();
	$("#navy_show_imgsmall li").bind({
		mouseover:function(){
			window.clearInterval(time);
			time=null;
			index=$(this).index();
			showPic(index);
		},
		mouseout:function(){
			window.clearInterval(time);
			time=null;
			if(time==null){
				time=window.setInterval("showPicAuto()",1000);
			}
		}
	});
});

//显示图片和对应的标题以及小图片
function showPic(num){
	//现将所有要显示的图片隐藏
	$("#navy_show_img li").css("display","none").eq(num).css("display","block");
	
	//标题的修改
	$("#navy_show_title li").css("display","none").eq(num).css("display","block");
	
	//标题的修改
	$("#navy_show_imgsmall img").attr("class","navy_out").eq(num).attr("class","navy_over");
}

//显示提示信息
function showInfo(txt){
	if($("#tishiInfo").css("display")=="none"){
		$("#tishiInfo").text(txt).mywin({left:"center",top:"center"}).fadeOut(3000);
	}
}

//图片自动播放
function showPicAuto(){
	if(arguments.length>0){
		index=arguments[0]; //如果有给定参数，说明用户指定了要显示的图片
	}else{
		index=index%total;
	}
	if(index==0){
		$("#navy_show_imgsmall_view").animate({scrollLeft:0},300);
	}
	if(index!=0 && index%8==0){ //自动往后滚
		$("#navy_show_imgsmall_view").animate({scrollLeft:(index/8*592)},300);
	}
	showPic(index);
	index++;
}

time=window.setInterval("showPicAuto()",1000);



$.fn.mywin=function(position){
	//判断用户给定的对象是否为空,如果不为空获取用户设定的位置
	if(position && position instanceof Object){
		var positionLeft=position.left;
		var positionTop=position.top;
		var currentWin=this;//当前显示层的对象
		
		var left;
		var top;
		var reg=/(px)/ig;
		
		positionLeft=positionLeft.replace(reg,"");
		positionTop=positionTop.replace(reg,"");
		
		if(!isNaN(positionTop)){
			positionTop=parseInt(positionTop);	
		}
		if(!isNaN(positionLeft)){
			positionLeft=parseInt(positionLeft);	
		}
		//可视区域的大小
		var width;
		var height;
		var scrollLeft;
		var scrollTop;
		
		//获取可是区域的大小和滚动条滚动的距离
		function getWindow(){
			/*width=$(window).width();
			height=$(window).height();
			scrollLeft=$(window).scrollLeft();
			scrollTop=$(window).scrollTop();*/	
						
			width=currentWin.parent().width();
			height=currentWin.parent().height();
			scrollLeft=currentWin.parent().scrollLeft();
			scrollTop=currentWin.parent().scrollTop();
		}
		
		//要显示层的大小
		var mywidth=currentWin.outerWidth(true);
		var myheight=currentWin.outerHeight(true);
		
		function getLeft(){//求距左边的距离
			if(positionLeft!="" && typeof(positionLeft)=="string"){
				if(positionLeft=="left"){
					left=scrollLeft;	
				}else if(positionLeft=="center"){
					left=(width-mywidth)/2+scrollLeft;
				}else if(positionLeft=="right"){
					left=width-mywidth+scrollLeft;				
				}else{
					left=(width-mywidth)/2+scrollLeft;	
				}
			}else if(positionLeft!="" && typeof(positionLeft)=="number"){
				left=positionLeft+scrollLeft;	
			}else{
				left=scrollLeft;
			}
		}
		
		function getTop(){ //求距顶部的距离
			if(positionTop!="" && typeof(positionTop)=="string"){
				if(positionTop=="top"){
					top=scrollTop;	
				}else if(positionTop=="center"){
					top=(height-myheight)/2+scrollTop;
				}else if(positionTop=="bottom"){
					top=height-myheight+scrollTop;				
				}else{
					top=(height-myheight)/2+scrollTop;	
				}
			}else if(positionTop!="" && typeof(positionTop)=="number"){
				top=positionTop+scrollTop;	
			}else{
				top=scrollTop;
			}
		}
		
		getWindow();
		getLeft();
		getTop();
		
		//指定层的显示位置并显示
		currentWin.css({left:left,top:top}).slideDown("slow");		
		
		//当窗口大小发生改变时
		$(window).resize(function(){
			getWindow();
			getLeft();
			getTop();
			
			//在300毫秒内由当前位置移动到指定的新位置
			currentWin.animate({left:left,top:top},300);//有缓冲的效果
		});
		
		//出现滚动条时
		$(window).scroll(function(){
				getWindow();
				getLeft();
				getTop();
				currentWin.css({left:left,top:top});
		});
		
		//点击关闭按钮时
		this.children(".title").children("img").click(function(){
				currentWin.slideUp("slow");
		});
	}
	return this; //将修改好的对象，继续往下传递
}
	