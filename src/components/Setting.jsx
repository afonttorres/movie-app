import { useState } from 'react'
import '../components/setting.css'

export const Setting = (props) => {

    const [setting, setSetting] = useState(props.setting.content);



    return (
        <div className='setting-row line'>
            <div style={{ width: '75%', alignItems: 'flex-start' }} className="setting-col line">
                <p style={{ paddingLeft: '5%' }} className="font setting-font">{setting}</p>
            </div>
            <div style={{ width: '25%', alignItems: 'flex-end' }} className="setting-col line">
                <span style={{ paddingRight: '15%' }} className="font setting-font"><i className="fa-solid fa-angle-right"></i></span>
            </div>
        </div>
    )
}