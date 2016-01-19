mui.init({
				preloadPages: [{
					url: 'change_password.html',
					id: 'change_password'
				}]
			});
			(function($, doc) {
				$.init();
				$.plusReady(function() {
					var settings = app.getSettings();
					var sendMailButton = doc.getElementById('sendMail');
					var btn = doc.getElementById('btn');
					var yanzheng = doc.getElementById('yanzhengma');
					var accountBox = doc.getElementById('account');
					var change_password = null;
					sendMailButton.addEventListener('tap', function(event) {
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
						//****************************用户提交成功返回*********************************
						app.reg(regInfo, function(err) {
							if (err) {
								plus.nativeUI.toast(err);
								return;
							}
							mui.ajax('http://101.201.196.202:82/info/changge_yanzheng', {
								data: {
									"yanzheng": yanzheng.value
								},
								dataType: 'json', //服务器返回json格式数据
								type: 'Post', //HTTP请求类型,
								timeout: 10000, //超时时间设置为10秒；
								success: function(data) {
									if (data.statusCode == "200") {
										//添加列表项的点击事件
										var account = accountBox.value;
										//获得详情页面
										if (!change_password) {
											change_password = plus.webview.getWebviewById('change_password');
										}
										//触发详情页面的newsId事件
										mui.fire(change_password, 'newsId', {
											id: account
										});
										//打开详情页面          
										mui.openWindow({
											url: 'change_password.html',
											id: 'change_password'
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
							mui.ajax('http://101.201.196.202:82/home/fs_codebound_change', {
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
			mui('#sendMail').on('tap',  function(e) {
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
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});