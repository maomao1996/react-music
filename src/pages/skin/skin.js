import React, { Component } from 'react'

import MmNav from 'components/mm-nav/mm-nav'
import Toast from 'base/toast/toast'

import './skin.scss'

// 皮肤切换

class Skin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [
				{
					name: '网易红',
					key: 'neteaseSkin',
					value: '#e5473c'
				},
				{
					name: '企鹅绿',
					key: 'qqSkin',
					value: '#31c27c'
				},
				{
					name: '酷狗蓝',
					key: 'kuGouSkin',
					value: '#0c8ed9'
				},
				{
					name: '虾米橙',
					key: 'xiaMiSkin',
					value: '#f60'
				},
				{
					name: '炫酷黑',
					key: 'xuanKuSkin',
					value: '#222'
				},
				{
					name: '可爱粉',
					key: 'keAiSkin',
					value: '#ff87b4'
				},
				{
					name: '土豪金',
					key: 'tuHaoSkin',
					value: '#faac62'
				}
			]
		}
	}

	// 修改主题
	toggleSkin = data => {
		const elm = document.documentElement
		elm.style.setProperty('--USER-THEME-COLOR', data)
		Toast.show('皮肤修改成功', 1000, false)
	}

	render() {
		const { list } = this.state
		return (
			<div className="mm-wrapper skin">
				<MmNav title="皮肤中心" />
				<div className="mm-content">
					{list.map(item => (
						<div
							className="skin-item"
							key={item.key}
							style={{ backgroundColor: item.value }}
							onClick={() => this.toggleSkin(item.value)}
						>
							{item.name}
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Skin
