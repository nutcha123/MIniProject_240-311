import { Card, Form, Input, Modal, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config/config'

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useState, useEffect } from 'react'
import loginCss from '../styles/Login.module.css'
import cardCss from '../styles/Card.module.css'

const { Meta } = Card;
const chanomBlock = (props) => {
    const allaction = bindActionCreators(allActions, useDispatch())
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chanomatUpdate, setChanomUpdate] = useState({ ...props.chanom})

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(catUpdate);
        allaction.updateChanom({ ...chanomUpdate })
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const buyChanom = async () => {
        allaction.deleteChanom(props.chanom);
    }

    const validateMessages = {
        required: '${label} is required!',
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div>
            <div>
                <div className={cardCss.content}>
                    
                    <div className={cardCss.card}>
                        <p className={cardCss.title}>
                            <p>
                                {props.cat.name} 
                                </p>
                             <p> {`${props.cat.dob}`} </p>
                            <p> {`${props.cat.sex}`} </p>
                        </p>
                        <p className={cardCss.text}>
                            <div>{props.index && !props.sell ? <Button onClick={buyCat} className={loginCss.buttonb}>Buy</Button> : !props.index && props.sell ?
                        <Button onClick={showModal} className={loginCss.buttonb}>Update</Button> : ""}</div>
                        </p>
                    </div>

                </div>
            </div>
            <div>
                <Modal title={"Update " + props.cat.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                        <Form.Item label="Name" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.name} onChange={e => setCatUpdate({ ...catUpdate, name: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Date of Birthbay" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.dob} onChange={e => setCatUpdate({ ...catUpdate, dob: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Sex" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.sex} onChange={e => setCatUpdate({ ...catUpdate, sex: e.target.value })} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default chanomBlock