import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

// 路由懒加载
import { lazy, Suspense } from 'react'
// import Login from '@/pages/login'
// import MainLayout from '@/pages/layout'
// import Home from '@/pages/Home'
// import Article from '@/pages/Article'
// import Publish from '@/pages/Publish'


import { AuthComponent } from '@/components/AuthComponent'
import './App.css'
import { setNavigate } from '@/utils'

const Login = lazy(() => import('@/pages/login'))
const MainLayout = lazy(() => import('@/pages/layout'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

// import { Button, Space, DatePicker, version } from 'antd'

// 这里定义的SetNavigator组件一定要是BrowserRouter的子组建
// 这样才能保证useNavigate钩子函数可以被使用
const SetNavigator = () => {
  const navigate = useNavigate()
  setNavigate(navigate)
  return null // 或者返回任何不影响视图的组件
}

function App () {

  return (
    <BrowserRouter>
      <SetNavigator />
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            {/* Layout需要鉴权处理 */}
            <Route path='/' element={<AuthComponent><MainLayout /></AuthComponent>}>
              <Route index element={<Home />}></Route>
              <Route path='/article' element={<Article />}></Route>
              <Route path='/publish' element={<Publish />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>

  )
}

export default App
