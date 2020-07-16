import request from '../app/utils/http'
export function addChat(data:any) {
    return request({
        url: 'orgClassroomChat/add',
        method: 'post',
        params:data
    })
}

