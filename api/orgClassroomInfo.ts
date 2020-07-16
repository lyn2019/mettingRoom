import request from '../app/utils/http'
export function login(data:any) {
    return request({
        url: 'orgClassroomInfo/getRoleByPwd',
        method: 'get',
        params:data
    })
}

export function updateLeaveTime(data:any) {
    return request({
        url: 'orgClassroomInfo/updateLeaveTime',
        method: 'get',
        params:data
    })
}