const http = uni.$u.http

// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

export const loginApi = (params = {}, config = {}) => http.post('/api/app/mini/login', params, config)
export const infoApi = (params = {}) => http.post('/api/app/mini/info', params)
export const phoneApi = (params = {}) => http.post('/api/app/mini/phone', params);
export const briefingDayApi = (params = {}) => http.post('/wx/report/briefing/day', params);


export const briefingWeekApi = (params = {}) => http.post('/wx/report/briefing/week', params);

export const briefingMonthApi = (params = {}) => http.post('/wx/report/briefing/month', params);


// 微信信息 
export const miniInfoApi = (params = {}) => http.post('/api/app/mini/info', params)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/ebapi/public_api/index', data)