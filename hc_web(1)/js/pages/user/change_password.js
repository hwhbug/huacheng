mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			window.addEventListener('newsId', function(event) {
				//获得事件参数
				var id = event.detail.id;
				//将上一个页面的手机号码传入到这个页面以便提交使用
				document.getElementById('accountbox').value = id;
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
			(function($, doc) {
				$.init();
				$.plusReady(function() {
					var settings = app.getSettings();
					var uploadButton = doc.getElementById('upload');
					var passwordBox = doc.getElementById('password');
					var passwordConfirmBox = doc.getElementById('password_confirm');
					var accountBox = document.getElementById('accountbox');
					uploadButton.addEventListener('tap', function(event) {
						var regInfo = {};
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
						//****************************用户提交成功返回*********************************
						app.reg(regInfo, function(err) {
							if (err) {
								plus.nativeUI.toast(err);
								return;
							}
							mui.ajax('http://101.201.196.202:82/info/changepassword', {
								data: {
									"pwd": passwordBox.value,
									"mp": accountBox.value,
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
				});
			}(mui, document));