import request from '@/utils/request'

const getStatistics = () => {
  return request({
    url: '/data/statistics',
    method: 'POST'
  })
}

const getTitle = () => {
  return request({
    url: '/data/title',
    method: 'POST'
  })
}

export { getTitle, getStatistics }
