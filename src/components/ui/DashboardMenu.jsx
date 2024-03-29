import { Menu } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const { SubMenu, Item } = Menu

export const DashboardMenu = ({ items, collapse }) => {
  const location = useLocation()
  const brkPnt = useBreakpoint()
  const path = `/${location.pathname.split('/')[1]}`

  const renderItems = (item) =>
    item.submenu ? (
      <SubMenu key={item.key} icon={item.icon} title={item.title}>
        {item.submenu.map(renderItems)}
      </SubMenu>
    ) : (
      <Item key={item.path} onClick={!brkPnt.lg && collapse}>
        <Link to={item.path}>{item.title}</Link>
      </Item>
    )

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
      {items.map(renderItems)}
    </Menu>
  )
}

DashboardMenu.propTypes = {
  items: PropTypes.array.isRequired,
  collapse: PropTypes.func.isRequired,
}
