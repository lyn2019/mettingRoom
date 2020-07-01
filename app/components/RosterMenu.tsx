import classNames from 'classnames/bind';
import React, {useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import styles from "./Rostercontextmenu.css";
import rosterContextmenuType from '../types/RosterContentmenuType'

const cx = classNames.bind(styles);

export default function rosterContextmenu(props: { rosterMenuItems: any[]; }) {
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

    return (
        <div>
            <div className={cx('rosterMenuList')}>
                {
                    rosterMenuItems &&
                    rosterMenuItems.map((rosterMenu: rosterContextmenuType, index) => {
                        return (
                            <>
                                {
                                    rosterMenu.tpye == 'camera' && <div key={index} className={cx('menuItem')}
                                                                        onClick={handlecamera}>{rosterMenu.name}</div>
                                }
                                {
                                    rosterMenu.tpye == 'mike' && <div key={index} className={cx('menuItem')}
                                                                      onClick={handlemike}>{rosterMenu.name}</div>
                                }
                                {
                                    rosterMenu.tpye == 'roster' && <div key={index} className={cx('menuItem')}
                                                                        onClick={handleroster}>{rosterMenu.name}</div>
                                }

                            </>
                        )
                    })
                }
            </div>
        </div>
    )

}