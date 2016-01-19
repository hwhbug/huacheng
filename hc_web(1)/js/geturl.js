document.getElementById('login').addEventListener('tap', function() {
	mui.ajax('http://101.201.196.202:82/home/login_cache', {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		async: false,
		type: 'GET', //HTTP请求类型,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
				if (data.name != null && data.name != "") { //打开关于页面
					mui.openWindow({
						url: 'user/user_my.html',
						id: 'user/user_my'
					});
				} else {
				mui.openWindow({
					url: 'login.html',
					id: 'login'
				});
			}
		}
	})
});

document.getElementById('repair').addEventListener('tap', function() {
	//打开关于页面
	mui.openWindow({
		url: 'baoxiu/repair_1.html',
		id: 'repair'
	});
});
document.getElementById('shop').addEventListener('tap', function() {
	//打开关于页面
	mui.openWindow({
		url: 'shopping/shop_index.html',
		id: 'shop'
	});
});