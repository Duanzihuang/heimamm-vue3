import request from '@/utils/request'

const login = (data: any) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export { login }
