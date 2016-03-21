mui('.mui-scroll-wrapper').scroll();
var url="101.201.196.202:82";
//mui.ajax('http://'+url+'/product/Panicbuypage', {
//	data: {
//		activity: "2",
//		top: 4,
//	},
//	dataType: 'json', //服务器返回json格式数据
//	async: false,
//	type: 'GET', //HTTP请求类型,
//	timeout: 10000, //超时时间设置为10秒；
//	success: function(data) {
//		var str = "";
//		for (var i = 0; i < data.length; i++) {
//			str += "<li id=\"" + data[i].ID + "\" class=\'mui-table-view-cell mui-media\' ><a class=\'img_vertical\' href=\'javascript:;\'><img class=\'mui-media-object mui-pull-left\' src=\'http://101.201.196.202:82/Images/ProductImg/" + data[i].Image1 + "\'><div class=\'mui-media-body\'>" + data[i].Names + "<p class=\'mui-ellipsis sm_txt\'>" + " </p><p class=\'smm_txt zhonghuaxian\'>原价：￥" + data[i].Price1 + "</p><p class=\'red_txt\'>￥" + data[i].Price2 + "</p></div></a>"
//		}
//		$("#index-product").html(str);
//	},
//	error: function(xhr, type, errorThrown) {
//		//异常处理；
//		mui.plusReady(function() {
//			alert("系统内部错误，请稍后重试")
//			plus.runtime.quit();
//		});
//	}
//})

mui.ajax('http://101.201.196.202:82/home/login_cache', {
	data: {},
	dataType: 'json', //服务器返回json格式数据
	async: false,
	type: 'GET', //HTTP请求类型,
	timeout: 10000, //超时时间设置为10秒；
	success: function(data) {
		if (data.name != null && data.name != "") {
			$(".login").html("<p>" + data.name + "</p>")
		}
	}
})
mui.init({
	preloadPages: [{
		id: 'shopping/shop_cuxiao_acter.html',
		url: 'shopping/shop_cuxiao_acter.html'
	}]
});
var cuxiao_detailPage = null;
//添加列表项的点击事件
mui('#index-product').on('tap', 'li', function(e) {
	var cuxiao_id = this.getAttribute('id');
	//获得详情页面
	if (!cuxiao_detailPage) {
		cuxiao_detailPage = plus.webview.getWebviewById('shopping/shop_cuxiao_acter.html');
	}
	//触发详情页面的newsId事件
	mui.fire(cuxiao_detailPage, 'productsId', {
		cuxiao_id: cuxiao_id
	});
	//打开详情页面          
	mui.openWindow({
		url: 'shopping/shop_cuxiao_acter.html',
		id: 'shopping/shop_cuxiao_acter.html'
	});
});
//主界面‘显示侧滑菜单’按钮的点击事件.
//document.getElementById('offCanvasShow').addEventListener('tap', function() {
//	offCanvasWrapper.offCanvas('show');
//});
////菜单界面，‘关闭侧滑菜单’按钮的点击事件
//document.getElementById('offCanvasHide').addEventListener('tap', function() {
//	offCanvasWrapper.offCanvas('close');
//});

//*********************退出应用*****************************
var first = null;
mui.back = function() {
	if (!first) {
		first = new Date().getTime();
		plus.nativeUI.toast("再按一次退出应用");
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if (new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
}