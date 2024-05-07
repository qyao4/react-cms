// login module
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  getToken = async ({ mobile, code }) => {

    //调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    //存入token
    this.token = res.data.token
    // 存入local storage
    setToken(this.token)
  }
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore