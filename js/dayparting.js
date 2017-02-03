function dayParting(options){
	var _this = this;
	_this.data_size = 7*24;/* 7 days x 24 hrs*/
	_this.click = false; 
	_this.lang_opt = options["lang"] || "CN";
	_this.values = options["values"] || "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
	_this.container = options["container"];
	_this.boxId = new Date().getTime();
	_this.resultId = options["resultId"];

	$(_this.resultId).val(_this.values);
	_this.scheduler_init(_this.values);
}

	dayParting.prototype.scheduler_init = function( values ){
		var _this = this;
		var lang = _this.lang[_this.lang_opt];
		var default_time=lang["time"];
		var default_day=lang["day"];
		var default_point=lang["timepoint"];
		var default_period=lang["dayperiod"];
		var default_week=lang["week"];
		var default_head = lang["head"];
		_this.renderHtml();
		var i = 0;
		$('.header_time',_this.container).each(function(){
			$(this).html(default_time[i++]);
		});
		i = 0;
		$('.left_header',_this.container).children().each(function(){
			$(this).html(default_head[i++]);
		});

		i = 0;
		$('.day_name',_this.container).each(function(){
			var that = this;
			$(that).attr("alt",i<5?"week_0":"week_1");
			i==6 && $(that).attr("style","border-bottom:1px solid #dbdbdb");
			$(that).html(default_day[i++]);
			(function(i){
				$(that).on("click",function(){
					if($(_this.container).find("tr").eq(i).find(".select_box").length==$(_this.container).find("tr").eq(i).find(".chosen_even").length){
						$(_this.container).find("tr").eq(i).find(".select_box").removeClass("chosen_even");
					}else{
						$(_this.container).find("tr").eq(i).find(".select_box").addClass("chosen_even");
					}
					
					_this.update_all();
				});
				$(that,_this.container).on("mouseenter",function() {
					$(this).addClass("chosen_grey");
					 $(_this.container).find("tr").eq(i).find(".select_box").addClass("chosen_grey");
					
				});
				$(that,_this.container).on("mouseleave",function() {
					$(this).removeClass("chosen_grey");
					 $(_this.container).find("tr").eq(i).find(".select_box").removeClass("chosen_grey");
				});
			})(i+1)
		});
		i = 0;
		$(".time_box",_this.container).each(function(){
			var that=this;
			$(that).attr("alt","time_"+i);
			$(that).html(default_point[i++]);
			(function(i){
				$(that).on("click",function(){
					var j=0,k=0;
					$(_this.container).find("tr").each(function(){
						if ($(this).find(".select_box").length>0){
							k++;
							if($(this).find(".select_box").eq(i-1).hasClass("chosen_even")) {
								j++;
							}
						};
					});
					$(_this.container).find("tr").each(function(){
						j!=k?$(this).find(".select_box").eq(i-1).addClass("chosen_even"):$(this).find(".select_box").eq(i-1).removeClass("chosen_even");
					});
					_this.update_all();
				});
				$(that,_this.container).on("mouseenter", function() {
					$(this).addClass("chosen_grey");
					 $(_this.container).find("tr").each(function(){
						$(this).find(".select_box").eq(i-1).addClass("chosen_grey");
					});
				});
				$(that,_this.container).on("mouseleave",function() {
					$(this).removeClass("chosen_grey");
					 $(_this.container).find("tr").each(function(){
						$(this).find(".select_box").eq(i-1).removeClass("chosen_grey");
					});
				});
			})(i);
			
		});
		i=0;
		$(".header_num",_this.container).each(function(){
			var that=this;
			$(that).attr("alt","header_"+i);
			$(that).html(default_period[i++]);
			(function(k){
				$(that).on("click",function(){
					$(this).toggleClass("select");
					if($(".chosen_grey.chosen_even.select_box").length==$(".chosen_grey.select_box").length){
						$(".chosen_grey.select_box").removeClass("chosen_even");
					}else{
						$(".chosen_grey.select_box").addClass("chosen_even");
					}
					_this.update_all();
				});
				$(that,_this.container).on("mouseenter", function() {
					$(this).addClass("chosen_grey");
					var i = (k-1)*6;
					var j =k*6;
					$(this).toggleClass("select");
					for(;i<j;i++){
						$(_this.container).find(".time_box").eq(i).addClass("chosen_grey");
						$(_this.container).find("tr").each(function(){
							$(this).find(".select_box").eq(i).addClass("chosen_grey")
						})
					}
				});
				$(that,_this.container).on("mouseleave",function() {
					$(this).removeClass("chosen_grey");
					var i = (k-1)*6;
					var j =k*6;
					$(this).toggleClass("select");
					for(;i<j;i++){
						$(_this.container).find(".time_box").eq(i).removeClass("chosen_grey");
						$(_this.container).find("tr").each(function(){
							$(this).find(".select_box").eq(i).removeClass("chosen_grey")
						})
					}
				});

			})(i)

		});
		i=0;
		$(".week",_this.container).each(function(){
			var that = this;
			$(that).html(default_week[i++]);
			(function(i){
				$(that).on("click",function(){
					$(this).toggleClass("select");
					if($(".chosen_grey.chosen_even.select_box").length==$(".chosen_grey.select_box").length){
						$(".chosen_grey.select_box").removeClass("chosen_even");
					}else{
						$(".chosen_grey.select_box").addClass("chosen_even");
					}
					_this.update_all();
				});
				$(that,_this.container).on("mouseenter", function() {
					var self = this;
					$(self).addClass("chosen_grey");
					$(_this.container).find("[alt='week_"+i+"']").addClass("chosen_grey");
					$(_this.container).find("[alt='week_"+i+"']").each(function(){
						$(this).parent().find(".select_box").addClass("chosen_grey");
					})
				});
				$(that,_this.container).on("mouseleave",function() {
					var self = this;
					$(self).removeClass("chosen_grey");
					$(_this.container).find("[alt='week_"+i+"']").removeClass("chosen_grey");
					$(_this.container).find("[alt='week_"+i+"']").each(function(){
						$(this).parent().find(".select_box").removeClass("chosen_grey");
					})
				});
			})(i-1);
		});
		i=0;
		$(".out",_this.container).children().each(function(){
			$(this).html(lang["head"][i++]);
		});
		i=0;
		$(".select_opt",_this.container).each(function(){
			$(this).html(lang["opt"][i++]);
		});
		//反选清空
		$("#calendar_body",_this.container).on("click", ".invert",function() {
			var that=this;
			 $(".select_box",_this.container).each(function(){
			 	$(this).toggleClass("chosen_even");
			 })
			 _this.update_all();
		});
		$("#calendar_body",_this.container).on("click", ".clears",function() {
			var that = this;
			 $(".chosen_even").each(function(){
			 	$(this).removeClass("chosen_even");
			 });
			 _this.update_all();
		});
		var len = values.length;
		if(len < _this.data_size){
			for(var i = len; i < _this.data_size; i++){
				values += "0";
			}
		}
		var data2 = "0";
		var select_value = "";
		var tmp_row = 0;
		var tmp_col = 0;
		for (var row = 0; row < 7; row++) {
		     for (var col = 0; col < 24; col++) {
			 	select_value = values.substr(row * 24 + col , 1  );
	            if(select_value === "1"){
	            	if(row==0){
						tmp_row = row + 8;
	            	}else{
	            		tmp_row = row + 1;
	            	}
					
					if(tmp_row==2 || tmp_row==7){
						tmp_col = col + 2;
					}else{
						tmp_col = col + 1;
					}
					
				//	if(tmp_row % 2 == 0)
				//		$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).addClass("chosen_odd");
				//	else
						$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).addClass("chosen_even");
			    }
		    }
		}
		
		$(_this.resultId).val(values);
		$("#calendar_body",_this.container).disableTextSelect();
		$("#calendar_body",_this.container).on("mousedown", ".select_box", function() {
			_this.update_selected(this);
		  	_this.click = true;
		});

		$("#calendar_body",_this.container).on("mouseenter", ".select_box",function() {
			 $(this).addClass("chosen_odd");
			  if (_this.click ){
				_this.update_selected(this);
			  }
		 
		});
		$("#calendar_body",_this.container).on("mouseleave", ".select_box",function() {
			 $(this).removeClass("chosen_odd");
		 
		});

		$("#calendar_body",_this.container).on("mouseup", ".select_box", function() {
		  _this.click = false;
		});

		
		$("#calendar_body",_this.container).on("mouseleave", "", function() {
			_this.click = false;
		});
		$(_this.container).on("click", "#cal_all_time",function(){
			_this.select_all_toggle($(this).is(':checked'));
			// add this code for jquery validate plugin
			// please do not delete this
			// thank u by orichi
			if ($(this).attr('checked') == 'checked'){
				$(_this.resultId).trigger('blur');
			}
		});
	}


	dayParting.prototype.update_selected = function( item ){
		var _this = this;
		var is_selected = false;
		/*
		if (($(item).parent().parent().children().index(item.parentNode)-3)%2 == 0){
	     	    $(item).toggleClass("chosen_even");
		}else{
		    $(item).toggleClass("chosen_odd");
		}
		is_selected = $(item).hasClass("chosen_even");
		if (!is_selected){
		    is_selected = $(item).hasClass("chosen_odd");
		}
		*/
		$(item).toggleClass("chosen_even");
		is_selected = $(item).hasClass("chosen_even");

		var column = $(item).parent().children().index(item)-1;
		var row = $(item).parent().parent().children().index(item.parentNode)-2;
		var current_value = $(_this.resultId).val(); 
		console.log(row+">"+column);

		if(row==0 || row==5){
			column=column-1
		}
		if(row==6){
			row=0;
		}else{
			row=row+1;
		}
		console.log(row+">"+column);
		var data1 = current_value.substr(0,row * 24 + column );
		var data2 = current_value.substr(row * 24 + column +1, _this.data_size -(row * 24 + column +1)  );
		current_value = "" ;
		current_value += data1;
		current_value += is_selected?"1":"0";
		current_value += data2;
		
		$(_this.resultId).val(current_value);
		
	}
	dayParting.prototype.update_all = function(){
		var _this = this;
		var value= [];
		$(_this.container).find(".select_box").each(function(){
			value.push($(this).hasClass("chosen_even")?"1":"0");
		});
		var current_value = value.join("");
		var first = "";//current_value.substr(0,24);
		var last = current_value.substr(144,24);
		current_value = last+ current_value.substr(0,144)+first;
		
		$(_this.resultId).val(current_value);
	}
	dayParting.prototype.select_all_toggle =function(is_all){
		var _this=this;
		var value ="";
		for (var row = 0; row < 7; row++) {
		     for (var col = 0; col < 24; col++) {
					tmp_row = row + 3;
					tmp_col = col + 1;
					if (is_all){
						value += "1";
						/*
						if(tmp_row % 2 == 0)
							$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).addClass("chosen_odd");
						else
							*/
							$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).addClass("chosen_even");
					}else{
						value += "0";
						/*
						if(tmp_row % 2 == 0)
							$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).removeClass("chosen_odd");
						else
							*/
							$($("#calendar_body",_this.container).children().children()[tmp_row].children[tmp_col]).removeClass("chosen_even");
					}
					
		    }
		}
		
		$(_this.resultId).val(value);
	}
	dayParting.prototype.lang={
		'CN' : {
			day : ["周一","周二", "周三","周四","周五","周六","周日"],
			time:["上午十二","下午十二","上午十二"],
			dayperiod:["凌晨","上午","下午","晚上"],
			week:["工作日","周末"],
			opt:["<div style='width:10px;height:10px;display:inline-block'><img src='./images/shared/components/red.png' width='100%' /></div>&nbsp;已选择时间段","<span class='invert'>反选</span>","<span class='clears'>清空</span>"],
			head:["时段","日期"],
			timepoint:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
			all : "全选"
		},
		'EN' : {
			day : ["MON","TUE", "WED","THU","FRI","SAT","SUN"],
			time:["12 am","12 pm","12 am"],
			dayperiod:["Early morning","Morning","Afternoon","Evening"],
			week:["W/D","W/E"],
			opt:["<div style='width:10px;height:10px;display:inline-block'><img src='./images/shared/components/red.png' width='100%' /></div>&nbsp;Selected period","<span class='invert'>Invert</span>","<span class='clears'>Clear</span>"],
			head:["Period","Date"],
			timepoint:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
			all : "All time"
		}
	}
	
	dayParting.prototype.renderHtml=function(){
		var _this = this;
		var template="";
		var template_time="";
		for (var i = 0; i < 24; i++) {
			var background = i%2==0?"back_even":"back_odd";
			var j=i+1;
			background +=j%6==0?" br1":"";
			template+='<td class="select_box '+background+'" colspan="2">&nbsp;</td>';
		};
		for (var i = 0; i < 24; i++) {
			var j=i+1;
			background="";
			background +=j%6==0?" br1":"";
			background +=j==1?" bl1":"";
			template_time+='<td class="time_box'+background+'" colspan="2">&nbsp;</td>';
		};
		var html='<div id="'+_this.boxId+'" style="float:left"><div id="dayParting_conatin" class=" time_match">';
			html+='<table id="calendar_body"><tbody><tr><th class="left_header brg"  colspan="2" rowspan="2">';
			//html+='<div class="out">';
			html+=	'<b>日期</b>';
			html+=	'<em>时段</em>';
			//html+='</div>';
			html+='</th><th class="header_num" colspan="12">&nbsp;</th><th class="header_num" colspan="12">&nbsp;</th><th class="header_num" colspan="12">&nbsp;</th><th class="header_num" colspan="12">&nbsp;</th></tr>';
			html+='<tr>'+template_time+'</tr>';
			html+='<tr><td class="week" rowspan="5">&nbsp;</td><td class="left_header day_name">周日</td>'+template;
			html+='</tr><tr><td class="left_header day_name">周一</td>'+template;
			html+='</tr><tr><td class="left_header day_name">周二</td>'+template;
			html+='</tr><tr><td class="left_header day_name">周三</td>'+template;
			html+='</tr><tr><td class="left_header day_name">周四</td>'+template;
			html+='</tr><tr><td class="week" rowspan="2">&nbsp;</td><td class="left_header day_name">周五</td>'+template;
			html+='</tr><tr><td class="left_header day_name">周六</td>'+template;
			html+='</tr><tr id="padding_box"><td colspan="3" class="select_opt">&nbsp;</td><td colspan="35">&nbsp;</td><td colspan="6" class="select_opt">&nbsp;</td><td colspan="6" class="select_opt">&nbsp;</td></tr>';
			html+='</tbody></table></div></div>';

		$(_this.container).append(html);
	}



