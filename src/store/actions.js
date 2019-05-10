import * as ActionTypes from './actionTypes'
import { findIndex } from 'common/util'

// 显示Player组件
export function setShowPlayer(showPlayer) {
  return { type: ActionTypes.SET_SHOW_PLAYER, showPlayer }
}

// 设置当前音乐
export function setCurrentMusic(currentMusic) {
  return { type: ActionTypes.SET_CURRENTMUSIC, currentMusic }
}

// 设置当前音乐索引
export function setCurrentIndex(currentIndex) {
  return { type: ActionTypes.SET_CURRENTINDEX, currentIndex }
}

// 设置当前播放列表
export function setPlayList(playList) {
  return { type: ActionTypes.SET_PLAYLIST, playList }
}

// 播放歌曲（替换歌单列表）
export const setAllPlay = ({ playList, currentIndex }) => dispatch => {
  dispatch(setShowPlayer(true))
  dispatch(setPlayList(playList))
  dispatch(setCurrentIndex(currentIndex))
  dispatch(setCurrentMusic(playList[currentIndex]))
}

// 播放歌曲（插入一条到播放列表）
export const addPlay = music => (dispatch, getState) => {
  let playList = [...getState().playList]
  //查询当前播放列表是否有待插入的音乐，并返回其索引
  let index = findIndex(playList, music)
  //当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引
  if (index > -1) {
    dispatch(setCurrentIndex(index))
    dispatch(setCurrentMusic(playList[index]))
  } else {
    index = playList.push(music) - 1
    dispatch(setPlayList(playList))
    dispatch(setCurrentIndex(index))
    dispatch(setCurrentMusic(playList[index]))
  }
  dispatch(setShowPlayer(true))
}
