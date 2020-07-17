import classNames from 'classnames/bind';
import React, {useContext, useEffect, useState} from 'react';
//import Dropdown from 'react-dropdown';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useHistory} from 'react-router-dom';

//import ChimeSdkWrapper from '../chime/ChimeSdkWrapper';
import routes from '../constants/routes.json';
//import getChimeContext from '../context/getChimeContext';
import getUIStateContext from '../context/getUIStateContext';
// import getLanguageContext from '../context/getLanguageContext';
import ClassMode from '../enums/ClassMode';
import RegionType from '../types/RegionType';
import styles from './CreateOrJoin.css';
import {login} from '../../api/orgClassroomInfo'
import {message} from 'antd';
import LoadingSpinner from "./LoadingSpinner";
import MeetingStatus from "../enums/MeetingStatus";


const cx = classNames.bind(styles);
export default function CreateOrJoin(this: any) {
    //const chime = useContext(getChimeContext()) as ChimeSdkWrapper;
    // const [,dispatch] = useContext(getLanguageContext());
    const [state] = useContext(getUIStateContext());
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
   // const [region, setRegion] = useState<RegionType | undefined>(undefined);
    const [region,] = useState<RegionType | undefined>({label: 'Japan (Tokyo)', value: 'ap-northeast-1'});
    const [password, setPassword] = useState('')
    const [loadstatus, setLoadstatus] = useState(MeetingStatus.Failed)
    const history = useHistory();
    const intl = useIntl();
    /*useEffect(() => {
        setRegion({label: 'Japan (Tokyo)', value: 'ap-northeast-1'});
        (async () => {
            //setRegion(await chime?.lookupClosestChimeRegion());
            if (state.classMode === ClassMode.Teacher) {
                setRegion({label: 'Japan (Tokyo)', value: 'ap-northeast-1'});
            }
        })();
    }, []);*/
    useEffect(()=>{
        /*confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            }

        })*/

    },[])


    const toast=(content:any,type?:string)=>{

        message.destroy();
        if(type&&type=='error'){
            message.error(content);
        }else if(type&&type=='success'){
            message.success(content)

        }else if(type&&type=='loadr'){
            message.info(content)
        }else {
            message.info(content)
        }

    }


    return (
        <div className={cx('createOrJoin')}>
            <div className={cx('loadingBox')}>
                {loadstatus === MeetingStatus.Loading && <div className={cx('loadingWarper')}><LoadingSpinner/></div>}
            </div>
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
                        if (title && name && password&&region) {
                            setLoadstatus(MeetingStatus.Loading)
                            login({
                                classNum: title,
                                pwd: password,
                                isTeacher: state.classMode === ClassMode.Teacher,
                                userName: name
                            }).then((response: any) => {
                                setLoadstatus(MeetingStatus.Succeeded)
                                if (response?.code == '200') {
                                    history.push(
                                        `/classroom?title=${encodeURIComponent(
                                            title
                                        )}&name=${encodeURIComponent(name)}&region=${region.value}`
                                    );
                                } else {
                                    message.error(response?.msg);
                                }
                            }, (error) => {
                                setLoadstatus(MeetingStatus.Failed)
                                console.log(error)
                                toast('登录失败','error');
                            })

                        }else {
                            setLoadstatus(MeetingStatus.Failed);
                            if(!title){
                                toast('请输入课堂编号','error');
                                return
                            }

                            if(!password){
                                toast('请输入课堂密码','error');
                                return
                            }

                            if(!name){
                                toast('请输入你的名字','error');
                                return
                            }
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
                        type={'password'}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                        placeholder={intl.formatMessage({
                            id: 'CreateOrJoin.namePassword'
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
                    {/*{state.classMode === ClassMode.Teacher && (
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
                                    console.log('--------selectedRegion-------')
                                    console.log(selectedRegion)
                                    setRegion(selectedRegion);
                                }}
                                placeholder=""
                            />
                        </div>
                    )}*/}
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

