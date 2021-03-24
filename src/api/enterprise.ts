import request from '@/utils/request'

const getEnterpriseList = (params: any) => {
  return request({
    url: '/enterprise/list',
    params
  })
}

const changeStatus = (data: any) => {
  return request({
    url: '/enterprise/status',
    method: 'POST',
    data
  })
}

const delEnterprise = (data: any) => {
  return request({
    url: '/enterprise/remove',
    method: 'POST',
    data
  })
}

const addEnterprise = (data: any) => {
  return request({
    url: '/enterprise/add',
    method: 'POST',
    data
  })
}

const editEnterprise = (data: any) => {
  return request({
    url: '/enterprise/edit',
    method: 'POST',
    data
  })
}

export {
  getEnterpriseList,
  changeStatus,
  delEnterprise,
  addEnterprise,
  editEnterprise
}
