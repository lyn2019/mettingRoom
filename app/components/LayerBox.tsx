import classNames from 'classnames/bind';
import styles from './LayerBox.css'
import React, {useEffect, useState} from 'react';

const cx = classNames.bind(styles);
type Props = {
    layerOption: {
        style?: {};
        content: string;
        confirm?: string;
        cancel?: string;
        confirmCallBack?: () => void;
        cancelCallback?: () => void;
    };
    isOPen: boolean;
}

export default function layerBox(props: Props) {
    const {layerOption, isOPen} = props;
    const [layertext,]=useState(layerOption.content)

    useEffect(() => {

    })

    return (
        <>
            {isOPen ? (
                <div className={cx('confrimBox')} style={layerOption.style}>
                    <div className={cx('content')}>
                        <span>{layertext}</span>
                    </div>
                    <div className={cx('btnBox')}>
                        {layerOption.confirm?(
                            <div className={cx('btnItem')} onClick={()=>{
                                if(layerOption.confirmCallBack)layerOption.confirmCallBack()
                            }}>
                                {layerOption.confirm}
                            </div>
                        ):null}
                        {layerOption.cancel?(
                            <div className={cx('btnItem')} onClick={()=>{
                                if(layerOption.confirmCallBack)layerOption.confirmCallBack()

                            }}>
                                {layerOption.cancel}
                            </div>
                        ):null
                        }
                    </div>
                </div>
            ) : null}
        </>
    );
}
