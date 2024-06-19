import React, { useEffect } from 'react'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ChannelTabPannel from './ChannelTabPannel'
import TabContent from './TabContent'
import { useDispatch, useSelector } from 'react-redux'
import { GetRequestCallAPI } from '../api/GetRequest'
import { setStoreAccessToken, setStoreUserDetails } from '../../store/Actions'
import { useRouter } from 'next/router'

export default function Layout(props) {
  const {access_token} = useSelector(App_url.allReducers);
  const dispatch = useDispatch();
  const navigate = useRouter();
  useEffect(()=>{
    if(access_token){
      callUserDetails();
    }else{
      navigate.push(App_url.link.Login)
    }
  },[])
  const callUserDetails = async () =>{
    const response = await GetRequestCallAPI(App_url.api.API_USER_DETAILS, access_token);
    if(response?.status === 200){
      dispatch(setStoreUserDetails(response?.data))
    }else{
      dispatch(setStoreAccessToken(""))
    }
    console.log("response", response)
  }
  return (
    <div className='client_container'>
      <div className='layout_wrapper'>
        <div className='p-theme_background'></div>
        <div className='active-managed-focus-container'>
            <div className='top_nav--windows'>
                <div className='top_nav__native_ui_spacer'></div>
                <div className='p-flexpane__preview-mode-overlay hidden'></div>
                <div className='top_nav__container_wrapper'>
                    <div className='top_nav__left_container flex-basis'>
                        <div className='top_nav__left_container--start'></div>
                        <div className='top_nav__left_container--end'>
                            <div className='history_buttons'>
                                <Icon disabled button attrIcon={App_url.icons.ArrowLeft} />
                                <Icon disabled button className={"deg-180"} attrIcon={App_url.icons.ArrowLeft} />
                            </div>
                            <div className='history_menu_button'>
                          <Icon button className={""} attrIcon={App_url.icons.ClockIcon} />
                            </div>
                        </div>
                    </div>
                    <div className='top_nav__middle_container'>
                      <div className='p-top_nav__search__container'>
                        <button className='p-top_nav__search btn'>
                          <Icon className={"lsm"} attrIcon={App_url.icons.SearchIcon}/>
                          <span class="p-top_nav__search__text" id="search-text">Search...</span>
                        </button>
                      </div>
                    </div>
                    <div className='top_nav__right_container'></div>
                </div>
            </div>
        </div>
        <div className='client_workspace_wrapper'>
          <ChannelTabPannel/>
          <div className='p-client_workspace'>
            <div className='client_workspace__layout'>
              <TabContent/>
              <div className='view_contents--chat-content'>
                {props?.children}
              </div>
            </div>
            <div className='client__banners workspace_banner'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
