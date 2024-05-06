export const axiosConfiguration = {
  // baseURL: 'https://hccmapi.kangzhiyunyi.cn', // 正式环境环境
  baseURL: 'https://cd4b-125-227-252-163.ngrok-free.app/SmartWard/WebApi', // 测试环境

  // 即时通讯api
  signalrUrl: "https://cd4b-125-227-252-163.ngrok-free.app/SmartWard/SignalRWebApp/signalrhub", // 测试环境
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
