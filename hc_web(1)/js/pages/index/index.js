mui.ajax('http://101.201.196.202:82//product/Panicbuypage', {
	data: {
		activity: "2",
		top: 4,
	},
	dataType: 'json', //服务器返回json格式数据
	async: false,
	type: 'GET', //HTTP请求类型,
	timeout: 10000, //超时时间设置为10秒；
	success: function(data) {
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += "<li id=\"" + data[i].ID + "\" class=\'mui-table-view-cell mui-media\' ><a class=\'img_vertical\' href=\'javascript:;\'><img class=\'mui-media-object mui-pull-left\' src=\'http://101.201.196.202:82/Images/ProductImg/" + data[i].Image1 + "\'><div class=\'mui-media-body\'>" + data[i].Names + "<p class=\'mui-ellipsis sm_txt\'>" + " </p><p class=\'smm_txt zhonghuaxian\'>原价：￥" + data[i].Price1 + "</p><p class=\'red_txt\'>￥" + data[i].Price2 + "</p></div></a>"
		}
		$("#index-product").html(str);
	}
})

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
document.getElementById('offCanvasShow').addEventListener('tap', function() {
	offCanvasWrapper.offCanvas('show');
});
//菜单界面，‘关闭侧滑菜单’按钮的点击事件
document.getElementById('offCanvasHide').addEventListener('tap', function() {
	offCanvasWrapper.offCanvas('close');
});
//一下是三级联动JS
(function($, doc) {
	$.init();
	$.ready(function() {
		//-----------------------------------------
		//级联示例
		//-----------------------------------------
		//					//级联示例
		var cityPicker3 = new $.PopPicker({
			layer: 3
		});
		cityPicker3.setData(cityData3);
		var showCityPickerButton = doc.getElementById('showCityPicker3');
		var cityResult3 = doc.getElementById('cityResult3');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				//							cityResult3.innerText = "你选择:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				cityResult3.innerText = (items[2] || {}).text;
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	});
})(mui, document);
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