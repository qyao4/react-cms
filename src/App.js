import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from '@/pages/login'
import MainLayout from '@/pages/layout'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

import { AuthComponent } from '@/components/AuthComponent'
import './App.css'
import { setNavigate } from '@/utils'
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
        <Routes>
          {/* Layout需要鉴权处理 */}
          <Route path='/' element={<AuthComponent><MainLayout /></AuthComponent>}>
            <Route index element={<Home />}></Route>
            <Route path='/article' element={<Article />}></Route>
            <Route path='/publish' element={<Publish />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
