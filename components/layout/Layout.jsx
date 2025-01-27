import React, { useEffect } from 'react'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ChannelTabPanel from './ChannelTabPanel'
import TabContent from './Tabs/TabContent'
import { useDispatch, useSelector } from 'react-redux'
import { GetRequestCallAPI } from '../api/GetRequest'
import { setShowModal, setStoreAccessToken, setStoreTheme, setStoreUserDetails } from '../../store/Actions'
import { useRouter } from 'next/router'

export default function Layout(props) {
  const {access_token, theme} = useSelector(App_url.allReducers);
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
      dispatch(setStoreUserDetails(response?.data?.data))
    }else{
    }
  }
  const option = [
    {title:"Add Friend", value:"add_friend"},
  ]
  const onSelect = (item) =>{
      if(item?.value == "add_friend"){
          dispatch(setShowModal({
              show:"CREATE_FRIEND",
          }))
      }
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
          <ChannelTabPanel optionsChannel={option} onSelect={onSelect}/>
          <div className='p-client_workspace'>
            <div className='client_workspace__layout'>
              <TabContent optionsChannel={option} onSelect={onSelect}/>
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
