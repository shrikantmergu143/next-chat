import React from 'react'
import Icon from '../common/Icon'
import App_url from '../common/constant'

export default function Layout() {
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
                        <button className='p-top_nav__search'>

                        </button>
                      </div>
                    </div>
                    <div className='top_nav__right_container'>
                      
                    </div>
                </div>
            </div>
        </div>
        <div className='client_workspace_wrapper'></div>
      </div>
    </div>
  )
}
