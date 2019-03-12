/**
 *  @license
 *  Copyright 2018
 *  @author
 *  fei. zhang
 *  @time
 *  2019/3/11 10:35
 */

import { MessageBox } from 'mint-ui';


export const TipsUtil = {
	alert: (message, fun = () => {}) => {
		MessageBox.alert(message, '提示').then(action => {
		  fun();
		});
	}
};