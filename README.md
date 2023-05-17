# React-Music（2018.12.27）

高仿网易云音乐安卓客户端

> API：一个开源的[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)（有 api 才有动力写！！！）

> [在线演示地址](https://reactmusic.fe-mm.com)

> [Vue PC/移动端二合一版本](https://github.com/maomao1996/Vue-mmPlayer)

> [交流 QQ 群：529940193](http://shang.qq.com/wpa/qunwpa?idkey=f8be1b627a89108ccfda9308720d2a4d0eb3306f253c5d3e8d58452e20b91129)

## 如何安装与使用

> react-music

```sh
# 下载 react-music
git clone https://github.com/maomao1996/react-music.git

# 进入 react-music 项目目录
cd react-music

# 安装依赖
npm install

# // 运行 react-music 访问 http://localhost:8163
npm run start

# // 项目编译打包
npm run build
```

> 后台服务器

[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)

```
# 下载 NeteaseCloudMusicApi
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

# 安装依赖
npm install

# 服务端运行 访问 http://localhost:3000
node app.js
```

#### 运行 react-music 后无法获取音乐请检查后台服务器是否启动

#### .env 的 REACT_APP_BASE_API_URL 地址要和后台服务器地址一致

## 技术栈

-   React（核心框架）
-   React-Router（页面路由）
-   Redux（状态管理）
-   React-Redux
-   Redux-Thunk
-   ES 6 / 7（JavaScript 语言的下一代标准）
-   Sass（CSS 预处理器）
-   Axios（网络请求）
-   ClassNames（处理动态 class ）
-   [Better-Scroll](https://ustbhuangyi.github.io/better-scroll/#/zh)（一款重点解决移动端各种滚动场景需求的插件）
-   FastClick（解决移动端 300ms 点击延迟）

## 项目布局

<details>
<summary>展开查看</summary>
<pre><code>.
├── config                                          // webpack 配置文件
├── public                                          // 项目启动页面
├── scripts                                         // 脚本工具
├── screenshots                                     // 项目截图
├── src                                             // 项目源码目录
│   ├── api                                         // 数据交互
│   │   └── index.js
│   ├── assets                                      // 静态资源目录
│   │   └── images                                     // 图片目录
│   ├── base                                        // 公共基础组件目录
│   │   ├── columnList                              // 歌单基础列表组件 —— 列
│   │   ├── drawer                                  // 抽屉组件
│   │   ├── loading                                 // loading 组件
│   │   ├── notification                            // 通知组件（Toast）
│   │   ├── progress                                // 进度条拖动组件
│   │   ├── rowList                                 // 歌单列表基础组件 —— 行
│   │   ├── scroll                                  // 滚动组件
│   │   ├── slide                                   // slide 组件
│   │   ├── songlist                                // 歌曲列表基础组件
│   │   └── toast                                   // Toast 组件
│   ├── components                                  // 公共项目组件目录
│   │   ├── menu                                    // 菜单组件
│   │   ├── mm-header                               // 一级导航组件
│   │   ├── mm-nav                                  // 二级导航组件
│   │   ├── player                                  // 播放组件
│   │   └── search-list                             // 搜索列表详情组件
│   ├── model                                       // 数据模型目录
│   ├── pages                                       // 项目主页面目录
│   │   ├── discover                                // 发现页面
│   │   ├── playlist                                // 歌单详情页面
│   │   ├── search                                  // 搜索
│   │   ├── sheetlist                               // 歌单页面
│   │   ├── skin                                    // 皮肤切换页面
│   │   ├── toplist                                 // 排行榜页面
│   │   └── App.js                                  // 根组件
│   ├── store                                       // redux 目录
│   │   ├── actions.js                              // 配置 actions 方法
│   │   ├── actionTypes.js                          // 配置 actions 常量
│   │   ├── index.js                                // 引用 redux
│   │   └── reducers.js                             // 处理数据
│   ├── styles                                      // 样式表目录
│   │   ├── index.scss                              // 基础样式
│   │   ├── mixin.scss                              // 基础样式宏
│   │   ├── playCount.scss                          // 播放数量样式宏
│   │   ├── reset.css                               // 基础重置
│   │   └── var.scss                                // 基本变量
│   ├── utils                                       // 公共 Js 目录
│   │   └── utils.js                                // 公用 Js 方法
│   ├── config.js                                   // 基础配置
│   └── index.js                                    // 入口主文件
</code></pre>
</details>

## 功能

-   播放器
-   正在播放
-   排行榜
-   歌单列表
-   歌单详情
-   搜索（歌曲、歌单）
-   皮肤切换

## 更新说明

### V1.1.1（2018.12.27）

-   修复 Banner 图片不显示问题
-   修复歌单详情打开失败问题

### V1.1.0（2018.07.24）

-   制作皮肤切换功能
-   增加 Toast 弹出层
-   优化 Scroll 组件逻辑
-   优化抽屉组件样式

### V1.0.0（2018.06.12）发布正式版

-   制作播放器功能
-   制作正在播放列表功能
-   制作排行榜功能
-   制作歌单列表功能
-   制作歌单详情功能
-   制作搜索功能（歌曲、歌单）

## License

[MIT](https://github.com/maomao1996/react-music/blob/master/LICENSE)
