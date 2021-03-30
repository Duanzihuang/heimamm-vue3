import request from '@/utils/request'

const getQuestionList = (params: any) => {
  return request({
    url: '/question/list',
    params
  })
}

const changeStatus = (data: any) => {
  return request({
    url: '/question/status',
    method: 'POST',
    data
  })
}

const delQuestion = (data: any) => {
  return request({
    url: '/question/remove',
    method: 'POST',
    data
  })
}

const addQuestion = (data: any) => {
  return request({
    url: '/question/add',
    method: 'POST',
    data
  })
}

const editQuestion = (data: any) => {
  return request({
    url: '/question/edit',
    method: 'POST',
    data
  })
}

export { getQuestionList, changeStatus, delQuestion, addQuestion, editQuestion }
