function draw_wgNum(data) {
	var num_data = "";
	if(data.length>0) {
		angular.forEach(data, function(dwn) {
			if (dwn.value.length) {
				num_data += "<h4>"+dwn.title+"</h4>";
				num_data += "<ul class='horizontal_list overflow-h'>";
				angular.forEach(dwn.value, function(dwnd) {
					num_data += "<li class='c'><span class='wg_statistic_txt'>"+dwnd.title+"</span><span class='wg_statistic_num'><div class='c loading_num'><img src='http://img.b8cdn.com/images/icons/loading_large_icon.gif'></div>"+dwnd.value+"</span></li>";
				});
				num_data += "</ul>";
			}
		});
	}
	return num_data
}
function toDDHH(tsec) {
	var sec_num = parseInt(tsec, 10); // don't forget the second param
	var days   = Math.floor(sec_num / 86400);
	var hours   = Math.floor(sec_num / 3600);

	if (hours   < 10) {hours   = "0"+hours;}
	var time    = days+' Days&nbsp;&nbsp;'+hours+' Hours';
	if(days<1) {
		var time = hours+' Hours';
	}
	return time;
}
function chartListData(chartType,datajs,limit,data_v) {
	var html_data = "";
	switch(chartType) {
		case "linechart" :
			var listnum = [];
			$.each(datajs, function(index, dl) {
				listnum.push(dl.value);
			});
			var maxNumL = Math.max.apply(Math, listnum);
			var NumPer = 0;
			$.each(datajs, function(index, dl) {
				var NumPer = ((Math.floor((dl.value/maxNumL)*1000)/1000)*100).toFixed(1);
				html_data += "<div class='margin_bottom_15'>";
				html_data += "	<p class='font-s margin_bottom_5'>"+dl.name+"</p>";
				html_data += "	<div class='overflow-h'>"
				html_data += "		<div class='l grid-9'>"
				html_data += "			<div class='progress b-radius'> \
											<div style='width:"+NumPer+"%;' class='fill'></div> \
										</div> \
									</div>"
				html_data += "		<div class='l grid-1 c'><span class='progress_perc'>"+dl.value+"</span></div>"
				html_data += "	</div>"
				html_data += "</div>"
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		case "timechart" :
			var listtimes = [];
			$.each(datajs, function(index, dt) {
				listtimes.push(dt.value);
			});
			var maxNumL = Math.max.apply(Math, listtimes);
			var NumPer = 0;
			html_data += "";
			$.each(datajs, function(index, dt) {
				var NumPer = ((Math.floor((dt.value/maxNumL)*1000)/1000)*100).toFixed(1);
				var time_DDHH = toDDHH(dt.value);
				if(dt.value =="") {
					var time_DDHH = "";
				}
				
				html_data += "<p class='font-s margin_bottom_5 overflow-h'><span class='l'>"+dt.name+ "</span><span class='r'>" +time_DDHH+"</span></p>";
				html_data += "<div class='progress b-radius margin_bottom_15'>";
				if(dt.value =="") {
					html_data += "<p class='margin-reset padding-sep line_height_16'>"+dt.no_proccessed_apps+"</p>";
				} else {
					html_data += "<div style='width:"+NumPer+"%;' class='fill'><span class='progress_perc'></span></div>";
				}
				html_data += "</div>";
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		case "profileslisting" :
			var html_data = "";
			if(typeof data_v !=="undefined") {
				html_data += "<p class='font-s margin_bottom_5 overflow-h'>"+data_v[0].description_html+"</p>";
			}
			html_data += "";
			$.each(datajs, function(index, dp) {
				html_data += "<div class='prf_block'>";
				html_data += "	<div class='prf_img_block'>";
				html_data += "		<a href='"+dp.link+"' target='_blank'><img src='"+dp.img+"' alt='' /></a>";
				html_data += "	</div>";
				html_data += "	<div class='prf_desc_block'>";
				html_data += "		<a href='"+dp.link+"' class='prf_name' target='_blank'>"+dp.name+"</a> \
									<span class='prf_title'>"+dp.title+"</span> \
									<span class='prf_compny'>"+dp.value+"</span>";
				html_data += "	</div>";
				html_data += "</div>";
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		default: break; 
	}
	return html_data;
	
}