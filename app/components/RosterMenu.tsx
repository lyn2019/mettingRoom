import classNames from 'classnames/bind';
import React, {useEffect, useState,useContext} from 'react';
import ChimeSdkWrapper from '../chime/ChimeSdkWrapper';


import styles from "./Rostercontextmenu.css";
import contextMenu from "../enums/contextMenu";
import getChimeContext from "../context/getChimeContext";
import DeviceControDirect from "../enums/DeviceControDirect";

const cx = classNames.bind(styles);
type Props = {
    show: boolean;
    onclickMenu:()=>void;
    position:{x:number,y:number,w:number};
    attendeeId:string
}

export default function rosterContextmenu(props: Props) {
    const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
    const {show,onclickMenu,position,attendeeId} = props;
    const [visibleFlag, setVisibleFlag] = useState(show)
    const [positionX, setPositionX] = useState(0)


    const contextMenuList = [
        { type: contextMenu.camera, name: '开启学生摄像头', value: '0', icon: 'fa-video-slash'},
        { type: contextMenu.mike, name: '开启学生麦克风', value: '0', icon: 'fa-microphone'},
        { type: contextMenu.roster, name: '请他离开', value: '0', icon: 'fa-user-times'},
        { type: 'closeMenu', name: '关闭', value: '0', icon: ''},
    ]
    const rosterMenuItems = contextMenuList;
    useEffect(() => {
        setVisibleFlag(show);
        let menuItemW=document.getElementById("rosterMenuList")?.offsetWidth||0;
        let warperW=position.w
        if(warperW-position.x>=menuItemW){
            setPositionX(position.x)
        }else {
            setPositionX(warperW-menuItemW-30)
        }

    })

    const sendDevice=(type:string)=>{
        chime?.sendMessage(type, {
            attendeeId,
        });
    }
    const handleClick = (type: any) => {
        console.log(type)
        switch (type) {
            case contextMenu.camera:
                sendDevice(DeviceControDirect.trunoncemera)
                break;
            case contextMenu.mike:
                sendDevice(DeviceControDirect.trunoffaudio)
                break;
            case contextMenu.roster:
                sendDevice(DeviceControDirect.leaveroom)
                break;
        }
        setVisibleFlag(false)
        onclickMenu();
    }
    return (
        <div>
            {visibleFlag ? (
                <div id='rosterMenuList' className={cx('rosterMenuList')} style={{left:positionX,top:position.y+15}}>
                    {
                        rosterMenuItems &&
                        rosterMenuItems.map((rosterMenu: any) => {
                            return (
                                <div className={cx('menuItem')} key={rosterMenu.type}
                                     onClick={() => handleClick(rosterMenu.type)}>
                                    <span className={cx('icon')}><i className={'fas ' + rosterMenu.icon}/></span>
                                    {rosterMenu.name}
                                </div>
                            )
                        })
                    }
                </div>
            ) : null}
        </div>
    )

}