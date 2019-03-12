/**
 *  @license
 *  Copyright 2018
 *  @author
 *  fei. zhang
 *  @time
 *  2019/1/11 15:04
 */

const axios = require('axios');

export function requestPost( url, params) {
	return axios.post(url, params);
}

export function requestGet( url, params) {
	return axios.get(url, params);
}

export function requestPut( url, params) {
	return axios.put(url, params);
}