import React from 'react'
import {
  Avatar,
  Card,
  Layout,
  Popover,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  SwitcherOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'

const Trigger = styled.div`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    color: #003a8c;
  }
`

export const DashboardHeader = ({ collapsed, toggle }) => {
  const {
    user: { nombre, apellido, email, roles },
  } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const closeSession = () => {
    dispatch(startLogout())
  }

  const content = (
    <Card
      actions={[
        <Tooltip title="Ir a reportes (en mantenimiento)">
          <SwitcherOutlined key="changue" className="cursor-not-allowed" />
        </Tooltip>,
        <Tooltip title="Cerrar sesión">
          <LogoutOutlined key="logout" onClick={closeSession} />
        </Tooltip>,
      ]}
    >
      <Space size={2} direction="vertical" align="center">
        <Avatar className="bg-red-400 my-2 flex items-center" size={60}>
          <div className="text-4xl ">{nombre.charAt(0).toUpperCase()}</div>
        </Avatar>
        <Typography.Text className="text-sm">{`${nombre} ${apellido}`}</Typography.Text>
        <Typography.Text className="text-xs" type="secondary">
          {email}
        </Typography.Text>
        <Space size="small" className="mt-3 ">
          {roles.map((rol) => (
            <Tag key={rol.id} color="geekblue">
              {rol.nombre}
            </Tag>
          ))}
        </Space>
      </Space>
    </Card>
  )

  return (
    <Layout.Header
      className="bg-white p-0 flex items-center justify-between shadow-sm"
      style={{ position: 'sticky', top: 0, zIndex: 3, width: '100%' }}
    >
      <Trigger onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Trigger>

      <Popover
        overlayClassName="popover-nopadding"
        className="mx-6"
        content={content}
        placement="bottomRight"
        trigger="click"
      >
        <Avatar
          className="cursor-pointer bg-red-400 align-middle"
          size="default"
        >
          {nombre.charAt(0).toUpperCase()}
        </Avatar>
      </Popover>
    </Layout.Header>
  )
}

DashboardHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}
