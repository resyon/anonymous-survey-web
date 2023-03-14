import React from 'react'
// import { useSettingsQuery } from '../graphql/query/settings.query'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  // const { data, loading } = useSettingsQuery()

  // if (loading || (data && data.hideContrib.value)) {
  //   return null
  // }

  return (
    <a className={scss.badge} href="https://github.com/resyon/anonymous-survey" target={'_blank'} rel={'noreferrer'}>
      <span>Anonymous Survey</span>
      <span>Fork & Support!</span>
    </a>
  )
}
