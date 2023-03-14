import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingPage } from './loading.page'
import { useEth } from 'contexts/EthContext'


export const clearAuth = (): void => {
  localStorage.removeItem('address')
}

export const setAuth = (address: string): void => {
  localStorage.setItem('address', address)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const withAuth = (Component: any, optional?: boolean): React.FC => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [access, setAccess] = useState(false)
    // const { loading, data, error } = {error:null, data:{me:{id:"GVkRjB",roles:["user","admin","superuser"],username:"admin",__typename:"Profile"}}, loading:false};
    const {state} = useEth();
    console.log("state: ", state);

    useEffect(() => {
      // console.info("roles: ", roles);

      if(state && state.accounts && state.accounts[0] === localStorage.getItem('address')) {
        setAccess(true)
        return
      }
      setAccess(false)

      localStorage.clear()
      const path = router.asPath || router.pathname
      localStorage.setItem('redirect', path)

      router.push('/login').catch((e: Error) => console.error('failed to redirect to login', e))
    }, [state])

    // useEffect(() => {
    //   if (!data || roles.length === 0) {
    //     setAccess(true)
    //     return
    //   }

    //   const next = roles.map((role) => data.me.roles.includes(role)).filter((p) => p).length > 0

    //   setAccess(next)

    //   if (!next) {
    //     router.push('/').catch((e: Error) => console.error('failed to redirect to /', e))
    //   }
    // }, [data])

    // if (!optional) {
      // if (loading) {
      //   return <LoadingPage message={t('loadingCredentials')} />
      // }

    //   if (!access) {
    //     return <LoadingPage message={t('checkingCredentials')} />
    //   }
    // }

    return <Component me={state.accounts && state.accounts[0]} {...props} />
  }
}
