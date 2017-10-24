function sellout(){
	$(document).ready(function(){
		var n = 0;
		var time,that;
		$('#sell_out .shop_box').unbind('mousedown');  
		$('#sell_out .shop_box').on('mousedown',function(){
			that = $(this);
			time = setInterval(function(){
				n+=1;
				if(n>=2){
					clearInterval(time);
					n = 0;
					console.log(that);
					$(that).find('.zdc').show();
				}
			}, 1000);
		});
		
		$(document).mouseup(function(){
			clearInterval(time);
			n = 0;
		});
	});
}