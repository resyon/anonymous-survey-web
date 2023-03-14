import { Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import GitHubButton from 'react-github-button'
import { useTranslation } from 'react-i18next'
import { clearAuth, withAuth } from '../with.auth'
import scss from './footer.module.scss'

interface Props {
  me?: {
    // id: string
    // username: string
    // roles: string[]
    address: string
  }
}

const AuthFooterInner: React.FC<Props> = (props) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  // const { data, loading } = useSettingsQuery()

  const logout = () => {
    clearAuth()
    router.reload()
  }

  return (
    <footer className={scss.footer}>
      {console.log("props.me: ", props.me)}
      {props.me && props.me.address
        ? [
          <span style={{ color: '#FFF' }} key={'user'}>
              Hi, {props.me.address}
          </span>,
          // props.me.roles.includes('admin') && (
            (<Link key={'admin'} href={'/admin'}>
              <Button
                type={'link'}
                style={{
                  color: '#FFF',
                }}
              >
                {t('admin')}
              </Button>
            </Link>),
          // ),
          <Link key={'profile'} href={'/admin/profile'}>
            <Button
              type={'link'}
              style={{
                color: '#FFF',
              }}
            >
              {t('profile')}
            </Button>
          </Link>,
          <Button
            key={'logout'}
            type={'link'}
            onClick={logout}
            style={{
              color: '#FFF',
            }}
          >
            {t('logout')}
          </Button>,
        ]
        : [
          <Link href={'/login'} key={'login'}>
            <Button
              type={'link'}
              style={{
                color: '#FFF',
              }}
            >
              {t('login')}
            </Button>
          </Link>,
        ]}
      <div style={{ flex: 1 }} />

      
      {/*!loading && !data?.hideContrib.value &&*/ (
        <>
          <GitHubButton type="stargazers" namespace="resyon" repo="anonymous-survey" />
        </>
      )}
    </footer>
  )
}

export const AuthFooter = withAuth(AuthFooterInner)
