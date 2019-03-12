/**
 *  @license
 *  Copyright 2018
 *  @author
 *  fei. zhang
 *  @time
 *  2019/3/11 10:21
 */


export const CookieUtil = {
	setCookie: (name, value, time) => {
		const exp = new Date();
		exp.setTime(exp.getTime() + time);
		document.cookie = name + '=' + value + ';path=/' + ';expires=' + exp.toUTCString();
	},
	getCookie: (name) => {
		const reg = new RegExp('(^|)' + name + '=([^;]*)(;|$)');
		const arr = document.cookie.match(reg);
		if (arr) {
			return arr[2];
		}
		return null;
	},
	deleteCookie: (name) => {
		const exp = new Date();
		exp.setTime(exp.getTime() - 24*60*60*1000);
		const cval = CookieUtil.getCookie(name);
		if (cval) {
			document.cookie = name + '=' + cval + ';path=/;expires=' + exp.toUTCString();
		}
	}
};