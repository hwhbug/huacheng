document.getElementById("login").addEventListener("tap", function() {
	mui.ajax("http://" + plus.storage.getItem("url") + "/home/login_cache", {
		data: {},
		dataType: "json", //服务器返回json格式数据
		async: false,
		type: "GET", //HTTP请求类型,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if (data.uname != null && data.uname != "") { //打开关于页面
				mui.openWindow({
					url: "user/user_my.html",
					id: "user/user_my.html"
				});
			} else {
				mui.openWindow({
					url: "login.html",
					id: "login.html"
				});
			}
		}
	})
});
document.getElementById("wuye").addEventListener("tap", function() {
	mui.ajax("http://" + plus.storage.getItem("url") + "/home/login_cache", {
		data: {},
		dataType: "json", //服务器返回json格式数据
		async: false,
		type: "GET", //HTTP请求类型,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if (data.uname != null && data.uname != "") { //打开关于页面
				//打开关于页面
				if (data.CommunityID==null) {
					plus.ui.toast("您还没有绑定物业.");
				} 
				mui.openWindow({
					url: "wuye/wuye_dingdan.html",
					id: "wuye/wuye_dingdan"
				});
			} else {
				plus.ui.toast("请先登录.");
				mui.openWindow({
					url: "login.html",
					id: "login.html"
				});
			}
		}
	})

});
document.getElementById('repair').addEventListener('tap', function() {
	mui.ajax('http://101.201.196.202:82/home/login_cache', {
		dataType: 'json', //服务器返回json格式数据
		type: 'GET', //HTTP请求类型,
		success: function(data) {
			if (data.nAccountID != null && data.nAccountID != "") {
				mui.openWindow({
					url: '/baoxiu/repair_1.html'
				});
			} else {
				mui.toast("请先登录");
			}
		}
	})
});
document.getElementById("shop").addEventListener("tap", function() {
	//打开关于页面
	mui.openWindow({
		url: "shopping/shop_index.html",
		id: "shop"
	});
});
document.getElementById('jiazheng').addEventListener('tap', function() {
		mui.ajax('http://101.201.196.202:82/home/login_cache', {
			dataType: 'json', //服务器返回json格式数据
			type: 'GET', //HTTP请求类型,
			success: function(data) {
				if (data.nAccountID != null && data.nAccountID != "") {
					mui.openWindow({
						url: 'jiazheng/jiazheng_index.html'
					});
				} else {
					mui.toast("请先登录");
				}
			}
		})
	})
//公告
document.getElementById("communityBulletin").addEventListener("tap", function() {
		mui.ajax('http://101.201.196.202:82/home/login_cache', {
			dataType: 'json', //服务器返回json格式数据
			type: 'GET', //HTTP请求类型,
			success: function(data) {
				if (data.nAccountID != null && data.nAccountID != "") {
					mui.openWindow({
						url: 'gonggao/gonggao_huodong.html'
					});
				} else {
					mui.toast("请先登录");
				}
			}
		})
	})
	//投诉
document.getElementById("tousu").addEventListener("tap", function() {
	mui.ajax('http://101.201.196.202:82/home/login_cache', {
		dataType: 'json', //服务器返回json格式数据
		type: 'GET', //HTTP请求类型,
		success: function(data) {
			if (data.nAccountID != null && data.nAccountID != "") {
				mui.openWindow({
					url: '/tousu/tousu_index.html'
				});
			} else {
				mui.toast("请先登录");
			}
		}
	})
})
//法律援助
document.getElementById("falv").addEventListener("tap", function() {
		mui.ajax('http://101.201.196.202:82/home/login_cache', {
			dataType: 'json', //服务器返回json格式数据
			type: 'GET', //HTTP请求类型,
			success: function(data) {
				if (data.nAccountID != null && data.nAccountID != "") {
					mui.openWindow({
						url: 'falv/falv_index.html'
					});
				} else {
					mui.toast("请先登录");
				}
			}
		})
	})
//养老
document.getElementById("yanglao").addEventListener("tap", function() {
		mui.ajax('http://101.201.196.202:82/home/login_cache', {
			dataType: 'json', //服务器返回json格式数据
			type: 'GET', //HTTP请求类型,
			success: function(data) {
				if (data.nAccountID != null && data.nAccountID != "") {
					mui.openWindow({
						url: 'yanglao/yanglao_index.html'
					});
				} else {
					mui.toast("请先登录");
				}
			}
		})
	})