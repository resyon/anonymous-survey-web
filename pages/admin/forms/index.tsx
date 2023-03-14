import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from '@ant-design/icons/lib'
import { Button, message, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { ColumnsType } from 'antd/lib/table/interface'
import { DateTime } from 'components/date.time'
import { FormIsLive } from 'components/form/admin/is.live'
import Structure from 'components/structure'
import { TimeAgo } from 'components/time.ago'
import { withAuth } from 'components/with.auth'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from '../../../components/use.window.size'
import { FormPagerFragment } from '../../../graphql/fragment/form.pager.fragment'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [entries, setEntries] = useState<FormPagerFragment[]>()

  // //TODO: extract forms from ETH
  const {data} = JSON.parse(`{"data":{"pager":{"entries":[],"total":0,"limit":25,"start":0,"__typename":"FormPager"}}}`);
  console.log('form:data=', data);
   const loading = false;
   const error = null;
  // const { loading, refetch, error } = useFormPagerQuery({
  //   variables: {
  //     limit: pagination.pageSize,
  //     start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
  //   },
  //   onCompleted: ({ pager }) => {
  //     setPagination({
  //       ...pagination,
  //       total: pager.total,
  //     })
  //     setEntries(pager.entries)
  //   },
  // })
  // const [executeDelete] = useFormDeleteMutation()

  const deleteForm = async (id: string) => {
    // try {
    //   await executeDelete({
    //     variables: {
    //       id,
    //     },
    //   })
    //   const next = entries.filter((entry) => entry.id !== id)
    //   if (next.length === 0) {
    //     setPagination({ ...pagination, current: 1 })
    //   } else {
    //     setEntries(next)
    //   }

    //   await message.success(t('form:deleted'))
    // } catch (e) {
    //   await message.error(t('form:deleteError'))
    // }
    //TODO: just delete this function
    alert('delete')
  }

  const columns: ColumnsType<FormPagerFragment> = [
    {
      title: t('form:row.isLive'),
      dataIndex: 'isLive',
      render(live: boolean) {
        return <FormIsLive isLive={live} />
      },
      responsive: ['md'],
    },
    {
      title: t('form:row.title'),
      dataIndex: 'title',
    },
    {
      title: t('form:row.admin'),
      dataIndex: 'admin',
      render(_, { admin: user }) {
        if (!user) {
          return <Tag color={'red'} title={t('form:row.adminMissing')} />
        }

        return (
          <Tooltip title={user.email}>
            <Link href={`/admin/users/${user.id}`} passHref>
              <Button type={'dashed'}>{user.username}</Button>
            </Link>
          </Tooltip>
        )
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.language'),
      dataIndex: 'language',
      render(lang: string) {
        return t(`language:${lang}`)
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.created'),
      dataIndex: 'created',
      render(date: string) {
        return <DateTime date={date} />
      },
      responsive: ['lg'],
    },
    {
      title: t('form:row.lastModified'),
      dataIndex: 'lastModified',
      render(date: string) {
        return <TimeAgo date={date} />
      },
      responsive: ['md'],
    },
    {
      title: t('form:row.menu'),
      align: 'right',
      render(_, row) {
        return (
          <Space direction={width < 600 ? 'vertical' : 'horizontal'}>
            <Tooltip title={'Show Submissions'}>
              <Link href={`/admin/forms/${row.id}/submissions`} passHref>
                <Button>
                  <UnorderedListOutlined />
                </Button>
              </Link>
            </Tooltip>

            <Link href={`/admin/forms/${row.id}`} passHref>
              <Button type={'primary'}>
                <EditOutlined />
              </Button>
            </Link>

            <Popconfirm
              title={t('form:confirmDelete')}
              onConfirm={() => deleteForm(row.id)}
              okText={t('form:deleteNow')}
              okButtonProps={{ danger: true }}
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>

            {row.isLive && (
              <Button href={`/form/${row.id}`} target={'_blank'}>
                <GlobalOutlined />
              </Button>
            )}

            {!row.isLive && (
              <Tooltip title={'Not Public accessible!'} placement={'left'}>
                <Button href={`/form/${row.id}`} target={'_blank'}>
                  <WarningOutlined />
                </Button>
              </Tooltip>
            )}


          </Space>
        )
      },
    },
  ]

  return (
    <Structure
      title={t('admin:forms')}
      selected={'forms'}
      loading={loading}
      breadcrumbs={[{ href: '/admin', name: t('admin:home') }]}
      padded={false}
      extra={[
        <Link key={'create'} href={'/admin/forms/create'}>
          <Button type={'primary'}>{t('form:new')}</Button>
        </Link>,
      ]}
      error={error?.message}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        onChange={async (next) => {
          setPagination(next)
          // await refetch()
          //TODO: implements this feature
          alert('ReFetch');
        }}
      />
    </Structure>
  )
}

export default withAuth(Index)
