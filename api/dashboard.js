import request from '@/utils/request';
// 头部设备告警列表
export function getHeadList () {
  return request({
    url: '/monitor/index/count',
    method: 'get'
  });
}
// 告警级别状态
export function getWarnStatus () {
  return request({
    url: '/monitor/index/getalarmlevel',
    method: 'get'
  });
}
// 设备告警排名
export function getRanking () {
  return request({
    url: '/monitor/index/getMealarmranking',
    method: 'get'
  });
}
// 设备完好率
export function getPipe () {
  return request({
    url: '/monitor/index/getAvailability',
    method: 'get'
  });
}
// 监控设备告警趋势
export function getTrend () {
  return request({
    url: '/monitor/index/getmealarmcurrent',
    method: 'get'
  });
}
