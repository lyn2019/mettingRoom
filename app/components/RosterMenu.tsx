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
    })
    // alert(visibleFlag)

    const handleClick = (type:any) => {
        //setVisibleFlag(false);
      console.log(type)
    }
   /* const handlemike = () => {
        //setVisibleFlag(false);
      alert(2)

    }
    const handleroster = () => {
       // setVisibleFlag(false);

    }*/

    return (
        <div>
            <div className={cx('rosterMenuList')}>
                {
                    rosterMenuItems &&
                    rosterMenuItems.map((rosterMenu: rosterContextmenuType) => {
                        return (
                          <div className={cx('menuItem')} onClick={()=>handleClick(rosterMenu.tpye)}>{rosterMenu.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )

}