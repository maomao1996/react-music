import React from 'react'

import MenuItem from './menu-item/menu-item'

import './menu.scss'

// 抽屉菜单

const Menu = (
  <div className="menu">
    <div className="menu-title" />
    <MenuItem title="皮肤中心" path="/skin" />
  </div>
)

export default Menu
