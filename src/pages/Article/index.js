
import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Button, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import { useStore } from '@/store'
import './index.scss'
import img404 from '@/assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

function Article () {
  const [list, setList] = useState({
    list: [],
    count: 0
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 5
  })

  const loadList = useCallback(async () => {
    const res = await http.get('/mp/articles', { params })
    console.log(res)
    const { results, total_count } = res.data
    setList({ list: results, count: total_count })
  }, [params])

  useEffect(() => {
    loadList()
  }, [loadList])

  const onFinish = (values) => {
    console.log('onFinish:', values)
    const { status, channel_id, date } = values
    const tparams = {
      ...params
    }
    if (status !== -1)
      tparams.status = status
    else
      delete tparams.status

    if (channel_id)
      tparams.channel_id = channel_id
    else
      delete tparams.channel_id

    if (date) {
      tparams.begin_pubdate = date[0].format('YYYY-MM-DD')
      tparams.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    else {
      delete tparams.begin_pubdate
      delete tparams.end_pubdate
    }
    setParams(tparams)
  }

  const delArticle = async (data) => {
    console.log('delArticle:', data)
    await http.delete(`/mp/articles/${data.id}`)
    //refresh
    setParams({
      ...params,
      page: 1
    })
  }
  const navigate = useNavigate()
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`)
  }

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="cover" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: data => <Tag color="green">Approved</Tag>
    },
    {
      title: 'Pubdate',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like',
      dataIndex: 'like_count'
    },
    {
      title: 'Operate',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delArticle(data)}
            />
          </Space>
        )
      },
      fixed: 'right'
    }
  ]
  // 频道列表管理
  // const [channelList, setChannelList] = useState([])
  // const loadChannelList = async () => {
  //   const res = await http.get('/channels')
  //   setChannelList(res.data.channels)
  // }
  // useEffect(() => {
  //   loadChannelList()
  // }, [])
  const { channelStore } = useStore()

  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>content</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: -1 }}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={-1}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Submitted</Radio>
              <Radio value={2}>Approved</Radio>
              <Radio value={3}>Rejedted</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="please select channel"
              style={{ width: 120 }}
            > {
                channelStore.channelList.map((item) => { return (<Option key={item.id} value={item.id}>{item.name}</Option>) })
              }
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>Search</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`Count:${list.count}`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list.list}
          pagination={{
            pageSize: params.per_page,
            total: list.count,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}

export default Article