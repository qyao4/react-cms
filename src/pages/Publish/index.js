import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Input, Upload, Select, Radio, Space, Button, message } from 'antd'
import { useStore } from '@/store'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useState, useRef, useEffect, useCallback } from 'react'
import { http } from '@/utils'

const { Option } = Select

function Publish () {
  const navigate = useNavigate()
  const { channelStore } = useStore()
  //存放上传图片的列表
  const [fileList, setFileList] = useState([])
  const onUploadChange = ({ fileList }) => {
    console.log('onUploadChange:', fileList)
    const flist = fileList.map(file => {
      if (file.response)
        return { url: file.response.data.url }
      else
        return file
    })
    setFileList(flist)
    // 同时把图片列表存储仓库一份
    cacheImgList.current = fileList
  }

  // 使用useRef声明一个暂存仓库
  const cacheImgList = useRef()

  //切换图片
  const [imgCount, setImageCount] = useState(1)
  const radioChange = (e) => {
    console.log('radioChange:', e)
    setImageCount(e.target.value)
    // 从仓库里面去对应的图片，交给用来渲染图片列表的fileList
    if (cacheImgList.current) {
      if (e.target.value === 1)
        setFileList([cacheImgList.current[0]])
      else
        setFileList(cacheImgList.current)
    }
  }
  const onFinish = async (values) => {
    console.log('onFinish:', values)
    // 数据二次处理，重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }
    console.log('params:', params)
    if (id)
      await http.put(`/mp/articles/${id}?draft=false`, params)
    else
      await http.post('/mp/articles?draft=false', params)

    navigate('/article')
    message.success(`${id ? 'Update Sucessful' : 'Publish successful'}.`)

  }

  //适配文案
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log('route:', id)

  const form = useRef(null)
  const loadData = useCallback(async () => {
    if (id) {
      const res = await http.get(`/mp/articles/${id}`)
      console.log('res:', res)
      console.log('form.current:', form.current)
      const data = res.data
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      const flist = data.cover.images.map(url => { return { url } })
      setFileList(flist)
      cacheImgList.current = flist

    }
  }, [id])

  //数据回填 1. 表单回填  2. 暂存列表 3.Upload组件fileList
  useEffect(() => {
    loadData()
  }, [loadData])


  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{!id ? 'Publish' : 'Edit'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          ref={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            type: 1,
            content: 'this is content'
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'please input title' }]}
          >
            <Input placeholder="please input title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: 'please select channel' }]}>
            <Select placeholder="select channel" style={{ width: 400 }}>
              {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>Single</Radio>
                <Radio value={3}>Triple</Radio>
                <Radio value={0}>None</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 &&
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                </div>
              </Upload>
            }
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'please input content' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 16 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {!id ? 'Publish' : 'Update'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish