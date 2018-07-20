import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// 抽屉菜单子组件

const MenuItem = props => {
	const { title, path } = props
	const open = function openRoute() {
		path && props.history.push({ pathname: path })
	}
	return (
		<div className="menu-item" onClick={open}>
			<p>{title}</p>
			<span />
		</div>
	)
}

MenuItem.propTypes = {
	title: PropTypes.string.isRequired,
	path: PropTypes.string
}

export default withRouter(MenuItem)
