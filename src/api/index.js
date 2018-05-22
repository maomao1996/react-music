import axios from 'axios'
import {URL, defaultLimit} from 'common/config'

axios.interceptors.response.use(response => {
  //欺骗自己的loading动画
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(response)
  //   }, 300)
  // })
  return response
});

//获取轮播
export function getBanner() {
  const url = `${URL}/banner`;
  return axios.get(url)
}

//获取推荐歌单
export function getPersonalized() {
  const url = `${URL}/personalized`;
  return axios.get(url)
}

//获取用户歌单详情
export function getUserPlaylist(uid) {
  const url = `${URL}/user/playlist`;
  return axios.get(url, {
    params: {
      uid
    }
  })
}

//获取排行榜（完整版）
export function getTopListDetail() {
  const url = `${URL}/toplist/detail`;
  return axios.get(url)
}

//获取歌单详情
export function getPlayListDetail(id) {
  const url = `${URL}/toplist/detail/mm`;
  return axios.get(url, {
    params: {
      id
    }
  })
}
