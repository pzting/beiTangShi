/*!
author:kooboy_li@163.com
MIT licensed
*/

let base = 19968,
	middle = (40896 - base) / 2;
let EMPTY = '';
let COMA = ',';
let chars = (() => {
	let a = [];
	for (let i = 33; i < 127; i++) {
		if (i != 34 && i != 92 && i != 45) {
			a.push(String.fromCharCode(i));
		}
	}
	return a.join(EMPTY);
})();

let DB = {
	sToC: {},
	cToS: {}
};
let sToC = DB.sToC,
	cToS = DB.cToS,
	ungroup = /-?.{2}/g,
	rg = /^-/,
	fromX = str => {
		let result = 0,
			temp = 1;
		for (let idx = str.length; idx--;) {
			result += temp * (chars.indexOf(str.charAt(idx)));
			temp *= 91;
		}
		return result;
	},
	fn = (a, f) => {
		let p, gs, i, ch, num;
		for (p in a) {
			if (a.hasOwnProperty(p)) {
				gs = a[p].match(ungroup);
				for (i = 0; i < gs.length; i++) {
					ch = gs[i].replace(rg, '#');
					num = fromX(ch);
					ch = String.fromCharCode(base + middle + (f ? -num : num));
					if (sToC.hasOwnProperty(p)) {
						sToC[p] += ch;
					} else {
						sToC[p] = ch;
					}
					if (cToS.hasOwnProperty(ch)) {
						cToS[ch] += COMA + p;
					} else {
						cToS[ch] = p;
					}
				}
			}
		}
	};
/* fn(SDB.m, 1);
fn(SDB.a);
SDB = null; */
export default {
	getSpell(chars, polyphone, spliter) {
		let cToS = DB.cToS;
		let res = [],
			pp = typeof(polyphone) == 'function'; //判断polyphone是否是函数
		chars = String(chars).split(EMPTY);
		for (let i = 0, ch, ss; i < chars.length; i++) {
			ch = chars[i];
			if (cToS.hasOwnProperty(ch)) {
				ss = cToS[ch];
				if (~ss.indexOf(COMA)) {
					ss = ss.split(COMA);
					ss = pp ? polyphone(ch, ss) : '[' + ss + ']';
					res.push(ss);
				} else {
					res.push(ss);
				}
			} else {
				res.push(ch);
			}
		}
		return res.join(spliter || COMA);
	},
	getChars(spell) {
		let sToC = DB.sToC;
		if (sToC.hasOwnProperty(spell)) {
			return sToC[spell].split(EMPTY);
		}
		return [];
	}
};