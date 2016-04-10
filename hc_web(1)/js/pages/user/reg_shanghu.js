//						document.getElementById("reg_shanghu_tijiao").addEventListener("tap", function() {
//							//打开关于页面
//							mui.openWindow({
//								url: "reg_shanghu_tijiao.html",
//								id: "reg_shanghu_tijiao"
//							});
//						});
mui.init({
	preloadPages: [{
		url: "reg_shanghu_tijiao.html",
		id: "reg_shanghu_tijiao"
	}]
});
//***********************密码由字母和数字组合********************
var ismypassword = function(value) {
	var regu1 = /[A-Za-z]/;
	var regu2 = /\d/;
	var b1 = regu1.test(value);
	var b2 = regu2.test(value);
	var b = b1 && b2;
	return b;
};
//***************************提交验证***********************************
(function($, doc) {
	$.init();
	$.plusReady(function() {
		var settings = app.getSettings();
		var regButton = doc.getElementById("reg_shanghu_tijiao");
		var btn = doc.getElementById("btn");
		var yanzheng = doc.getElementById("yanzhengma");
		var accountBox = doc.getElementById("account");
		var passwordBox = doc.getElementById("password");
		var passwordConfirmBox = doc.getElementById("password_confirm");
		var emailBox = doc.getElementById("email");
		var address = doc.getElementById("address");
		var Businessname = doc.getElementById("Businessname");
		var userResult = doc.getElementById("userResult");
		var cityResult3 = doc.getElementById("cityResult3");
		var T_ProvinceID = doc.getElementById("T_ProvinceID");
		var T_CityID = doc.getElementById("T_CityID");
		var T_DistrictID = doc.getElementById("T_DistrictID");
		var product_type = doc.getElementById("product_type");
		var latitude = doc.getElementById("latitude");
		var longitude = doc.getElementById("longitude");
		var altitude = doc.getElementById("altitude");
		var reg_shanghu_tijiao = null;
		regButton.addEventListener("tap", function(event) {
			
			var regInfo = {};
			//*****************验证手机号**************************
			var check_phone_number = /^1[3458]\d{9}$/;
			if (accountBox.value.length == 0) {
				plus.ui.toast("手机号不能为空");
				return;
			}
			if (accountBox.value.length != 11) {
				plus.ui.toast("请输入有效的手机号！");
				return;
			}
			if (!accountBox.value.match(check_phone_number)) {
				plus.ui.toast("请输入有效的手机号");
				return;
			}
			//*********************验证验证码输入********************
			if (yanzheng.value == "") {
				plus.nativeUI.toast("验证码不能为空");
				return;
			}
			if (yanzheng.value.length != 8) {
				plus.nativeUI.toast("验证码不合法");
				return;
			}
			//*********************验证密码输入********************
			var passwordConfirm = passwordConfirmBox.value;
			if (passwordBox.value == "") {
				plus.nativeUI.toast("密码不能为空");
				return;
			}
			if (passwordBox.value.length < 6) {
				plus.nativeUI.toast("密码需要至少六位字符");
				return;
			}
			if (!ismypassword(passwordBox.value)) {
				plus.nativeUI.toast("密码需要字母和数字组合");
				return;
			}
			if (passwordConfirm != passwordBox.value) {
				plus.nativeUI.toast("密码两次输入不一致");
				return;
			}
			//*********************验证邮箱输入********************
			var check_emailBox = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (emailBox.value == "") {
				plus.nativeUI.toast("邮箱不能为空");
				return;
			}
			if (!emailBox.value.match(check_emailBox)) {
				plus.ui.toast("请输入有效的邮箱地址");
				return;
			}
			//*********************验证姓名输入********************
			var realname_reg = /^[\u2E80-\u9FFF]+$/;
			if (Businessname.value == "") {
				plus.nativeUI.toast("名称不能为空");
				return;
			}
			if (!Businessname.value.match(realname_reg)) {
				plus.nativeUI.toast("名称只能为汉子");
				return;
			}
			//*********************验证常用地址输入********************
			if (cityResult3.innerText.indexOf("你选择") != 0) {
				plus.nativeUI.toast("请选择地区");
				return;
			}
			//*********************验证地址输入********************
			if (address.value == "") {
				plus.nativeUI.toast("请输入具体地址");
				return;
			}
			//*********************验证小区输入********************
			if (userResult.innerText.indexOf("你选择") != 0) {
				plus.nativeUI.toast("请选择经营范围");
				return;
			}
			//****************************用户提交成功返回*********************************
			app.reg(regInfo, function(err) {
				if (err) {
					plus.nativeUI.toast(err);
					return;
				}
				alert(product_type.value)
				mui.ajax("http://" + plus.storage.getItem("url") + "/home/sh_Register_on", {
					data: {
						"name": Businessname.value,
						"pwd": passwordBox.value,
						"Email": emailBox.value,
						"uname": accountBox.value,
						"Address": address.value,
						"T_ProvinceID": T_ProvinceID.value,
						"T_CityID": T_CityID.value,
						"T_DistrictID": T_DistrictID.value,
						"ProductsType_ID": product_type.value,
						"latitude": latitude.value,
						"longitude": longitude.value,
						"altitude": altitude.value,
						"yanzheng": yanzheng.value
					},
					dataType: "json", //服务器返回json格式数据
					type: "Post", //HTTP请求类型,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						if (data.statusCode == 200) {
							plus.ui.toast(data.message);
							var ws = plus.webview.currentWebview();
							plus.webview.close(ws);
							var account = accountBox.value;
							console.log(account)
							//获得详情页面
							if (!reg_shanghu_tijiao) {
								reg_shanghu_tijiao = plus.webview.getWebviewById("reg_shanghu_tijiao");
							}
							//触发详情页面的newsId事件
							mui.fire(reg_shanghu_tijiao, "adminmp", {
								id: account
							});
							//打开详情页面  
							mui.openWindow({
								url: "reg_shanghu_tijiao.html",
								id: "reg_shanghu_tijiao"
							});
						} else {
							plus.ui.toast(data.message);
						}
					}
				})
			});
		});
		btn.addEventListener("tap", function(event) {
			console.log(plus.storage.getItem("url"))
			var name = {};
			//*****************验证手机号**************************
			var check_phone_number = /^1[3458]\d{9}$/;
			if (accountBox.value.length == 0) {
				plus.ui.toast("手机号不能为空");
				return;
			}
			if (accountBox.value.length != 11) {
				plus.ui.toast("请输入有效的手机号！");
				return;
			}
			if (!accountBox.value.match(check_phone_number)) {
				plus.ui.toast("请输入有效的手机号");
				return;
			}
			//****************************用户获取验证码提交成功返回*********************************
			app.yanzheng(name, function(err) {
				if (err) {
					plus.nativeUI.toast(err);
					return;
				}
				mui.ajax("http://" + plus.storage.getItem("url") + "/home/shanghu_fs_codebound", {
					data: {
						"phone_zh": accountBox.value
					},
					dataType: "json", //服务器返回json格式数据
					type: "Post", //HTTP请求类型,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						console.log(data.statusCode)
						console.log(data.data1)
						if (data.statusCode == "200") {
							plus.ui.toast(data.message)
							test.init(btn);
						} else {
							plus.ui.toast(data.message);
						}
					}
				})
			});
		});
	});
}(mui, document));
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui.plusReady(function() {
(function($, doc) {
	$.init();
	$.ready(function() {
		//-----------------------------------------
		//级联示例***********************级联数据生成数组在方法里面*****************************
		//-----------------------------------------
		var cityPicker3 = new $.PopPicker({
			layer: 3
		});
		mui.ajax("http://" + plus.storage.getItem("url") + "/info/Province_Load", {
			data: {},
			async: false,
			dataType: "json", //服务器返回json格式数据
			type: "Post", //HTTP请求类型,
			timeout: 10000, //超时时间设置为10秒；
			success: function(Provincesdata) {
				cityPicker3.setData(eval(Provincesdata));
			}
		})
		var showCityPickerButton = doc.getElementById("showCityPicker3");
		var cityResult3 = doc.getElementById("cityResult3");
		var T_ProvinceID = doc.getElementById("T_ProvinceID");
		var T_CityID = doc.getElementById("T_CityID");
		var T_DistrictID = doc.getElementById("T_DistrictID");
		showCityPickerButton.addEventListener("tap", function(event) {
			cityPicker3.show(function(items) {
				cityResult3.innerText = "你选择:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				T_ProvinceID.value = (items[0] || {}).value
				T_CityID.value = (items[1] || {}).value
				T_DistrictID.value = (items[2] || {}).value
			});
		}, false);
		//-----------------------------------------
		//获取小区
		//-----------------------------------------
		var userPicker = new $.PopPicker();
		mui.ajax("http://" + plus.storage.getItem("url") + "/info/product_type", {
			data: {},
			async: false,
			dataType: "json", //服务器返回json格式数据
			type: "Post", //HTTP请求类型,
			timeout: 10000, //超时时间设置为10秒；
			success: function(Communitydata) {
				userPicker.setData(eval(Communitydata));
			}
		})
		var showUserPickerButton = doc.getElementById("showUserPicker");
		var userResult = doc.getElementById("userResult");
		var product_type = doc.getElementById("product_type");
		showUserPickerButton.addEventListener("tap", function(event) {
			userPicker.show(function(items) {
				userResult.innerText = "你选择:" + (items[0] || {}).text;
				product_type.value = (items[0] || {}).value;
			});
		}, false);
	});
})(mui, document);
})
var test = {
	node: null,
	count: 60,
	start: function() {
		//console.log(this.count);
		if (this.count > 0) {
			this.node.innerHTML = "倒计时:" + this.count--;
			var _this = this;
			setTimeout(function() {
				_this.start();
			}, 1000);
		} else {
			this.node.removeAttribute("disabled");
			this.node.innerHTML = "再次发送";
			this.count = 120;
		}
	},
	//初始化
	init: function(node) {
		this.node = node;
		this.node.setAttribute("disabled", true);
		this.start();
	}
};
// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
	// 使用百度地图地位模块获取位置信息
	plus.geolocation.getCurrentPosition(function(p) {
		document.getElementById("address").value = p.addresses;
		document.getElementById("latitude").value = p.coords.latitude;
		document.getElementById("longitude").value = p.coords.longitude;
		document.getElementById("altitude").value = p.coords.altitude;
	}, function(e) {
		alert("Geolocation error: " + e.message);
	}, {
		provider: "baidu"
	});
}