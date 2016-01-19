mui.init({
	swipeBack: true //启用右滑关闭功能
});
(function($, doc) {
	$.init();
	$.ready(function() {
		//-----------------------------------------
		//级联示例***********************级联数据生成数组在方法里面*****************************
		//-----------------------------------------
		var cityPicker3 = new $.PopPicker({
			layer: 3
		});
		mui.ajax('http://101.201.196.202:82/info/Province_Load', {
			data: {},
			async: false,
			dataType: 'json', //服务器返回json格式数据
			type: 'Post', //HTTP请求类型,
			timeout: 10000, //超时时间设置为10秒；
			success: function(Provincesdata) {
				cityPicker3.setData(eval(Provincesdata));
			}
		})
		var showCityPickerButton = doc.getElementById('showCityPicker3');
		var cityResult3 = doc.getElementById('cityResult3');
		var T_ProvinceID = doc.getElementById('T_ProvinceID');
		var T_CityID = doc.getElementById('T_CityID');
		var T_DistrictID = doc.getElementById('T_DistrictID');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				cityResult3.innerText = "你选择:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				Community_Load((items[2] || {}).value)
				T_ProvinceID.value = (items[0] || {}).value
				T_CityID.value = (items[1] || {}).value
				T_DistrictID.value = (items[2] || {}).value
					//cityResult3.innerText = (items[2] || {}).text;
					//返回 false 可以阻止选择框的关闭
					//return false
			});
		}, false);
		//-----------------------------------------
		//获取小区
		//-----------------------------------------
		var Community_Load = function(dis_id) {
			var userPicker = new $.PopPicker();
			mui.ajax('http://101.201.196.202:82/info/Community_Load1', {
				data: {
					id: dis_id
				},
				async: false,
				dataType: 'json', //服务器返回json格式数据
				type: 'Post', //HTTP请求类型,
				timeout: 10000, //超时时间设置为10秒；
				success: function(Communitydata) {
					userPicker.setData(eval(Communitydata));
				}
			})
			var showUserPickerButton = doc.getElementById('showUserPicker');
			var userResult = doc.getElementById('userResult');
			var CommunityID = doc.getElementById('CommunityID');
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					userResult.innerText = "你选择:" + (items[0] || {}).text;
					CommunityID.value = (items[0] || {}).value;
				});
			}, false);
		}
	});
})(mui, document);
//***********************点击发送短信到手机获取验证码*********************************
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
		var regButton = doc.getElementById('reg');
		var btn = doc.getElementById('btn');
		var yanzheng = doc.getElementById('yanzhengma');
		var accountBox = doc.getElementById('account');
		var passwordBox = doc.getElementById('password');
		var passwordConfirmBox = doc.getElementById('password_confirm');
		var emailBox = doc.getElementById('email');
		var building = doc.getElementById('building');
		var unit = doc.getElementById('unit');
		var realname = doc.getElementById('realname');
		var userResult = doc.getElementById('userResult');
		var cityResult3 = doc.getElementById('cityResult3');
		var T_ProvinceID = doc.getElementById('T_ProvinceID');
		var T_CityID = doc.getElementById('T_CityID');
		var T_DistrictID = doc.getElementById('T_DistrictID');
		var CommunityID = doc.getElementById('CommunityID');
		regButton.addEventListener('tap', function(event) {
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
				plus.nativeUI.toast('验证码不能为空');
				return;
			}
			if (yanzheng.value.length != 6) {
				plus.nativeUI.toast('验证码不合法');
				return;
			}
			//*********************验证密码输入********************
			var passwordConfirm = passwordConfirmBox.value;
			if (passwordBox.value == "") {
				plus.nativeUI.toast('密码不能为空');
				return;
			}
			if (passwordBox.value.length < 6) {
				plus.nativeUI.toast('密码需要至少六位字符');
				return;
			}
			if (!ismypassword(passwordBox.value)) {
				plus.nativeUI.toast('密码需要字母和数字组合');
				return;
			}
			if (passwordConfirm != passwordBox.value) {
				plus.nativeUI.toast('密码两次输入不一致');
				return;
			}
			//*********************验证常用地址输入********************
			if (cityResult3.innerText.indexOf("你选择") != 0) {
				plus.nativeUI.toast('请选择常用地区');
				return;
			}
			//*********************验证小区输入********************
			if (userResult.innerText.indexOf("你选择") != 0) {
				plus.nativeUI.toast('请选择小区');
				return;
			}
			//*********************验证楼号输入********************
			if (building.value == "") {
				plus.nativeUI.toast('楼号不能为空');
				return;
			}
			if (building.value.indexOf("#") != 0) {
				plus.nativeUI.toast('楼号格式不正确');
				return;
			}
			//*********************验证单元号输入********************
			if (unit.value == "") {
				plus.nativeUI.toast('单元号不能为空');
				return;
			}
			//*********************验证姓名输入********************
			var realname_reg = /^[\u2E80-\u9FFF]+$/;
			if (realname.value == "") {
				plus.nativeUI.toast('姓名不能为空');
				return;
			}
			if (!realname.value.match(realname_reg)) {
				plus.nativeUI.toast('姓名只能为汉子');
				return;
			}
			//*********************验证邮箱输入********************
			var check_emailBox = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (emailBox.value == "") {
				plus.nativeUI.toast('邮箱不能为空');
				return;
			}
			if (!emailBox.value.match(check_emailBox)) {
				plus.ui.toast("请输入有效的邮箱地址");
				return;
			}
			//****************************用户提交成功返回*********************************
			app.reg(regInfo, function(err) {
				if (err) {
					plus.nativeUI.toast(err);
					return;
				}
				mui.ajax('http://101.201.196.202:82/home/Register_on', {
					data: {
						"name": realname.value,
						"pwd": passwordBox.value,
						"email": emailBox.value,
						"mp": accountBox.value,
						"Floor_Name": building.value,
						"UnitNumber_Name": unit.value,
						"T_ProvinceID": T_ProvinceID.value,
						"T_CityID": T_CityID.value,
						"T_DistrictID": T_DistrictID.value,
						"CommunityID": CommunityID.value,
						"yanzheng": yanzheng.value
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'Post', //HTTP请求类型,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						if (data.statusCode == 200) {
							plus.ui.toast(data.message);
							//										mui.back();
							mui.openWindow({
								url: 'login.html',
								id: 'login',
							});
						} else {
							plus.ui.toast(data.message);
						}
					}
				})
			});
		});
		btn.addEventListener('tap', function(event) {
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
				mui.ajax('http://101.201.196.202:82/home/fs_codebound', {
					data: {
						"phone_zh": accountBox.value
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'Post', //HTTP请求类型,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
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