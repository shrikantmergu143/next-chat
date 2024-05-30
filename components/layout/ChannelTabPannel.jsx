import React from 'react'
import dynamic from 'next/dynamic'
import App_url from '../common/constant'
const Avatar = dynamic(()=>import('../common/Avatar'))
const Icon = dynamic(()=>import('../common/Icon'))
const PopOver = dynamic(()=>import('../common/PopOver'))

export default function ChannelTabPannel() {
    const Loader = () =>{
        return(
            <div className='tab_rail'>
                <div className='button-unstyled account_switcher'>
                    <div className='tabs__tab_content'></div>
                    <div className='tab-scroller'></div>
                    <div className='tabs__tab_content'></div>
                    <div className='tabs__tab_content'></div>
                </div>
            </div>
        )
    }
    // if(true){
    //     return(
    //         <Loader/>
    //     )
    // }
  return (
   <React.Suspense fallback={<Loader/>}>
     <div className='tab_rail'>
        <div className='button-unstyled account_switcher'>
            <div className='tabs__tab_content'>
                <Avatar src={App_url.icons.default_image}/>
            </div>
            <div className='tab-scroller'>
                <PopOver title={"Home"} placement={"right"}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.HomeIcon}
                            button
                            size={"lg"}
                            variant={"secondary"}
                        />
                        <div class="p-tab_rail__button__label">Home</div>
                    </div>
                </PopOver>
                <PopOver title={"Direact Messages"} placement={"right"}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.ChatIcon}
                            button
                            size={"lg"}
                            variant={"hover-secondary"}
                        />
                        <div class="p-tab_rail__button__label">DMs</div>
                    </div>
                </PopOver>
                <PopOver title={"More"} placement={"right"}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.Ellipsis}
                            button
                            size={"lg"}
                            variant={"hover-secondary"}
                        />
                        <div class="p-tab_rail__button__label">More</div>
                    </div>
                </PopOver>
                <PopOver title={"Activity"} placement={"right"}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.Notification}
                            button
                            size={"lg"}
                            variant={"hover-secondary"}
                        />
                        <div class="p-tab_rail__button__label">Activity</div>
                    </div>
                </PopOver>
                <PopOver title={"Saved Messages"} placement={"right"}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.Bookmark}
                            button
                            size={"lg"}
                            variant={"hover-secondary"}
                        />
                        <div class="p-tab_rail__button__label">Later</div>
                    </div>
                </PopOver>
            </div>
            <PopOver title={"Create New"} placement={"right"}>
                <div className='tabs__tab_content'>
                    <Icon
                        attrIcon={App_url.icons.PlusIcon}
                        button
                        size={"lg"}
                        buttonClassName={"rounded"}
                        variant={"secondary"}
                    />
                </div>
            </PopOver>
            <div className='tabs__tab_content'>
                <Icon
                    attrIcon={App_url.icons.Setting}
                    button
                    size={"lg"}
                    buttonClassName={"rounded"}
                    // variant={"secondary"}
                />
            </div>
        </div>
    </div>
   </React.Suspense>
  )
}
