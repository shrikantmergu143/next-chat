import React from 'react'
import dynamic from 'next/dynamic'
import App_url from '../common/constant'
import { setShowModal, setStoreActiveTab } from '../../store/Actions'
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
    const popOverItems = [
        {
            title: "Home",
            name: "Home",
            icon: App_url.icons.HomeIcon,
            size: "lg"
        },
        {
            title: "Direct Messages",
            name: "DMs",
            icon: App_url.icons.ChatIcon,
            size: "lg"
        },
        {
            title: "More",
            name: "More",
            icon: App_url.icons.Ellipsis,
            size: "lg"
        },
        {
            title: "Activity",
            name: "Activity",
            icon: App_url.icons.Notification,
            size: "lg"
        },
        {
            title: "Saved Messages",
            name: "Later",
            icon: App_url.icons.Bookmark,
            size: "lg"
        }
    ];
    const callSelectedTab = (e, item) =>{
        dispatch(setStoreActiveTab(item?.name))
    }
    
  return (
   <React.Suspense fallback={<Loader/>}>
     <div className='tab_rail'>
        <div className='button-unstyled account_switcher'>
            <div className='tabs__tab_content'>
                <Avatar src={App_url.icons.default_image}/>
            </div>
            <div className='tab-scroller'>
                {popOverItems.map((item, index) => (
                    <PopOver key={index} title={item.title} placement={"right"}>
                        <div className='tabs__tab_content' onClick={(e)=>callSelectedTab(e, item)}>
                            <Icon
                                attrIcon={item.icon}
                                button
                                size={item.size}
                                variant={"hover-secondary"} // Adjust as needed
                            />
                            <div className="p-tab_rail__button__label">{item.name}</div>
                        </div>
                    </PopOver>
                ))}
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
