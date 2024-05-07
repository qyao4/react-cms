// 把所有的工具函数导出的模块在这里导入
// 然后在统一导出
import { http } from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'
import {
  setNavigate,
  getNavigate
} from './navigation'

export {
  http,
  setToken,
  getToken,
  removeToken,
  setNavigate,
  getNavigate
}