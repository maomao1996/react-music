import axios from '@/utils/axios'
import { defaultLimit } from '@/config'

axios.interceptors.response.use(response => {
  //欺骗自己的loading动画
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(response)
  //   }, 300)
  // })
  return response
})

//获取轮播
export function getBanner() {
  return axios.get('/banner')
}

//获取推荐歌单
export function getPersonalized() {
  return axios.get('/personalized')
}

//获取用户歌单详情
export function getUserPlaylist(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

//获取排行榜（完整版）
export function getTopListDetail() {
  return axios.get('/toplist/detail')
}

//获取歌单 ( 网友精选碟 )
export function getTopPlaylist(page = 0, limit = defaultLimit, order = 'hot') {
  return axios.get('/top/playlist', {
    params: {
      offset: page * limit,
      order,
      limit
    }
  })
}

//获取歌单详情
export function getPlaylistDetail(id) {
  return axios.get('/playlist/detail', {
    params: {
      id
    }
  })
}

// 搜索
export function search(keywords, type = 1, page = 0, limit = defaultLimit) {
  return axios.get('/search', {
    params: {
      offset: page * limit,
      type,
      limit,
      keywords
    }
  })
}

//热搜
export function searchHot() {
  return axios.get('/search/hot')
}

//获取歌曲详情
export function getMusicDetail(ids) {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}
