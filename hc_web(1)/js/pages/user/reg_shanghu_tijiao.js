mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			window.addEventListener("adminmp", function(event) {
				//获得事件参数
				var id = event.detail.id;
				//将上一个页面的手机号码传入到这个页面以便提交使用
				mui.ajax("http://" + plus.storage.getItem("url") + "/home/Admininfo", {
					data: {
						"adminmp": id
					},
					dataType: "json", //服务器返回json格式数据
					type: "Post", //HTTP请求类型,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						var info = "<p>商户帐号：" + data.uname + "</p><p>商户名称：" + data.name + "</p><p>营业地址：" + data.Address + "</p><p>经营类型：" + data.ProductsType.Names + "</p>";
						$("#admininfo").html(info);
						document.getElementById("admin_mp").value = data.uname;
					}
				})
			});
			mui.init({
				preloadPages: [{
					url: "shenhezhong.html",
					id: "shenhezhong"
				}]
			});
			(function($, doc) {
				$.init();
				$.plusReady(function() {
					var settings = app.getSettings();
					var shenhezhong = doc.getElementById("shenhezhong");
					var pic = doc.getElementById("pic");
					var tel = doc.getElementById("tel");
					var images = doc.getElementById("images");
					var admin_mp = doc.getElementById("admin_mp");
					shenhezhong.addEventListener("tap", function(event) {
						//*********************验证负责人输入********************
						var pic_reg = /^[\u2E80-\u9FFF]+$/;
						if (pic.value == "") {
							plus.nativeUI.toast("负责人不能为空");
							return;
						}
						if (!pic.value.match(pic_reg)) {
							plus.nativeUI.toast("负责人只能为汉子");
							return;
						}
						//*********************验证固定电话输入********************
						var tel_reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
						if (tel.value == "") {
							plus.nativeUI.toast("固定电话不能为空");
							return;
						}
						if (!tel.value.match(tel_reg)) {
							plus.nativeUI.toast("固定电话格式不正确");
							return;
						}
						//*****************判断是否选择了图片******************************
						if (document.getElementById("showimg").innerHTML.trim() == "") {
							plus.nativeUI.toast("请选择上传图片");
							return;
						}
						//****************************用户提交成功返回*********************************
						mui.ajax("http://" + plus.storage.getItem("url") + "/home/BusinessAdd", {
							data: {
								"FixedNumber": tel.value,
								"Names": pic.value,
								"images": images.value,
								"adminnum": admin_mp.value
							},
							dataType: "json", //服务器返回json格式数据
							type: "Post", //HTTP请求类型,
							timeout: 10000, //超时时间设置为10秒；
							success: function(data) {
								if (data.statusCode == 200) {
									plus.ui.toast(data.message);
									//关闭当前窗体
									var ws = plus.webview.currentWebview();
									plus.webview.close(ws);
									//打开详情页面  
									mui.openWindow({
										url: "index.html",
										id: "index"
									});
								} else {
									plus.ui.toast(data.message);
								}
							}
						})
					});
				});
			}(mui, document));
			mui.init();
			mui.plusReady(function() {})
				//上传单张图片
			function galleryImg() {
				//每次拍摄或选择图片前清空数组对象
				file1.splice(0, file1.length);
				document.getElementsByClassName("showimg")[0].innerHTML = null;
				// 从相册中选择图片
				mui.toast("从相册中选择一张图片");
				plus.gallery.pick(function(path) {
					showImg(path);
				}, function(e) {
					mui.toast("取消选择图片");
				}, {
					filter: "image",
					multiple: false
				});
			}

			function galleryImgs() {
				//每次拍摄或选择图片前清空数组对象
				file1.splice(0, file1.length);
				fileurl.splice(0, fileurl.length);
				document.getElementsByClassName("showimg")[0].innerHTML = null;
				// 从相册中选择图片
				mui.toast("从相册中选择不超过两张图片");
				plus.gallery.pick(function(e) {
					if (e.files.length != 2) {
						mui.toast("请选择身份证正面和背面照片共两张");
						return false;
					}
					for (var i in e.files) {
						showImg(e.files[i]);
					}
				}, function(e) {
					mui.toast("取消选择图片");
				}, {
					filter: "image",
					multiple: true
				});
			}
			// 拍照添加文件
			function cameraimages() {
				//每次拍摄或选择图片前清空数组对象
				file1.splice(0, file1.length);
				fileurl.splice(0, fileurl.length);
				document.getElementsByClassName("showimg")[0].innerHTML = null;
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
						showImg(localurl);
					});
				}, function(e) {
					mui.toast("很抱歉，获取失败 " + e);
				});
			}
			// 全局数组对象，添加文件,用于压缩上传使用
			var fileurl = new Array();
			var file1 = new Array();

			function showImg(url) {
				// 兼容以“file:”开头的情况
				if (0 != url.toString().indexOf("file://")) {
					url = "file://" + url;
				}
				var _div_ = document.getElementsByClassName("showimg")[0];
				var _img_ = new Image();
				_img_.src = url; // 传过来的图片路径在这里用。
				_img_.onclick = function() {
					plus.runtime.openFile(url);
				};
				_img_.onload = function() {
					var tmph = _img_.height;
					var tmpw = _img_.width;
					var isHengTu = tmpw > tmph;
					var max = Math.max(tmpw, tmph);
					var min = Math.min(tmpw, tmph);
					var bili = min / max;
					if (max > 1200) {
						max = 1200;
						min = Math.floor(bili * max);
					}
					tmph = isHengTu ? min : max;
					tmpw = isHengTu ? max : min;
					_img_.style.border = "1px solid rgb(200,199,204)";
					_img_.style.margin = "10px";
					_img_.style.width = "150px";
					_img_.style.height = "150px";
					_img_.onload = null;
					plus.io.resolveLocalFileSystemURL(url, function(entry) {
							entry.file(function(file) {
								canvasResize(file, {
									width: tmpw,
									height: tmph,
									crop: false,
									quality: 50, //压缩质量
									rotate: 0,
									callback: function(data, width, height) {
										fileurl.push(url);
										file1.push(file.name);
										_img_.src = data;
										_div_.appendChild(_img_);
										plus.nativeUI.closeWaiting();
									}
								});
							});
						},
						function(e) {
							plus.nativeUI.closeWaiting();
							console.log(e.message);
						});
				};
			};
			// 扩展API加载完毕后调用onPlusReady回调函数
			document.addEventListener("plusready", onPlusReady, false);
			var r = null;
			// 扩展API加载完毕，现在可以正常调用扩展API
			function onPlusReady() {}
			// 创建上传任务
			function imgupgrade() {
				var task = plus.uploader.createUpload("http://" + plus.storage.getItem("url") + "/home/request_img", {
					method: "post"
				}, function(t, status) {
					var data = eval("(" + t.responseText + ")")
					document.getElementById("images").value = data.data;
					// 上传完成
					if (data.statusCode == "200") {
						mui.toast("文件上传成功");
					} else {
						mui.toast("文件上传失败");
					}
				});
				for (var i = 0; i < file1.length; i++) {
					task.addFile(fileurl[i], {
						key: file1[i],
						name: file1[i],
					});
					//多文件上传需要多次触发文件上传uploader.start()
					task.start();
				}
			}