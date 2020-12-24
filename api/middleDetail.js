import request from '@/utils/request';
export function getApacheDetail (id) {
  return request({
    url: '/apache/details?id=' + id,
    method: 'get'
  });
}
export function getNginkDetail (id) {
  return request({
    url: '/nginx/details?id=' + id,
    method: 'get'
  });
}
export function getFlumeDetail (id) {
  return request({
    url: '/flume/details?id=' + id,
    method: 'get'
  });
}
export function getRedisDetail (id) {
  return request({
    url: '/redis/details?id=' + id,
    method: 'get'
  });
}
export function getJvmDetail (id) {
  return request({
    url: '/jvm/details?id=' + id,
    method: 'get'
  });
}
export function getActiveMQDetail (id) {
  return request({
    url: '/activeMq/details?id=' + id,
    method: 'get'
  });
}
export function getIisDetail (id) {
  return request({
    url: '/iis/details?id=' + id,
    method: 'get'
  });
}
export function getFlinkDetail (id) {
  return request({
    url: '/flink/details?id=' + id,
    method: 'get'
  });
}
export function getKafkaDetail (id) {
  return request({
    url: '/kafka/details?id=' + id,
    method: 'get'
  });
}
