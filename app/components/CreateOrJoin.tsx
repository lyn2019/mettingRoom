import classNames from 'classnames/bind';
import React, {useContext, useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useHistory} from 'react-router-dom';

import ChimeSdkWrapper from '../chime/ChimeSdkWrapper';
import routes from '../constants/routes.json';
import getChimeContext from '../context/getChimeContext';
import getUIStateContext from '../context/getUIStateContext';
// import getLanguageContext from '../context/getLanguageContext';
import ClassMode from '../enums/ClassMode';
import RegionType from '../types/RegionType';
import styles from './CreateOrJoin.css';
// import {login} from '../../api/user'
const cx = classNames.bind(styles);



export default function CreateOrJoin(this:any) {
    const chime = useContext(getChimeContext()) as ChimeSdkWrapper;
    // const [,dispatch] = useContext(getLanguageContext());
    const [state] = useContext(getUIStateContext());
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [region, setRegion] = useState<RegionType | undefined>(undefined);
    const history = useHistory();
    const intl = useIntl();


    useEffect(() => {
        (async () => {

            setRegion(await chime?.lookupClosestChimeRegion());

        })();
    }, []);


    return (
        <div className={cx('createOrJoin')}>
            <div className={cx('formWrapper')}>
                <h1 className={cx('title')}>
                    {state.classMode === ClassMode.Teacher ? (
                        <FormattedMessage id="CreateOrJoin.teacherTitle"/>
                    ) : (
                        <FormattedMessage id="CreateOrJoin.studentTitle"/>
                    )}
                </h1>
                <form
                    className={cx('form')}
                    onSubmit={event => {
                        event.preventDefault();
                        if (title && name && region) {
                            /*login({}).then((response:any)=>{
                                console.log(response)

                            })*/
                            history.push(
                              `/classroom?title=${encodeURIComponent(
                                title
                              )}&name=${encodeURIComponent(name)}&region=${region.value}`
                            );
                        }
                    }}
                >
                    <input
                        className={cx('titleInput')}
                        onChange={event => {
                            setTitle(event.target.value);
                        }}
                        placeholder={intl.formatMessage({
                            id: 'CreateOrJoin.titlePlaceholder'
                        })}
                    />
                    <input
                        className={cx('nameInput')}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                        placeholder={intl.formatMessage({
                            id: 'CreateOrJoin.namePlaceholder'
                        })}
                    />
                    {state.classMode === ClassMode.Teacher && (
                        <div className={cx('regionsList')}>
                            <Dropdown
                                className={cx('dropdown')}
                                controlClassName={cx('control')}
                                placeholderClassName={cx('placeholder')}
                                menuClassName={cx('menu')}
                                arrowClassName={cx('arrow')}
                                value={region}
                                options={
                                    region ? chime?.supportedChimeRegions : ([] as RegionType[])
                                }
                                disabled={!region}
                                onChange={(selectedRegion: RegionType) => {
                                    setRegion(selectedRegion);
                                }}
                                placeholder=""
                            />
                        </div>
                    )}
                    {/*<div className={cx('regionsList')}>
                        <Dropdown
                            className={cx('dropdown')}
                            controlClassName={cx('control')}
                            placeholderClassName={cx('placeholder')}
                            menuClassName={cx('menu')}
                            arrowClassName={cx('arrow')}
                            options={
                                [
                                    {value: 'en', label: 'Englist'},
                                    {value: 'cn', label: '中文（简体'},
                                    {value: 'jp', label: '日本語'},
                                ]
                            }
                            onChange={(data) => {
                                //setLang(data.value);
                                dispatch({type:'SET_LANGUAGE',lang:data.value})
                            }}
                            placeholder={intl.formatMessage({
                                id: 'CreateOrJoin.chooseLanguage'
                            })}
                        />
                    </div>*/}
                    <button className={cx('button')} type="submit">
                        <FormattedMessage id="CreateOrJoin.continueButton"/>
                    </button>
                </form>
                <Link className={cx('loginLink')} to={routes.LOGIN}>
                    {state.classMode === ClassMode.Teacher ? (
                        <FormattedMessage id="CreateOrJoin.notTeacherLink"/>
                    ) : (
                        <FormattedMessage id="CreateOrJoin.notStudentLink"/>
                    )}
                </Link>
            </div>
        </div>
    );
}

