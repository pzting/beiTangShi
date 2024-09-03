let baseUrl = ""
let openid = "wx29eb1ca9229c1246"

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// baseUrl = 'https://test.leduohui.hzshengmai.com'
	// baseUrl = 'https://test.hungd.qy.hzshengmai.com'
	// baseUrl = 'http://192.168.2.47:8081/'
	// baseUrl = 'https://testrps.hunancatv.com'
	// baseUrl = 'https://rps.hunancatv.com'
	baseUrl = 'http://192.168.2.67:8082/'
	// baseUrl = 'http://36.137.158.225:10000/'
	// baseUrl = 'https://sxyybbminiappapi.hzshengmai.com/'
} else {
	// 生产环境
	// baseUrl = 'http://apildh.hzshengmai.com:8899'
	baseUrl = 'https://sxyybbminiappapi.hzshengmai.com/'
}

// 图片路径
// export const staticHost = 'https://static.leduohui.hzshengmai.com/'
const staticHost = '/imgs/'
// export const staticHost = 'https://static.leduohui.hzshengmai.com/'
const pkgCode = 'HUNGD_QCK2'
const qyCodeObj = {
	'7B7vPSyy': 'card1', //爱奇艺·会员月卡
	'F48UR1yP': 'card2', //腾讯视频VIP月卡
	'gx5tgrr0': 'card3', //优酷VIP月卡
	'b2BbcpK4': 'card4', //哔哩哔哩大会员月卡
}

export {
	baseUrl,
	staticHost,
	pkgCode,
	qyCodeObj,
};