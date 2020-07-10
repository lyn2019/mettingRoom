import classNames from 'classnames/bind';
import styles from './LayerBox.css'
import React, {useState} from 'react';

const cx = classNames.bind(styles);
type Props = {
    layerOption: {
        content: string;
        confirm?: {
            label:string;
            callback?:()=>void
        };
        cancel?: {
            label:string;
            callback?:()=>void;
        };
    };
    isOPen: boolean;
}



export default function layerBox(props: Props) {
    const {layerOption, isOPen} = props;
    const [isOPenLayer,setIsOPenLayer]=useState(isOPen)
    const callback=()=>{
        setIsOPenLayer(false)
    }
    return (
        <>
            {isOPenLayer ? (
                <div className={cx('confrimBox')}>
                    <div className={cx('content')}>
                        <span>{layerOption.content}</span>
                    </div>
                    <div className={cx('btnBox')}>
                        {layerOption.confirm?(
                            <div className={cx('btnItem')} onClick={()=>{
                                if(layerOption.confirm?.callback)layerOption.confirm?.callback()
                                callback()
                            }}>
                                {layerOption.confirm.label}
                            </div>
                        ):null}
                        {layerOption.cancel?(
                            <div className={cx('btnItem')} onClick={()=>{
                                if(layerOption.cancel?.callback)layerOption.cancel?.callback()
                                callback()

                            }}>
                                {layerOption.cancel.label}
                            </div>
                        ):null
                        }
                    </div>
                </div>
            ) : null}
        </>
    );
}
