import { Alert, Button, Form, Input, message } from 'antd'
import { AuthFooter } from 'components/auth/footer'
import { AuthLayout } from 'components/auth/layout'
import { setAuth } from 'components/with.auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Omf } from '../../components/omf'
import {useEth} from '../../contexts/EthContext'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  console.log("useEth():", useEth());
  const {state: {accounts}} = useEth();
  let address:string = '';
  if(accounts == undefined){
    console.error('Invalid Login');
  }else{
    address = accounts[0];
  }

  const finish = async (data /*: LoginMutationVariables*/) => {
    setLoading(true)
    try {
      console.log('data: LoginMutationVariable :', data);

      // setAuth(result.data.tokens.access, result.data.tokens.refresh, address)
      setAuth(address)

      await message.success(t('login:welcomeBack'))

      await router.push('/admin')
    } catch (e) {
      await message.error(t('login:invalidLoginCredentials' + e))
    }

    setLoading(false)
  }

  const failed = async () => {
    await message.error(t('validation:mandatoryFieldsMissing'))
  }

  return (
    <AuthLayout loading={loading}>
      <Omf />
      <Form
        // form={form}
        name="login"
        onFinish={finish}
        // onFinishFailed={failed}
        style={{
          margin: 'auto',
          maxWidth: '95%',
          width: 400,
        }}
      >
        <div
          style={{
            display: 'block',
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 16,
          }}
        >
          <img
            style={{ maxWidth: '100%' }}
            src={require('../../assets/images/logo.png?resize&size=256')}
            alt={'Anonymous-Survey'}
          />
        </div>

        <Form.Item>
          <Button  size="large" type="primary" htmlType="submit" block>
            {t('login:loginNow')}
          </Button>
        </Form.Item>

      </Form>

      <AuthFooter />
    </AuthLayout>
  )
}

export default Index
