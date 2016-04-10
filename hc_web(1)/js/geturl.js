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
	//打开关于页面
	mui.openWindow({
		url: "wuye/wuye_dingdan.html",
		id: "wuye/wuye_dingdan"
	});
});
document.getElementById("repair").addEventListener("tap", function() {
	//打开关于页面
	mui.openWindow({
		url: "baoxiu/repair_1.html",
		id: "repair"
	});
});
document.getElementById("shop").addEventListener("tap", function() {
	//打开关于页面
	mui.openWindow({
		url: "shopping/shop_index.html",
		id: "shop"
	});
});
document.getElementById("jiazheng").addEventListener("tap", function() {
	//打开家政页面
	mui.openWindow({
		url: "jiazheng/jiazheng_index.html",
		id: "jiazheng"
	});
});
document.getElementById("gonggao").addEventListener("tap", function() {
	//打开关于页面
	mui.openWindow({
		url: "gonggao/gonggao_liebiao.html",
		id: "gonggao/gonggao_liebiao"
	});
});
//法律援助
document.getElementById("falv").addEventListener("tap", function() {
	mui.openWindow({
		url: "falv/falv_index.html",
		id: "falv"
	})

})