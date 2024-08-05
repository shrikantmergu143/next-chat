import React from 'react'
import dynamic from 'next/dynamic'
import App_url from '../common/constant'
import { setShowModal } from '../../store/Actions'
import { useDispatch } from 'react-redux'
const DropButton = dynamic(()=>import('../common/DropButton'))
const Avatar = dynamic(()=>import('../common/Avatar'))
const Icon = dynamic(()=>import('../common/Icon'))
const PopOver = dynamic(()=>import('../common/PopOver'))

export default function ChannelTabPannel(props) {
    const dispatch = useDispatch();
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
                <DropButton onSelect={props?.onSelect} placement={"top-end"} buttonClassName={"p-0 hover-none"} option={props?.optionsChannel}>
                    <div className='tabs__tab_content'>
                        <Icon
                            attrIcon={App_url.icons.PlusIcon}
                            button
                            size={"lg"}
                            buttonClassName={"rounded"}
                            variant={"secondary"}
                        />
                    </div>
            </DropButton>
            <div className='tabs__tab_content'>
                <Icon
                    attrIcon={App_url.icons.Setting}
                    button
                    size={"lg"}
                    buttonClassName={"rounded"}
                />
            </div>
        </div>
    </div>
   </React.Suspense>
  )
}
