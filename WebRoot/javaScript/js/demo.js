/*
 * 科目余额表js
 * */
var BssSubjectBalMgt = function(){
	var me=this;
	var url = _global_settings.service.url+"/ac/";
	var url2 = _global_settings.service.url+"/chartOfAccount";
	this.date = new Date();
	this.random = Math.random();
	this.sumBalance=0;//期初余额之和
	this.sumDebit=0;//借方之和
	this.sumCredit=0;//贷方之和
	this.sumLastBalance=0;//期末余额
	this.type=1;//科目种类
	
	//初始化页面所有控件
	this.initInput = function(){
		$('#subjectBal-sendEmail').css('display','none');
		$("#subjectBal_nowDate").text(me.setDate());
		$('#subjectBal-time').monthpicker({callback:'dasdasd'});
		$("#subjectbal_comname").text(currentUserInfo.name);
//		me.getOneSub();
		me.setCodeAndName();
		me.getTableData(me.getYearAndMonth(),currentUserInfo.id,me.type);
		me.initPages();
	}
	
	this.initPages = function(){
		if($('#main-changeLanguage').html() == "点击切换到中文" ){
			$('#subjectBal-search').text("Search");
			$('#subjectBal-print').text("Print");
			$('#subjectBal-out').text("Export");
			$('#subjectBal-searchdate').text("Date");
			$('#subjectBal-headMsg').text("Account Balance Sheet");
			$('#subjectBal-unit').text("Unit：RMB");
			
			var setDate = function(){
				var year = me.date.getFullYear();
				var month = me.date.getMonth();
				month = month + 1;
				var day = me.date.getDate();
				if(month < 10){
					month = "0" + month;
				}
				if(day < 10){
					day = "0" + day;
				}
				return day+'/'+month+'/'+year;
			}
			$('#subjectBal_nowDate').text(setDate());

			//渲染表数据
			var subjectDataThead = $('#subjectBalDataTable>thead>tr>th');
//			subjectDataThead.eq(0).html('Account Code');
			subjectDataThead.eq(1).html('Account Name');
			subjectDataThead.eq(2).html('Beginning balance');
			subjectDataThead.eq(3).html('Current Occurrence Amount');//本期发生额
			subjectDataThead.eq(4).html('Ending balance');
			subjectDataThead.eq(5).html('Debit');
			subjectDataThead.eq(6).html('Credit');
			
			$('#subjectBal_dropdownMenuCode').text('Account Code');
			$('#show_two').text('Expand two');
			$('#show_three').text('Expand Three');
			$('#show_four').text('ExpandAll');
			$('#show_one').text('PackUp');
		}
	}
	
	//设置时间
	this.setDate = function(){
		var year = me.date.getFullYear();
		var month = me.date.getMonth();
		month = month + 1;
		var day = me.date.getDate();
		if(month < 10){
			month = "0" + month;
		}
		if(day < 10){
			day = "0" + day;
		}
		return year+"年"+month+"月"+day+"日";
	}
	
	//获取一级科目
	this.getOneSub = function(){
		var records = ComboBoxSources.getRecords('chartOfAccounts'); 
		var arr = [];
		for(var i=0;i<records.length;i++){
			if(records[i].level == 1){
				var name = records[i].name;
				var hardCode = records[i].hardCode;
				var debitCredit = records[i].debitCredit;
				arr.push([hardCode,name,debitCredit]);
			}
		}
//		console.log(arr);
		return arr;
	}
	
	//初始化编码和名称
	this.setCodeAndName = function(){
		var arr = me.getOneSub();
		for(var i=0;i<arr.length;i++){
//			console.log(arr[i][0]);
			var line = '<tr>'+
				'<td>'+arr[i][0]+'</td>'+
				'<td>'+arr[i][1]+'</td>'+
				'<td></td>'+
				'<td></td>'+
				'<td></td>'+
				'<td></td>'+
				'</tr>';
			$('#subjectBalTbody').append(line);
			$('#subjectBalTbody').find('tr').eq(i).attr('id',arr[i][2]);
			$('#subjectBalTbody').find('tr').eq(i).find('td').eq(0).attr('id',arr[i][0]);
		}
	}
	
	//获得当前年和月
	this.getYearAndMonth = function(){
		var year = me.date.getFullYear();
		var month = me.date.getMonth();
		month = month + 1;
		if(month < 10){
			month = "0" + month;
		}
		return year+"-"+month;
	}
	
	//添加数据
	this.addTableData=function(res){
		//科目名称
		var messageByHardcode=ComboBoxSources.getInfoMapByKey('chartOfAccounts','hardCode');
		
		var messageByHardcodeThis=messageByHardcode[res.itemCoaHardCodes];
		var messageThisName=messageByHardcodeThis.name;
		//判断是否debit
		var messageThisDebitCredit=messageByHardcodeThis.debitCredit;
		var debit=(res.itemVale1==undefined)?0:res.itemVale1;//借方
		var crebit=(res.itemVale2==undefined)?0:res.itemVale2;//贷方
		var endAmt=(res.itemVale3==undefined)?0:res.itemVale3;//期末余额
		var beginAmt='';//期初余额
		if(messageThisDebitCredit=='debit'){
			beginAmt=parseFloat(endAmt-debit+crebit);
		}else{
			beginAmt=parseFloat(endAmt+debit-crebit);
		}
		var line=$('<tr>'+
				'<td class="code text-left p-l-20">'+res.itemCoaHardCodes+'</td>'+//科目代码
				'<td class="name text-left p-l-20">'+messageThisName+'</td>'+//科目名称
				'<td class="beginAmt text-right">'+money(beginAmt)+'</td>'+//期初余额
				'<td class="debit text-right">'+money(debit)+'</td>'+//借方
				'<td class="crebit text-right">'+money(crebit)+'</td>'+//贷方
				'<td class="endAmt text-right">'+money(endAmt)+'</td>'+//期末余额
				'</tr>');
		$('#subjectBalTbody').append(line);
		me.sumBalance+=parseFloat(line.find('.beginAmt').text());
		me.sumDebit+=parseFloat(line.find('.debit').text());
		me.sumCredit+=parseFloat(line.find('.crebit').text());
		me.sumLastBalance+=parseFloat(line.find('.endAmt').text());
	}
	
	//请求表数据
	this.getTableData = function(time,id,type){
		Core.AjaxRequest({
			type:"GET",
			showMsg:false,
			url: url+new Base64().encode("tosys/coaReport/balance/balance/"+me.getYearAndMonth()+"/"+currentUserInfo.id+"/"+currentUserInfo.loginId+"/"+me.type),
			callback:function(res){ //表数据
				//添加最后一行
				var list=res.pop();
				me.addLastLine(list);
				me.setTextRight();
				$.each(res,function(i){
					me.addTableData(res[i]);
				})	
				
				//TODO 加以权限切换中英文
				if($('#main-changeLanguage').html() == "点击切换到中文"){
					var subjectDataTd = $('#subjectBalTbody>tbody>tr');
					for(var i=0; i<$('#subjectBalTbody').children().length-2; i++){
						$('#subjectBalTbody').children().eq(i).children().eq(1).html(res[i].itemEnglishName==undefined?res[i].itemName:res[i].itemEnglishName);
					}
				}
				
//				var itemCoaHardCodes;
//				var itemVale1;
//				var itemVale2;
//				var itemVale3;
//				for(var i=0;i<res.length;i++){
//					itemCoaHardCodes = res[i].itemCoaHardCodes;
//					itemVale1 = res[i].itemVale1;
//					itemVale2 = res[i].itemVale2;
//					itemVale3 = res[i].itemVale3;
//					me.setTableData(i,itemCoaHardCodes,itemVale1,itemVale2,itemVale3);
//				}
//				var node=$('#subjectBalTbody').children();
//				var j=0;
//				$.each($('#subjectBalTbody').children(),function(j){
//					var i2=$(this).children().eq(2).text();
//					var i3=$(this).children().eq(3).text();
//					var i4=$(this).children().eq(4).text();
//					var i5=$(this).children().eq(5).text();
//					//console.log(j,i2);
//					$(this).children().eq(2).text(formatNum(i2));
//					$(this).children().eq(3).text(formatNum(i3));
//					$(this).children().eq(4).text(formatNum(i4));
//					$(this).children().eq(5).text(formatNum(i5));
//					j+=1;
//				});
			}
		});
	}
	
	//添加尾行
	this.addLastLine=function(list){
		console.log(me.sumBalance,me.sumDebit)
		var line = '<tr>'+
			'<td id="totalMonth" colspan=2 class="text-center">'+'本月合计'+'</td>'+
			'<td class="text-right">'+(money(me.sumBalance))+'</td>'+
			'<td class="text-right">'+(money(me.sumDebit))+'</td>'+
			'<td class="text-right">'+(money(me.sumCredit))+'</td>'+
			'<td class="text-right">'+(money(me.sumLastBalance))+'</td>'+
			'</tr>';
		$('#subjectBalTbody').append(line);
		if($('#main-changeLanguage').html() == "点击切换到中文"){
			$('#subjectBalTbody').find('#totalMonth').text('Month Cumulative');
		}
		
		var lasttr='<tr>'+
			'<td id="totalYears" colspan=2 class="text-center">'+'本年累计'+'</td>'+
			'<td class="text-right">'+(money(list.itemVale4))+'</td>'+
			'<td class="text-right">'+(money(list.itemVale1))+'</td>'+
			'<td class="text-right">'+(money(list.itemVale2))+'</td>'+
			'<td class="text-right">'+(money(list.itemVale3))+'</td>'+
			'</tr>';
	
		$("#subjectBalTbody").append(lasttr);
		if($('#main-changeLanguage').html() == "点击切换到中文"){
			$('#subjectBalTbody').find('#totalYears').text('Year Cumulative');
		}
	}
	
	//循环表添加样式
	this.setTextRight=function(){
		$('#subjectBalTbody').find('tr').each(function(){
			$(this).find('td').each(function(i){
				if(i!=0&&i!=1){
					$(this).attr('class','text-right');
				}
			});
		});
	}
	
	//添加表数据
	this.setTableData = function(i,itemCoaHardCodes,itemVale1,itemVale2,itemVale3){
		var debitCredit;
		var hardCode;
		if(itemVale1 == undefined){
			itemVale1 = 0;
		}
		if(itemVale2 == undefined){
			itemVale2 = 0;
		}
		if(itemVale3 == undefined){
			itemVale3 = 0;
		}
		
//		hardCode = $("#subjectBalTbody").find('tr').eq(i).find('td').eq(0).attr('id');
//		console.log(hardCode);
//		console.log(debitCredit);
		$("#subjectBalTbody").find('tr').each(function(i){
			debitCredit = $(this).attr('id');
			hardCode = $(this).find('td').eq(0).attr('id');
			if(hardCode == itemCoaHardCodes){
				if(debitCredit == 'debit'){
					$(this).find('td').eq(2).text((money(itemVale3+itemVale2-itemVale1)));
					me.sumBalance += parseFloat($(this).find('td').eq(2).text()); 
					$(this).find('td').eq(3).text((money(itemVale1)));
					me.sumDebit += parseFloat($(this).find('td').eq(3).text());
					$(this).find('td').eq(4).text((money(itemVale2)));
					me.sumCredit += parseFloat($(this).find('td').eq(4).text());
					$(this).find('td').eq(5).text((money(itemVale3)));
					me.sumLastBalance += parseFloat($(this).find('td').eq(5).text());
				}else{
					$(this).find('td').eq(2).text((money(itemVale3-itemVale2+itemVale1)));
					me.sumBalance += parseFloat($(this).find('td').eq(2).text());
					$(this).find('td').eq(3).text((money(itemVale1)));
					me.sumDebit += parseFloat($(this).find('td').eq(3).text());
					$(this).find('td').eq(4).text((money(itemVale2)));
					me.sumCredit += parseFloat($(this).find('td').eq(4).text());
					$(this).find('td').eq(5).text((money(itemVale3)));
					me.sumLastBalance += parseFloat($(this).find('td').eq(5).text());
				}
			}
		});
	}
}

var BssSubjectBalBindModle = function(bssSubjectBalMgt){
	var me=this;
	var url = _global_settings.service.url+"/ac/";
	bssSubjectBalMgt.type=1;
	//每次点击搜索，需要清空表格数据
	this.emptyTable = function(time,type){
		var time=$("#subjectBal-time").val();
		$('#subjectBalTbody').html('');
		bssSubjectBalMgt.sumBalance=0;//期初余额之和
		bssSubjectBalMgt.sumDebit=0;//借方之和
		bssSubjectBalMgt.sumCredit=0;//贷方之和
		bssSubjectBalMgt.sumLastBalance=0;//期末余额
//		$("#subjectBalTbody").find("tr:last").remove();//删除最后一行
		//$("#subjectBalTbody").find("tr").eq($("#subjectBalTbody").find("tr").length-2).remove();
//		$("#subjectBalTbody").find("tr:last").prev().remove();
//		$("#subjectBalTbody").find('tr').each(function(){
//			$(this).find('td').each(function(x,y){
//				if(x != 0 && x != 1){
//					$(this).text('');
//				}
//			});
//		})
		me.getTableData(time,type);
	}
	//请求表数据
	this.getTableData = function(time,id,type){
		Core.AjaxRequest({
			type:"GET",
			showMsg:false,
			url: url+new Base64().encode("tosys/coaReport/balance/balance/"+bssSubjectBalMgt.getYearAndMonth()+"/"+currentUserInfo.id+"/"+currentUserInfo.loginId+"/"+bssSubjectBalMgt.type),
			callback:function(res){ //表数据
//				var itemCoaHardCodes;//科目编码
//				var itemVale1;
//				var itemVale2;
//				var itemVale3;
//				for(var i=0;i<res.length;i++){
//					itemCoaHardCodes = res[i].itemCoaHardCodes;
//					itemVale1 = res[i].itemVale1;
//					itemVale2 = res[i].itemVale2;
//					itemVale3 = res[i].itemVale3;
//					bssSubjectBalMgt.setTableData(i,itemCoaHardCodes,itemVale1,itemVale2,itemVale3);
//				}
//				
//				var list=res.pop();
//				//添加最后一行
//				bssSubjectBalMgt.addLastLine(list);
//				
//				var node=$('#subjectBalTbody').children();
//				var j=0;
//				$.each($('#subjectBalTbody').children(),function(j){
//					
//					var i2=$(this).children().eq(2).text();
//					var i3=$(this).children().eq(3).text();
//					var i4=$(this).children().eq(4).text();
//					var i5=$(this).children().eq(5).text();
//
//					$(this).children().eq(2).text(formatNum(i2));
//					$(this).children().eq(3).text(formatNum(i3));
//					$(this).children().eq(4).text(formatNum(i4));
//					$(this).children().eq(5).text(formatNum(i5));
//					j+=1;
//				});
				//添加最后一行
				var list=res.pop();
				bssSubjectBalMgt.addLastLine(list);
				bssSubjectBalMgt.setTextRight();
				$.each(res,function(i){
					bssSubjectBalMgt.addTableData(res[i]);
				})
				
			}
		});
	}
	
	this.bind = function(){
		//点击搜索
		$("#subjectBal-search").on('click',function(){
			var time = $("#subjectBal-time").val();
			if(time == ''){
				time = bssSubjectBalMgt.getYearAndMonth();
			}
			$("#subjectBal_nowDate").text(time);
			me.emptyTable(time,bssSubjectBalMgt.type);
		});
		//点击caret
		$('#show_one').on('click',function(){
			bssSubjectBalMgt.type=1;
	
			me.emptyTable(time,bssSubjectBalMgt.type);
		});
		$('#show_two').on('click',function(){
			bssSubjectBalMgt.type=2;
		
			me.emptyTable(time,bssSubjectBalMgt.type);
		});
		$('#show_three').on('click',function(){
			bssSubjectBalMgt.type=3;
		
			me.emptyTable(time,bssSubjectBalMgt.type);
		});
		$('#show_four').on('click',function(){
			bssSubjectBalMgt.type=4;
			
			me.emptyTable(time,bssSubjectBalMgt.type);
		});
	}
	
	this.unbindAll = function(){
		$("#subjectBal-search").off('click');
	}
	
	 //打印事件
	$('#subjectBal-print').on('click',function(){
		var time = bssSubjectBalMgt.getYearAndMonth();
		var dateTime =  $('#subjectBal_nowDate').text();
		if(dateTime.length==11){
			dateTime = time;
		}
		var url = new Base64().encode("reportName=AccountBalance&accountBalancedate="+dateTime+"&printType=pdf&ownerId="+currentUserInfo.id+"&username="+currentUserInfo.loginId+"&type="+bssSubjectBalMgt.type+"&printType=pdf");
		window.open(_global_settings.service.url+"/ac/print/"+url);
	});
	
	//导出
	$("#subjectBal-out").on({
		"click":function(){
			
			var time = bssSubjectBalMgt.getYearAndMonth();
			var dateTime =  $('#subjectBal_nowDate').text();
			if(dateTime.length==11){
				dateTime = time;
			}
			
			var url = new Base64().encode("tosys/coaReport/export/subjectBal/"+dateTime+"/"+bssSubjectBalMgt.type+'/0/0/0/0/0/0/0/0/0/'+currentUserInfo.id+"/"+currentUserInfo.loginId);
			$.openHref(_global_settings.service.url+'/ac/exportReport/'+url);
		}
	});
	
}