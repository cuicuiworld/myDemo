/*
 * 代理报税
 * 查看用户界面js 
 */

var ViewTaxerUserMgt = function() {
	this.url = _global_settings.service.url;
	this.debug = false;
	this.data = $.pk.data;
	this.listData = null;
	this.settings = {  
		source:{
	        data:this.searchObjReceipt,
	    },
		grid:{element:'viewTaxerUserReceipt'},
		ajax:{url:this.url},
	};
	
	this.setting1 = {  
			source:{
		        data:this.searchObjPayment,
		    },
			grid:{element:'viewTaxerUserPayment'},
			ajax:{url:this.url},
	};
}

ViewTaxerUserMgt.prototype = {
	initInput : function() {
		this.initWindows();
		this.initPage();
		this.initGrid();
		this.bind();
		this.unbindAll();
	},
	getTaxerInfo : function(username) {
		var rd = ComboBoxSources.getRecords('taxerInfo');
		for(i=0;i<rd.length;i++){
			if(username==rd[i].username){
				return rd[i];
			}
		}
		
		if(!username){
			return '';
		}
	},
	initWindows : function() {
		$('#editReceiptMgtWin').jqxWindow({
			theme : currentTheme,
			isModal : true,
			autoOpen : false,
			maxHeight : 700,
			minHeight : 300,
			height : 'auto',
			minWidth : 600,
			maxWidth : 800,
			cancelButton : $('#editReceiptMgtCancleBtn'),
			initContent : function() {
			}
		}).on('close', function() {
			setTimeout(function() {

			}, 'open', function() {

			}, 500);
		});

		$('#editPaymentMgtWin').jqxWindow({
			theme : currentTheme,
			isModal : true,
			autoOpen : false,
			maxHeight : 700,
			minHeight : 300,
			height : 'auto',
			minWidth : 600,
			maxWidth : 800,
			cancelButton : $('#editPaymentMgtCancleBtn'),
			initContent : function() {
			}
		}).on('close', function() {
			setTimeout(function() {
			}, 'open', function() {
			}, 500);
		});
	},
	initPage : function() {
		$('#viewTaxerUser-taxer').text(this.getTaxerInfo(this.data.taxer)==undefined?'':this.getTaxerInfo(this.data.taxer).name);
		$('#viewTaxerUser-username').text(this.data.loginId);
		$('#viewTaxerUser-stime').text(this.data.startDate==undefined?'':this.data.startDate.substring(0,10));
		$('#viewTaxerUser-etime').text(this.data.endDate==undefined?'':this.data.endDate.substring(0,10));
		$('#viewTaxerUser-name').text(this.data.name);
		$('#viewTaxerUser-taxrate').text(this.data.vat+'%');
		$('#viewTaxerUser-taxType').text(getCodeData(this.data.taxType));
		$('#viewTaxerUser-owerTaxCode').text(this.data.owerTaxCode);
		$('#viewTaxerUser-period').text(getCodeData(this.data.dateType));
		$('#viewTaxerUser-money').text('￥'+money(this.data.payAmt));
		$('#viewTaxerUser-email').text(this.data.email);
		$('#viewTaxerUser-phone').text(this.data.regTelephone);
	},
	initGrid : function() {
		//收款
		this.settings.source.data = this.searchObjReceipt;
		this.settings.source.url = _global_settings.service.url+'/owner/search/payRemark/'+this.data.id+'/pay';
		var demoAdapter = Core.AcDataAdapter('viewTaxerUserReceipt', this.settings.source,{
			beforeLoadComplete:function(records){
			}
		}, this.debug);
		
		//催款
		this.setting1.source.data = this.searchObjPayment;
		this.setting1.source.url = _global_settings.service.url+'/owner/search/payRemark/'+this.data.id+'/nopay';
		var demoAdapter1 = Core.AcDataAdapter('viewTaxerUserPayment', this.setting1.source,{
			beforeLoadComplete:function(records){
			}
		}, this.debug);
		
		//初始化收款Grid
		var grid_sets = {
	  	   source:demoAdapter
	  	   ,pageable:false
		   ,rendergridrows: function(){
                return demoAdapter.recordids;
            }
    	   ,columns:[								
				{ text: '收款日期',width:'20%',
					cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            		html+=rowdata.entryDate.substring(0,10);
  	            		return html+'</div>';
					}
				},
				{ text: '收款区间',dataField:'startDate',width:'20%',
					cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            		if(rowdata.startDate!=undefined||rowdata.endDate!=undefined){
  	            			html+=rowdata.startDate.substring(0,7)+'~'+rowdata.endDate.substring(0,7);
  	            		}
  	            		return html+'</div>';
					}
				},
  	            { text: '收款金额',dataField:'amt',cellsformat: 'c2',width:'20%'},
  	            { text: '收款方式',width:'20%',
  	            	cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            			html+= getCodeData(rowdata.dateType);
  	            		return html+'</div>';
					}
  	            },
  	            { text: '操作',width:'20%',
  	            	cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px; text-align:center;">';
//	  	            		html += '<a class="hoverspan md-highlight-remove  deleteReceiptLineBtn" data-index="'+rowIndex+'" title="删除"></a>';
							html += '<a class="hoverspan md-edit editReceiptLineBtn" data-index="'+rowIndex+'" title="编辑"></a>';
  	            		return html+'</div>';
					}
  	            }
	  	    ],
    	   pagesize: 20,
    	   columnsheight: 45
	    };
		$('#viewTaxerUserReceipt').grid(grid_sets);
		
		//初始化催款Grid
		var grid_set = {
	  	    source:demoAdapter1,
			columnsresize: false,
			autorowheight: true,
		    autoheight: true,
		    columnsheight: 45,
//    	    pagesize: 1,
		    pageable:false,
//		    altrows:true,
//		    enablehover: false,
//		    sortable:false,
		    rendergridrows: function(){
	            return demoAdapter1.records;
	        }
    	   ,columns:[								
				{ text: '催款日期',width:'20%',
					cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            		html+=rowdata.entryDate.substring(0,10);
  	            		return html+'</div>';
					}
				},
				{ text: '催款区间',dataField:'startDate',width:'20%',
					cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            		if(rowdata.startDate!=undefined||rowdata.endDate!=undefined){
  	            			html+=rowdata.startDate.substring(0,7)+'~'+rowdata.endDate.substring(0,7);
  	            		}
  	            		return html+'</div>';
					}
				},
  	            { text: '催款金额',dataField:'amt',cellsformat: 'c2',width:'20%'},
  	            { text: '催款方式',width:'20%',
  	            	cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px;">';
  	            			html+= getCodeData(rowdata.dateType);
  	            		return html+'</div>';
					}
  	            },
  	            { text: '操作',width:'20%',
  	            	cellsrenderer:function (rowIndex, columnfield, value, defaulthtml, columnproperties, rowdata) {
  	            		var html = '<div style="padding-top:6px; text-align:center;">';
//	  	            		html += '<a class="hoverspan md-highlight-remove  deletePaymentLineBtn" data-index="'+rowIndex+'" title="删除"></a>';
							html += '<a class="hoverspan md-edit editPaymentLineBtn" data-index="'+rowIndex+'" title="编辑"></a>';
  	            		return html+'</div>';
					}
  	            }
	  	    ],
	    };
		$('#viewTaxerUserPayment').grid(grid_set);
	},
	editReceiptPeriodSelect : function (data){
		if($('#editReceipt-period').val()=='paymouth'){
			
			$('#editReceipt-money').val(money(data.amt));
			$('#editReceipt-eTime').val( getNextMonth($('#editReceipt-sTime').val()) );
		
		}else if($('#editReceipt-period').val()=='payseason'){
			
			$('#editReceipt-money').val(money(data.amt*3));
			$('#editReceipt-eTime').val( getNextQuarter( $('#editReceipt-sTime').val() ) );
		
		}else if($('#editReceipt-period').val()=='payhalfyear'){
			
			$('#editReceipt-money').val(money(data.amt*6));
			$('#editReceipt-eTime').val( getNextHalfYear($('#editReceipt-sTime').val()) );
		
		}else if($('#editReceipt-period').val()=='payyear'){
			
			$('#editReceipt-money').val(money(data.amt*12));
			$('#editReceipt-eTime').val( getNextYear($('#editReceipt-sTime').val()) );
		}
	},
	editPaymentPeriodSelect: function(data){
		if($('#editPayment-period').val()=='paymouth'){
			
			$('#editPayment-money').val(money(data.amt));
			$('#editPayment-eTime').val( getNextMonth($('#editPayment-sTime').val()) );
		
		}else if($('#editPayment-period').val()=='payseason'){
			
			$('#editPayment-money').val(money(data.amt*3));
			$('#editPayment-eTime').val( getNextQuarter( $('#editPayment-sTime').val() ) );
		
		}else if($('#editPayment-period').val()=='payhalfyear'){
			
			$('#editPayment-money').val(money(data.amt*6));
			$('#editPayment-eTime').val( getNextHalfYear($('#editPayment-sTime').val()) );
		
		}else if($('#editPayment-period').val()=='payyear'){
			
			$('#editPayment-money').val(money(data.amt*12));
			$('#editPayment-eTime').val( getNextYear($('#editPayment-sTime').val()) );
		}
	},
	initDeleteRequest:function(id){
		Core.AjaxRequest({
			type : 'DELETE',
			url : _global_settings.service.url+'/owner/payRemark/delete/'+id,
			async : false,
			showMsg:false,
			callback : function() {
				setCloseAlertTime();
				$('#viewTaxerUserReceipt').jqxGrid('updatebounddata','cells');
			},
			failure : function() {
			}
		});
	},
	initEditReceiptParma :function(data){
		var me = this;
		$('#editReceipt-period').dropDownlist({
			source : {'paymouth':'按月收款','payseason' : '按季度收款','payhalfyear' : '按半年收款','payyear' : '按年收款'},
			theme : currentTheme,
			height : 34,
			width : '100%',
			selectedIndex : 0
		});
		
		$('#editReceipt-sTime').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editReceipt-eTime').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editReceipt-amount').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editReceipt-money').input({width:'98%',height:33}).moneyinput();
		
		$('#editReceipt-loginId').val(me.data.loginId);
		$('#editReceipt-name').val(me.data.name);
		$('#editReceipt-amount').val(data.entryDate.substring(0,10));
		$('#editReceipt-money').val(money(data.amt));
		$('#editReceipt-sTime').val(data.startDate.substring(0,7));
		$('#editReceipt-eTime').val(data.endDate.substring(0,7));
	},
	initEditPaymentParma :function(data){
		var me = this;
		
		$('#editPayment-sTime').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editPayment-eTime').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editPayment-amount').datetimeinput({formatString:"yyyy-MM-dd", width: '100%', height: '34px'});
		$('#editPayment-money').input({width:'98%',height:33}).moneyinput();
		
		$('#editPayment-loginId').val(me.data.loginId);
		$('#editPayment-name').val(me.data.name);
		$('#editPayment-amount').val(data.entryDate.substring(0,10));
		$('#editPayment-money').val(money(data.amt));
		$('#editPayment-sTime').val(data.startDate.substring(0,7));
		$('#editPayment-eTime').val(data.endDate.substring(0,7));
		
		$('#editPayment-period').dropDownlist({
			source : {'paymouth':'按月收款','payseason' : '按季度收款','payhalfyear' : '按半年收款','payyear' : '按年收款'},
			theme : currentTheme,
			height : 34,
			width : '100%',
			selectedIndex : 0
		});
	},
	initEditReceiptSubmitParama :function(data){
		var obj = {};
			obj.id = data.id;
			obj.owner = {id:this.data.id},																//owner
			obj.entryDate = $('#editReceipt-amount').val();												//当前账期
			obj.startDate = $('#editReceipt-sTime').val();												//合同开始日期
			obj.endDate = $('#editReceipt-eTime').val();												//合同结束日期
			obj.dateType = $('#editReceipt-period').val();												//收款周期
			obj.amt = $('#editReceipt-money').val();													//收款金额
			obj.type = 'pay';
		return obj;
	},
	initEditPaymentSubmitParama:function(data){
		var obj = {};	
			obj.id = data.id;
			obj.owner = {id:this.data.id}, 																//id
			obj.entryDate = $('#editPayment-amount').val();												//当前账期
			obj.startDate = $('#editPayment-sTime').val();												//合同开始日期
			obj.endDate = $('#editPayment-eTime').val();												//合同结束日期
			obj.dateType = $('#editPayment-period').val();												//收款周期
			obj.amt	 = $('#editPayment-money').val();													//收款金额
			obj.type = 'nopay';
		return obj;
	},
	initEditReceiptRequest:function(obj){
		Core.AjaxRequest({
			type : 'PUT',
			url : _global_settings.service.url+'/owner/payRemark/update',
			async : false,
			params : obj,
			showMsg:false,
			callback : function() {
				setCloseAlertTime();
				$('#editReceiptMgtWin').jqxWindow('close');
				$('#viewTaxerUserReceipt').jqxGrid('updatebounddata','cells');
			},
			failure : function() {
			}
		});
	},
	initEditPaymentRequest:function(obj){
		Core.AjaxRequest({
			type : 'PUT',
			url : _global_settings.service.url+'/owner/payRemark/update',
			async : false,
			params : obj,
			showMsg:false,
			callback : function() {
				setCloseAlertTime();
				$('#editPaymentMgtWin').jqxWindow('close');
				$('#viewTaxerUserPayment').jqxGrid('updatebounddata','cells');
			},
			failure : function() {
			}
		});
	},
	initPaymentDeleteRequest:function(id){
		Core.AjaxRequest({
			type : 'DELETE',
			url : _global_settings.service.url+'/owner/payRemark/delete/'+id,
			async : false,
			showMsg:false,
			callback : function() {
				setCloseAlertTime();
				$('#viewTaxerUserPayment').jqxGrid('updatebounddata','cells');
			},
			failure : function() {
			}
		});
	},
	bind : function() {
		var me =this;
		// TODO 收款删除
		$('#viewTaxerUserReceipt').on('click','.deleteReceiptLineBtn', function() {
			var index = $(this).attr('data-index');
			var data = $("#viewTaxerUserReceipt").jqxGrid('getrowdata', index);
			this.listData = data;
			this.initDeleteRequest(this.listData.id);
		});
		
		//收款编辑
		$('#viewTaxerUserReceipt').on('click','.editReceiptLineBtn', function() {
			var index = $(this).attr('data-index');
			var data = $("#viewTaxerUserReceipt").jqxGrid('getrowdata', index);
			this.listData = data;
			$('#editReceiptMgtWin').jqxWindow('open', function() {
				me.initEditReceiptParma(data);
				
				if(data.startDate!=undefined){
					$('#editReceipt-sTime').val(data.startDate);
					me.editReceiptPeriodSelect(data);
				}else{
					$('#editReceipt-sTime').val($('#editReceipt-amount').val());
					me.editReceiptPeriodSelect(data);
				}
				$('#editReceipt-sTime').change(function(){
					me.editReceiptPeriodSelect(data);
				})
				
				me.editReceiptPeriodSelect(data);
				
				$('#editReceipt-period').on('select',function(){
					me.editReceiptPeriodSelect(data);
				})
			});
			
			//收款编辑保存
			$('#editReceiptSubmitBtn').off('click').on('click',function(){
				me.initEditReceiptRequest(	me.initEditReceiptSubmitParama(data ) );
			})
		});
		
		//催款删除
		$('#viewTaxerUserPayment').on('click','.deletePaymentLineBtn', function() {
			var index = $(this).attr('data-index');
			var data = $("#viewTaxerUserPayment").jqxGrid('getrowdata', index);
			me.listData = data;
			me.initPaymentDeleteRequest(data.id);
		});
		
		//催款编辑
		$('#viewTaxerUserPayment').on('click','.editPaymentLineBtn', function() {
			var index = $(this).attr('data-index');
			var data = $("#viewTaxerUserPayment").jqxGrid('getrowdata', index);
			me.listData = data;
			console.log(data);
			$('#editPaymentMgtWin').jqxWindow('open', function() {
				me.initEditPaymentParma(data);
				
				if(data.startDate!=undefined){
					$('#editPayment-sTime').val(data.startDate);
					me.editPaymentPeriodSelect(data);
				}else{
					$('#editPayment-sTime').val($('#editPayment-amount').val());
					me.editPaymentPeriodSelect(data);
				}
				$('#editPayment-sTime').change(function(){
					me.editPaymentPeriodSelect(data);
				})
				
				me.editPaymentPeriodSelect(data);
				
				$('#editPayment-period').on('select',function(){
					me.editPaymentPeriodSelect(data);
				})
			});
			
			//催款编辑保存
			$('#editPaymentSubmitBtn').off('click').on('click',function(){
				me.initEditPaymentRequest( me.initEditPaymentSubmitParama(data) );
			})
		});
		
		
	},
	unbindAll : function() {

	}
}