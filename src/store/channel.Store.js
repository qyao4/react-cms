import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  getChannelList = async () => {
    try {
      if (this.channelList.length <= 0) {
        const res = await http.get('/channels')
        this.channelList = res.data.channels
      }
      else {
        console.log("getChannelList from mobx.")
      }

    }
    catch (error) {
      console.error(error)
    }
  }
}

export default ChannelStore