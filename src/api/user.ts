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

export { login, sendsms, register }
