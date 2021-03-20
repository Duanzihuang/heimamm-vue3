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

export { login, sendsms, register, logout, getUseInfo }
