import React from 'react'
import Avatar from '../common/Avatar'
import App_url from '../common/constant'
import Icon from '../common/Icon'
import PopOver from '../common/PopOver'

export default function ChannelTabPannel() {
  return (
    <div className='tab_rail'>
        <div className='button-unstyled account_switcher'>
            <div className='tabs__tab_content'>
                <Avatar src={App_url.icons.default_image}/>
            </div>
            <div className='tab-scroller'>
                <PopOver>
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
                <div className='tabs__tab_content'>
                    <Icon
                        attrIcon={App_url.icons.ChatIcon}
                        button
                        size={"lg"}
                        variant={"hover-secondary"}
                    />
                    <div class="p-tab_rail__button__label">DMs</div>
                </div>
                <div className='tabs__tab_content'>
                    <Icon
                        attrIcon={App_url.icons.Ellipsis}
                        button
                        size={"lg"}
                        variant={"hover-secondary"}
                    />
                    <div class="p-tab_rail__button__label">More</div>
                </div>
                <div className='tabs__tab_content'>
                    <Icon
                        attrIcon={App_url.icons.Notification}
                        button
                        size={"lg"}
                        variant={"hover-secondary"}
                    />
                    <div class="p-tab_rail__button__label">Activity</div>
                </div>
                <div className='tabs__tab_content'>
                    <Icon
                        attrIcon={App_url.icons.Bookmark}
                        button
                        size={"lg"}
                        variant={"hover-secondary"}
                    />
                    <div class="p-tab_rail__button__label">Later</div>
                </div>
            </div>
            <div className='tabs__tab_content'>
                <Icon
                    attrIcon={App_url.icons.PlusIcon}
                    button
                    size={"lg"}
                    buttonClassName={"rounded"}
                    variant={"secondary"}
                />
            </div>
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
  )
}
