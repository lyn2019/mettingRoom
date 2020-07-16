import request from '../app/utils/http'
export function updateLeaveTime(data:any) {
    return request({
        url: 'orgClassroomInfo/getRoleByPwd',
        method: 'get',
        params:data
    })
}