import request from '@/utils/request'

const getSubjectList = (params: any) => {
  return request({
    url: '/subject/list',
    params
  })
}

const changeStatus = (data: any) => {
  return request({
    url: '/subject/status',
    method: 'POST',
    data
  })
}

const delSubject = (data: any) => {
  return request({
    url: '/subject/remove',
    method: 'POST',
    data
  })
}

const addSubject = (data: any) => {
  return request({
    url: '/subject/add',
    method: 'POST',
    data
  })
}

const editSubject = (data: any) => {
  return request({
    url: '/subject/edit',
    method: 'POST',
    data
  })
}

export { getSubjectList, changeStatus, delSubject, addSubject, editSubject }
