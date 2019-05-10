import formatSongs from './song'

/**
 * 歌单类模型
 */
//歌单列表
export class PlayList {
  constructor({
    id,
    name,
    coverImgUrl,
    userId,
    nickname,
    trackCount,
    playCount
  }) {
    this.id = id //歌单ID
    this.name = name //歌单名称
    this.coverImgUrl = coverImgUrl //歌单封面
    this.userId = userId //歌单创建者ID
    this.nickname = nickname //歌单创建者昵称
    this.trackCount = trackCount //歌曲数量
    this.playCount = playCount //播放数
  }
}

export const createPlayList = function(playlist) {
  return new PlayList({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    userId: playlist.creator.userId,
    nickname: playlist.creator.nickname,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount
  })
}

// 歌单数据格式化
const formatPlayList = function(list) {
  let PlayList = []
  list.forEach(item => {
    if (item.id) {
      PlayList.push(createPlayList(item))
    }
  })
  return PlayList
}

export default formatPlayList

//歌单列表Min
export class PlayListMin {
  constructor({ id, name, coverImgUrl, trackCount, playCount }) {
    this.id = id //歌单ID
    this.name = name //歌单名称
    this.coverImgUrl = coverImgUrl //歌单封面
    this.trackCount = trackCount //歌曲数量
    this.playCount = playCount //播放数
  }
}

export const createPlayListMin = function(playlist) {
  return new PlayListMin({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.picUrl,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount
  })
}

export const formatPlayListMin = function(list) {
  let PlayListMin = []
  list.forEach(item => {
    if (item.id) {
      PlayListMin.push(createPlayListMin(item))
    }
  })
  return PlayListMin
}

//歌单详情
export class PlayListDetail {
  constructor({
    id,
    name,
    coverImgUrl,
    userId,
    avatarUrl,
    nickname,
    createTime,
    trackCount,
    playCount,
    shareCount,
    commentCount,
    tracks
  }) {
    this.id = id //歌单ID
    this.name = name //歌单名称
    this.coverImgUrl = coverImgUrl //歌单封面
    this.userId = userId //歌单创建者ID
    this.avatarUrl = avatarUrl //歌单创建者头像
    this.nickname = nickname //歌单创建者昵称
    this.createTime = createTime //歌单创建时间
    this.trackCount = trackCount //歌曲数量
    this.playCount = playCount //播放数
    this.shareCount = shareCount //分享数
    this.commentCount = commentCount //评论数
    this.tracks = tracks //歌曲列表
  }
}

export const createPlayListDetail = function(playlist) {
  const tracks = formatSongs(playlist.tracks)
  return new PlayListDetail({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    userId: playlist.creator.userId,
    avatarUrl: playlist.creator.avatarUrl,
    nickname: playlist.creator.nickname,
    createTime: playlist.createTime,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount,
    shareCount: playlist.shareCount,
    commentCount: playlist.commentCount,
    tracks
  })
}
