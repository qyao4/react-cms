import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()

  // 246810
  async function onFinish (values) {
    console.log('onFinish:', values)
    try {
      await loginStore.getToken({
        mobile: values.username,
        code: values.password
      })
      // 跳转到首页
      navigate('/', { replace: true })
      message.success('login successful.')
    }
    catch (error) {
      console.error(error)
      message.error('login failed。')
    }
  }

  function onFinishFailed (errorInfo) {
    console.log('onFinishFailed:', errorInfo)
  }

  return (
    <div className='login'>
      <Card className="login-container">
        <img className='login-logo' src={logo} alt="logo" />
        {/* login form */}
        <Form
          validateTrigger={['onBlur']}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'please input username'
              },
              {
                pattern: /^1[356789]\d{9}$/,
                message: 'invalid username',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="please input username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'please input password'
              },
              {
                min: 6,
                message: 'Please enter at least six digits.',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="please input password" />
          </Form.Item>
          <Form.Item className='login-items'
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              I have read and agree to the [Terms of Use]
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default observer(Login)