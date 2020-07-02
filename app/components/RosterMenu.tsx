import classNames from 'classnames/bind';
import React, {useEffect, useState} from 'react';
import styles from "./Rostercontextmenu.css";
import contextMenu from "../enums/contextMenu";

const cx = classNames.bind(styles);
type Props = {
    show: boolean;
    onclickMenu:()=>void;
    position:{x:number,y:number}
}

export default function rosterContextmenu(props: Props) {
    const {show,onclickMenu,position} = props;
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
        let eRosterMenuList=document.getElementById("rosterMenuList");
        let eRosterMenuListWarpe=eRosterMenuList?.parentNode
        console.log(positionX)
        //setPositionX(eRosterMenuListWarpe)

    })
    const handleClick = (type: any) => {
        console.log(type)
        setVisibleFlag(false)
        onclickMenu();
    }
    return (
        <div>
            {visibleFlag ? (
                <div id='rosterMenuList' className={cx('rosterMenuList')} style={{left:positionX,top:position.y+10}}>
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