//打印小票
function print_data(data){
    var myobj = eval(data.js_datas);
    console.log(myobj);
    var header,body,footer,department;
    var bodies="";
    var shop_name,shop_setting,table_name,out_trade_no,date,food_name,food_price,num,description;
    var monney = 0;
    var rel;
    shop_setting = data.shop_print_setting;
    shop_name = myobj[0].shop_name;
    table_name = myobj[1].table_name;
    out_trade_no = myobj[2].out_trade_no;
    description = data.description;
    date = data.time;
//  date = "<?php echo date("Y-m-d H:i:s");?>";
    header = '<span>'+shop_name+'</span><br/><span>桌号：'+table_name+'</span><br/><span style="font-size:12px;">时间：'+date+'</span><br/><span style="font-size:12px;">订单号：'+out_trade_no+'</span><br/><table><th width="60%"  style="font-size:13px;text-align: center;">菜品名称</th> <th style="font-size:13px;text-align: center;">价格</th> <th style="font-size:13px;text-align: center;">数量</th>';
    var foodobj = myobj[3];
    console.log(foodobj);
    for(var i=0;i<foodobj.length;i++){
        food_name = foodobj[i].goodsName;
        food_price = foodobj[i].price;
        num = foodobj[i].num;
        body ='<tr><td class="first" style="font-size:12px;text-align: center;">'+food_name+'</td> <td style="font-size:12px;text-align: center;">'+food_price+'</td> <td style="font-size:12px;text-align: center;">'+num+'</td>';
        monney = Number(monney)+Number(food_price)*Number(num);
        console.log(monney);
        monney = Number(monney).toFixed(2);
        footer = '</tr></table><span>备注：<span style="font-size:12px;">'+description+'</span></span><br/><span>总价：'+monney+'</span><br/><span style="font-size:12px;">谢谢惠顾,欢迎下次光临！</span>';
        var printobj = foodobj[i].skuId;
        console.log(printobj);
        if (typeof (printobj.print_group) == "undefined"){
            console.log('请绑定分组打印机!');
            if (typeof (printobj.category)== "undefined"){
                console.log('请绑定菜品分类打印机!');
                department = printobj.department;
            }else {
                var category = printobj.category;
                if (typeof (printobj.department) == "undefined"){
                    console.log('请绑定部门打印机!');
                }else {
                    department = printobj.department;
                }
                if (shop_setting=="1"){
                    category.forEach(function(value, index, arr){
                        LODOP=getLodop();
                        LODOP.PRINT_INIT("厨房小票");
                        LODOP.SET_PRINT_STYLEA(0,"HOrient",3);
                        LODOP.SET_PRINT_STYLEA(0,"VOrient",3);
                        LODOP.SET_PRINTER_INDEXA(value);
                        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",header+body);
                        LODOP.PRINT();
                        console.log(header+body);
                    });
                }

            }
        }else {
            var group = printobj.print_group;
            if (typeof (printobj.department) == "undefined"){
                console.log('请绑定部门打印机!');
            }else {
                department = printobj.department;
            }
            if (shop_setting=="1"){
                group.forEach(function(value, index, arr){
                    LODOP=getLodop();
                    LODOP.PRINT_INIT("厨房小票");
                    LODOP.SET_PRINT_STYLEA(0,"HOrient",3);
                    LODOP.SET_PRINT_STYLEA(0,"VOrient",3);
                    LODOP.SET_PRINTER_INDEXA(value);
                    LODOP.ADD_PRINT_HTM(0,0,"100%","100%",header+body);
                    LODOP.PRINT();
                    console.log(header+body);
                });
            }

        }
        bodies += body;
    }
    //全票
    department.forEach(function(value, index, arr){
        LODOP=getLodop();
        LODOP.PRINT_INIT("打印订单全票");
        LODOP.SET_PRINT_STYLEA(0,"HOrient",3);
        LODOP.SET_PRINT_STYLEA(0,"VOrient",3);
        LODOP.SET_PRINTER_INDEXA(value);
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",header+bodies+footer);
        var rel = LODOP.PRINT();
        console.log(header+bodies+footer+"<br/>"+"全");
//      if (rel){
//          window.close();
//      }
    });
}

//dom元素获取焦点
function getFocus(select){
	setTimeout(function(){
		$(select).focus()
	}, 300);
}

//websocket监听新订单
var isSetAudio = false;
var wsServer = 'ws://39.108.67.89:11070';
var websocket = new WebSocket(wsServer);
websocket.onopen = function (evt) {
    console.log("Connected to WebSocket server.");
};

websocket.onclose = function (evt) {
    console.log("Disconnected");
};
//后台新订单提示
websocket.onmessage = function (evt) {
    console.log(evt.data);
    if(!isSetAudio){
    	isSetAudio = true;
    	$('#warningTone').html('<audio autoplay="autoplay" src="assets/new.mp3"></audio>');
    	setTimeout(function(){
				isSetAudio = false;
				$('#warningTone').html('');
			}, 5000);
    }
};

websocket.onerror = function (evt, e) {
    console.log('Error occured: ' + evt.data);
};

function websocketSend(id){
	setInterval(function () {
      websocket.send(id+"_bank");
  },5000);
}
