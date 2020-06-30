import request from '../app/utils/http'
export function login(data:any) {
  return request({
    url: 'http://localhost:8801/login?password=' + data.password + '&username=' + data.username,
    method: 'get',
    data
  })
}