var phoneReg= function (value) {
var pReg = /1[3|5|6|8][0-9]\d{8}/;
	var p = pReg.test(value);
	return p;
}