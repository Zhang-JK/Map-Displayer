import React from 'react';
import { Table } from 'antd';

const columns: any = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Province',
        dataIndex: 'province',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Update Time',
        dataIndex: 'update_time',
    },
];

export function DataTable(p: any) {
    console.log(p.data)
    return (
        <Table className='m-3' columns={columns} dataSource={p.data} />
    );
}