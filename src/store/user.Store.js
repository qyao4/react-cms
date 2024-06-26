import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    try {
      const res = await http.get('/user/profile')
      this.userInfo = res.data
    }
    catch (error) {
      console.error(error)
    }
  }
}

export default UserStore