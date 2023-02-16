import React from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import moment from "moment";
import {GithubOutlined} from "@ant-design/icons";

const provinceData:any = [
    {
        label: "南海诸岛",
        value: '南海诸岛'
    },
    {
        label: '北京',
        value: '北京'
    },
    {
        label: '天津',
        value: '天津'
    },
    {
        label: '上海',
        value: '上海'
    },
    {
        label: '重庆',
        value: '重庆'
    },
    {
        label: '河北',
        value: '河北'
    },
    {
        label: '河南',
        value: '河南'
    },
    {
        label: '云南',
        value: '云南'
    },
    {
        label: '辽宁',
        value: '辽宁'
    },
    {
        label: '黑龙江',
        value: '黑龙江'
    },
    {
        label: '湖南',
        value: '湖南'
    },
    {
        label: '安徽',
        value: '安徽'
    },
    {
        label: '山东',
        value: '山东'
    },
    {
        label: '新疆',
        value: '新疆'
    },
    {
        label: '江苏',
        value: '江苏'
    },
    {
        label: '浙江',
        value: '浙江'
    },
    {
        label: '江西',
        value: '江西'
    },
    {
        label: '湖北',
        value: '湖北'
    },
    {
        label: '广西',
        value: '广西'
    },
    {
        label: '甘肃',
        value: '甘肃'
    },
    {
        label: '山西',
        value: '山西'
    },
    {
        label: '内蒙古',
        value: '内蒙古'
    },
    {
        label: '陕西',
        value: '陕西'
    },
    {
        label: '吉林',
        value: '吉林'
    },
    {
        label: '福建',
        value: '福建'
    },
    {
        label: '贵州',
        value: '贵州'
    },
    {
        label: '广东',
        value: '广东'
    },
    {
        label: '青海',
        value: '青海'
    },
    {
        label: '西藏',
        value: '西藏'
    },
    {
        label: '四川',
        value: '四川'
    },
    {
        label: '宁夏',
        value: '宁夏'
    },
    {
        label: '海南',
        value: '海南'
    },
    {
        label: '台湾',
        value: '台湾'
    },
    {
        label: '香港',
        value: '香港'
    },
    {
        label: '澳门',
        value: '澳门'
    }
]

interface SideBarProps {
    displayState: string;
    changeView: (view: string) => void;
    reload: () => void;
}

interface SideBarState {
    loading: boolean;
    open: boolean;
}

export class SideBar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props);
        this.state = {
            loading: false,
            open: false
        }
    }

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
        }, 3000);
    }

    handleSubmit = (v: any) => {
        v.update_time = moment().format('YYYY/MM/DD HH:mm:ss')
        if(v.city === undefined) v.city = null
        if(v.email === undefined) v.email = null
        console.log(JSON.stringify(v))
        fetch('http://laojk.club:8000/insert', {mode: 'cors', credentials: 'omit', method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(v)})
            .then(res => {
                this.setState({loading: false, open: false})
                console.log(res)
                this.props.reload()
            })
    }

    render() {
        return (
            <div className='d-flex flex-column'>
                <h1 className='m-3'>Title</h1>
                <Button className='m-3' type={"primary"} onClick={() => this.setState({open: true})}>添加信息</Button>
                <Button className='m-3'
                        onClick={() => this.props.changeView(this.props.displayState === 'T' ? 'M' : 'T')}>
                    {this.props.displayState === 'T' ? '地图显示' : '表格显示'}
                </Button>
                <div>
                    <GithubOutlined onClick={()=>window.open('https://github.com/Zhang-JK')} />
                </div>
                <Modal title="Add profile" open={this.state.open}
                       footer={null}
                       onCancel={() => this.setState({open: false})}>
                    <Form labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={this.handleSubmit}>
                        <Form.Item name="name" label="Name" rules={[{required: true}]}>
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="province" label="Province" rules={[{required: true}]}>
                            <Select options={provinceData}/>
                        </Form.Item>
                        <Form.Item name="city" label="City">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}