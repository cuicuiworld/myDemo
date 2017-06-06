/**
 * 自定义alert窗口
 * 
 * @param {String}
 *            settings.width 		窗口宽度
 * @param {String}
 *            settings.height 		窗口高度
 * @param {String}
 *            settings.title 		窗口标题
 * @param {String}
 *            settings.message 		显示信息
 * @param {String}
 *            settings.okBtn 		确定按钮名称
 * @param {String}
 *            settings.closeBtn 	关闭按钮
 * @param {String}
 *            settings.type 		提示类型(info, warning, error)
 * @param {Function}
 *            settings.callback 	确定按钮回调函数
 * @param {Function}
 *            settings.hide 		确认后窗口关闭
 */

var Core = {};

Core.alert = function(settings) {
	var width = settings.width === undefined ? '550' : settings.width,
		height = 300,
		title = settings.title === undefined ? '提示信息' : settings.title,
		message = settings.message === undefined ? '操作成功！' : settings.message,
		okBtn = settings.okBtn === undefined ? '确认' : settings.okBtn,
		closeBtn = settings.closeBtn === undefined ? '' : settings.closeBtn,
		callback = settings.callback === undefined ? function(){} : settings.callback,
		colseCallback = settings.colseCallback === undefined ? function(){} : settings.colseCallback,
		type = settings.type === undefined ? 'info' : settings.type,
		hide = settings.hide === undefined ? true : settings.hide;
	
	this.init = function() {
		this.initModal();
		this.initDomStyle();
		this.initHideAlertTime();
		this.bindAlertEvent();
	}
	this.initModal = function() {
		var html = $('<div id="alertWindow">'
				+ '<div id="alertWindowHeader">'
				+ '<span id="captureContainer">'+title+'</span>'
				+ '<span id="alertCloseBtn">×</span>'
				+ '</div>'
				+ '<div id="alertWindowContent"><p style="line-height: 100px;">'+message+'</p></div>'
				+ '<div id="alertWindowFooter" style="border-top: solid 1px #eef0f1;">'
				+ '<div id="alertWindowGroup" style="float:right;">'
				+ '<a id="alertWindowOkBtn" >'+okBtn+'</a>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div id="alertLayer"></div>');
		html.appendTo($("body"));
	}
	this.initDomStyle = function() {
		$('#alertWindow').css({
		    'position': 'fixed',
		    'left': '50%',
		    'top': '50%',
		    'background-color': '#ffffff',
		    'z-index': '2147000001',
		    'width': width+'px' ,
		    'height': height+'px',
		    'margin-left': '-285px',
		    'margin-top': '-150px',
		    'border-radius': '5px',
		    'font-weight': 'bold',
		    'color': '#535e66'
		});
		
		$('#alertCloseBtn').css({
			'cursor': 'pointer',
		    'width': '12px',
		    'height': '12px',
		    'float': 'right',
		    'text-align': 'center',
			'font-size': '30px',
			'color': 'rgb(0, 149, 217)'
		})
		
		$('#alertLayer').css({
		    'position': 'fixed',
		    'top': 0,
		    'left': 0,
		    'width': '100%',
		    'height': '100%',
		    'background-color': '#666666',
		    'opacity': '0.5',
		    'z-index': '2147000000',
		    'border': 'solid 1px #333'
		});
		
		$('#alertWindowHeader').css({
		    'height': '30px',
		    'line-height': '30px',
		    'padding': '14px 30px',
		    'border-bottom': 'solid 1px #eef0f1'
		})
		
		$('#captureContainer').css({
			'font-size': '18px',
		    'display': 'block',
		    'float': 'left',
		    'height': '30px',
		    'position': 'relative'
		});
		
		$('#alertWindowContent').css({
		    'height': '100px',
		    'overflow': 'hidden',
		    'text-align':'center',
		    'padding': '40px 0'
		});
		
		$('#alertWindowOkBtn').css({
		    'display': 'block',
		    'cursor': 'pointer',
		    'float': 'left',
		    'width': '95px',
		    'height': '35px',
		    'line-height': '35px',
		    'text-align': 'center',
		    'border-radius': '5px',
		    'background-color': '#0095d9',
		    'color': '#FFFFFF',
		    'margin':'14px 14px 0 0'
		});
	}
	
	this.initHideAlertTime = function() {
		var _hideAlert;
		if(!settings.hide){
			_hideAlert = setTimeout(function(){
				if($('#alertWindowOkBtn')) $('#alertWindowOkBtn').trigger('click');
			},10000);
		}
		if(settings.hide){
			_hideAlert = setTimeout(function(){
				if($('#alertWindowOkBtn')) $('#alertWindowOkBtn').trigger('click');
			},settings.hide);
		}
	}
	this.bindAlertEvent = function() {
		$('#alertCloseBtn').off('click').on('click',function(){
			$('#alertWindow').css('display','none');
			$('#alertLayer').css('display','none');
			
			if (typeof colseCallback=='function') {
				colseCallback();
			}
		});
		
		$('#alertWindowOkBtn').off('click').on('click',function(){
			$('#alertWindow').css('display','none');
			$('#alertLayer').css('display','none');
			
			if (typeof callback=='function') {
				callback();	
			}
		})
	}
	this.init();
}

Core.alert({
	message:'操作成功！',
	callback:function(){
		console.log('成功回调函数')
	},
	colseCallback:function(){
		console.log('关闭回调函数')
	}
});
