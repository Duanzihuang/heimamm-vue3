import request from '@/utils/request'

const login = (data: any) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

const sendsms = (data: any) => {
  return request({
    url: '/sendsms',
    method: 'POST',
    data
  })
}

const register = (data: any) => {
  return request({
    url: '/register',
    method: 'POST',
    data
  })
}

const getUseInfo = () => {
  return request({
    url: '/info'
  })
}

const logout = () => {
  return request({
    url: 'logout'
  })
}

const getUserList = (params: any) => {
  return request({
    url: '/user/list',
    params
  })
}

const changeStatus = (data: any) => {
  return request({
    url: '/user/status',
    method: 'POST',
    data
  })
}

const delUser = (data: any) => {
  return request({
    url: '/user/remove',
    method: 'POST',
    data
  })
}

const addUser = (data: any) => {
  return request({
    url: '/user/add',
    method: 'POST',
    data
  })
}

const editUser = (data: any) => {
  return request({
    url: '/user/edit',
    method: 'POST',
    data
  })
}

export {
  login,
  sendsms,
  register,
  logout,
  getUseInfo,
  getUserList,
  changeStatus,
  delUser,
  addUser,
  editUser
}
