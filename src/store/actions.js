import * as types from "./actionTypes"

// 显示Player组件
export function showPlayer(showPlayer) {
  return {type: types.SHOW_PLAYER, showPlayer}
}
