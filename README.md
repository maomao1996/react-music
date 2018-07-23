# React-Music（2018.07.24）发布 1.1.0 版

> API：一个开源的[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)（有api才有动力写！！！）

> [在线演示地址](http://reactmusic.mtnhao.com)

> [桌面版下载](http://cdn.mtnhao.com/mmPlayer.zip)

> [Vue PC/移动端二合一版本](https://github.com/maomao1996/Vue-mmPlayer)

> [交流QQ群：529940193](http://shang.qq.com/wpa/qunwpa?idkey=f8be1b627a89108ccfda9308720d2a4d0eb3306f253c5d3e8d58452e20b91129)

## 如何安装与使用

```
git clone https://github.com/maomao1996/react-music.git  //下载react-music

cd react-music //进入react-music播放器目录

yarn //安装依赖

yarn start //服务端运行

yarn build  //项目打包
```

> 后台服务器

```
cd react-music/server //进入后台服务器目录

yarn //安装依赖

node app.js //服务端运行 访问 http://localhost:3000
```

#### 运行react-music后无法获取音乐请检查后台服务器是否启动
#### common/config.js的url地址要和后台服务器地址一致

## 技术栈

- React（核心框架）
- React-Router（页面路由）
- Redux（状态管理）
- React-Redux
- Redux-Thunk
- ES 6 / 7（JavaScript 语言的下一代标准）
- Sass（CSS预处理器）
- Axios（网络请求）
- ClassNames（处理动态 clss ）
- [Better-Scroll](https://ustbhuangyi.github.io/better-scroll/#/zh)（一款重点解决移动端各种滚动场景需求的插件）
- FastClick（解决移动端300ms点击延迟）

## 项目布局

```
├── config                                          // webpack 配置文件
├── public                                          // 项目启动页面
├── scripts                                         // 脚本工具
├── screenshots                                     // 项目截图
├── server                                          // 后台服务器目录
├── src                                             // 项目源码目录
│   ├── api                                         // 数据交互
│   │   └── index.js
│   ├── assets                                      // 静态资源目录
│   │   ├── css                                     // 样式表目录
│   │   │   ├── index.scss                          // 基础样式
│   │   │   ├── mixin.scss                          // 基础样式宏
│   │   │   ├── playCount.scss                      // 播放数量样式宏
│   │   │   ├── reset.css                           // 基础重置
│   │   │   └── var.scss                            // 基本变量
│   │   └── img                                     // 图片目录
│   ├── base                                        // 公共基础组件目录
│   │   ├── columnList                              // 歌单基础列表组件 —— 列
│   │   │   ├── columnList.js
│   │   │   └── columnList.scss
│   │   ├── drawer                                  // 抽屉组件
│   │   │   ├── drawer.js
│   │   │   └── drawer.scss
│   │   ├── loading                                 // loading 组件
│   │   │   ├── loading.js
│   │   │   └── loading.scss
│   │   ├── notification                            // 通知组件（Toast）
│   │   │   ├── notification.js
│   │   │   └── notification.scss
│   │   ├── progress                                // 进度条拖动组件
│   │   │   ├── progress.js
│   │   │   └── progress.scss
│   │   ├── rowList                                 // 歌单列表基础组件 —— 行
│   │   │   ├── rowList.js
│   │   │   └── rowList.scss
│   │   ├── scroll                                  // 滚动组件
│   │   │   ├── scroll.js
│   │   │   └── scroll.scss
│   │   ├── slide                                   // slide 组件
│   │   │   ├── slide.js
│   │   │   └── slide.scss
│   │   ├── songlist                                // 歌曲列表基础组件
│   │   │    ├── songlist.js
│   │   │    └── songlist.scss
│   │   └── toast                                   // Toast 组件
│   │        ├── toast.js
│   │        └── toast.scss
│   ├── common                                      // 公共 Js 目录
│   │   ├── asyncComponent.js                       // 路由懒加载配置
│   │   ├── config.js                               // 基础配置
│   │   └── util.js                                 // 公用 Js 方法
│   ├── components                                  // 公共项目组件目录
│   │   ├── menu                                    // 菜单组件
│   │   │   ├── menu-item                           // 菜单 Item 组件
│   │   │   │   └── menu-item.js
│   │   │   ├── menu.js
│   │   │   └── menu.scss
│   │   ├── mm-header                               // 一级导航组件
│   │   │   ├── mm-header.js
│   │   │   └── mm-header.scss
│   │   ├── mm-nav                                  // 二级导航组件
│   │   │   ├── mm-nav.js
│   │   │   └── mm-nav.scss
│   │   ├── player                                  // 播放组件
│   │   │   ├── player.js
│   │   │   └── player.scss
│   │   ├── search-list                             // 搜索列表详情组件
│   │        ├── search-list.js
│   │        └── search-list.scss
│   ├── model                                       // 数据模型目录
│   ├── pages                                       // 项目主页面目录
│   │   ├── discover                                // 发现页面
│   │   │   ├── discover.js
│   │   │   └── discover.scss
│   │   ├── playlist                                // 歌单详情页面
│   │   │   ├── playlist.js
│   │   │   └── playlist.scss
│   │   ├── search                                  // 搜索
│   │   │   ├── search.js
│   │   │   └── search.scss
│   │   ├── sheetlist                               // 歌单页面
│   │   │   ├── sheetlist.js
│   │   │   └── sheetlist.scss
│   │   ├── skin                                    // 皮肤切换页面
│   │   │   ├── skin.js
│   │   │   └── skin.scss
│   │   ├── toplist                                 // 排行榜页面
│   │   │   ├── toplist.js
│   │   │   └── toplist.scss
│   │   └── App.js                                  // 根组件
│   ├── store                                       // redux 目录
│   │   ├── actions.js                              // 配置 actions 方法
│   │   ├── actionTypes.js                          // 配置 actions 常量
│   │   ├── index.js                                // 引用 redux
│   │   └── reducers.js                             // 处理数据
│   └── index.js                                    // 入口主文件
```

## 功能

- 播放器
- 正在播放
- 排行榜
- 歌单列表
- 歌单详情
- 搜索（歌曲、歌单）
- 皮肤切换

## 更新说明

###  V1.1.0（2018.07.24）发布正式版

- 制作皮肤切换功能
- 增加 Toast 弹出层
- 优化 Scroll 组件逻辑
- 优化抽屉组件样式

###  V1.0.0（2018.06.12）发布正式版

- 制作播放器功能
- 制作正在播放列表功能
- 制作排行榜功能
- 制作歌单列表功能
- 制作歌单详情功能
- 制作搜索功能（歌曲、歌单）

## License

[MIT](https://github.com/maomao1996/react-music/blob/master/LICENSE)
