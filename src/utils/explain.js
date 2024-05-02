export const axiosConfiguration = {
  // baseURL: 'https://hccmapi.kangzhiyunyi.cn', // 正式环境环境
  baseURL: 'https://ehealth.landseed.com.tw/SmartWard/WebApi/api/webapp/', // 测试环境

  // 即时通讯api
  // signalrUrl: "https://im.kangzhiyunyi.cn", // 正式环境环境
  signalrUrl: "https://ehealth.landseed.com.tw/SmartWard/WebApi/api/webapp/", // 测试环境
}
export const getBaseUrl = function () {
  // let host = location.host;
  // if (host === "hccmn.kangzhiyunyi.cn" || host === 'testhccmn.kangzhiyunyi.cn') {
  //   // 线上环境（正式/测试）
  //   return process.env.VUE_APP_BASE_API;
  // } else {
  //   // 本地环境
  //   return axiosConfiguration.baseURL;
  // }
  return axiosConfiguration.baseURL;
}
