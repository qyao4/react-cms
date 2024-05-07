import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

function MainLayout () {
  // const location = useLocation()
  // console.log('location', location)
  const { pathname } = useLocation()
  console.log('pathname:', pathname)
  const { userStore, loginStore, channelStore } = useStore()
  const navigage = useNavigate()
  console.log('userStore,', userStore)

  useEffect(() => {
    userStore.getUserInfo()
    channelStore.getChannelList()
  }, [userStore, channelStore])

  const onConfirm = () => {
    // 退出登录
    // 1.删除token
    // 2.跳转到登录页面
    loginStore.loginOut()
    navigage('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className='user-info'>
          <span className='user-name'>{userStore.userInfo.name}</span>
          <span className='user-logout'>
            <Popconfirm
              onConfirm={onConfirm}
              title="Are you sure to leave?" okText="Exit" cancelText="Cancel">
              <LogoutOutlined />Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={pathname}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">Article</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">Publish</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-conent" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default observer(MainLayout)