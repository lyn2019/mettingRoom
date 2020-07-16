import request from '../app/utils/http'
export function login(data:any) {
  return request({
    url: 'orgClassroomInfo/getRoleByPwd',
    method: 'get',
    params:data
  })
}