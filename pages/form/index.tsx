import { ErrorPage } from 'components/error.page'
import { NextPage } from 'next'
import React from 'react'

const Index: NextPage = () => {
  console.warn('Hit pages/admin/forms/index.tsx');
  return <ErrorPage />
}
export default Index
