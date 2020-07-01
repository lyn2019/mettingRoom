import classNames from 'classnames/bind';
import React, {useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import styles from "./Rostercontextmenu.css";
import rosterContextmenuType from '../types/RosterContentmenuType'

const cx = classNames.bind(styles);

export default function rosterContextmenu(props: { rosterMenuItems: any[];}) {
    const intl = useIntl();
    const rosterMenuItems = props.rosterMenuItems;
    const [visibleFlag, setVisibleFlag] = useState(false)
    useEffect(() => {
        setVisibleFlag(props.visible)
    })
   // alert(visibleFlag)

    const handlecamera = () => {
        setVisibleFlag(false);
    }
    const handlemike = () => {
        setVisibleFlag(false);

    }
    const handleroster = () => {
        setVisibleFlag(false);

    }
    const handleline = () => {

    }
    let loadItem = (menu: rosterContextmenuType) => {
        let menuItem
        if (menu.tpye == 'camera') {
            menuItem = <div className={cx('menuItem')} onClick={handlecamera}>{menu.name}</div>
        } else if (menu.tpye == 'mike') {
            menuItem = <div className={cx('menuItem')} onClick={handlemike}>{menu.name}</div>
        } else if (menu.tpye == 'roster') {
            menuItem = <div className={cx('menuItem')} onClick={handleroster}>{menu.name}</div>
        } else if (menu.tpye == 'line') {
            menuItem = <div className={cx('menuItem')} onClick={handleline}>{menu.name}</div>
        }
        //alert(menu)
        return menuItem
    }

    return (
        <div>
            <div className={cx('rosterMenuList')}>
                {
                    rosterMenuItems &&
                    rosterMenuItems.map((rosterMenu: rosterContextmenuType, index) => {
                        return (
                            <div key={index} className={cx('menuItem')} onClick={() => {
                                setVisibleFlag(false);
                                alert(visibleFlag)
                            }}>{rosterMenu.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )

}