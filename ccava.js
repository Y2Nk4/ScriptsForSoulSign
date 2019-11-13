// ==UserScript==
// @name              ccava签到
// @namespace         https://github.com/inu1255/soulsign-chrome
// @version           1.0.0
// @author            Y2Nk4
// @loginURL          https://www.ccava.net/login.html
// @expire            900e3
// @domain            www.ccava.net
// ==/UserScript==

/**
 * 签到接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * throw 签到失败并抛出失败原因
 * return 签到成功并返回成功信息
 */
exports.run = async function() {
    var ret = await axios.get('https://www.ccava.net/zb_users/plugin/mochu_us/cmd.php?act=qiandao');
	let JsonData = (typeof ret.data == "string" ) ? JSON.parse(ret.data) : ret.data;
	
	if(JsonData['code'] == 0 && /签到成功/.test(JsonData.msg)){
		return '已领取';
	}else if(/你今天签过到啦/.test(JsonData.msg)){
		return '成功';
	}else if(/请登录以后再进行签到/.test(JsonData.msg)){
		throw '需要登录';
	}else{
		throw '失败1';
	}
};

/**
 * 检查是否在线接口，可以使用axios库发起请求,请求url域名必须通过@domain声明
 * return true 代表在线
 */
exports.check = async function() {
    var ret = await axios.get('https://www.ccava.net/Ucenter');
	
    return ret.status == 200;
};