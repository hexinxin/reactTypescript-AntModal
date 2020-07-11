import React, {ReactNode} from "react";
import ReactDOM from 'react-dom';
import Modal from "antd-mobile/lib/modal/index";
import { Action } from 'antd-mobile/lib/modal/PropsType'
export default function operation(
    actions = [{text:'知道了'}]
) {
    const stopMove = (e:any) => e.preventDefault()
    const div = document.createElement('div');
    document.body.appendChild(div);
    const close = ()=>{
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
        document.body.removeEventListener('touchmove',stopMove)
    }
    const footer = actions.map((button: Action<React.CSSProperties>) => {
        const oldPress = button.onPress || (() => {})
        button.onPress = () =>{
            const res = oldPress();
            if (res && res.then()){
                res.then(close).catch(()=>{})
            }else close()
        }
        return button;
    })
    document.body.addEventListener('touchmove',stopMove,{passive:false})
    ReactDOM.render(
        <Modal
            visible={true}
            transparent={true}
            closable={false}
            maskClosable={false}
            operation={true}
            className="am-modal-operation"
            footer={footer}
        />,
        div
    )
}