import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, Button } from '@vkontakte/vkui';
import pic2 from '../img/Board2.svg'
import '../../css/Onboarding.css'

const Screen2 = ({ id, goToNextPanel }) => {
    return(
        <Panel id={id} className={"onboarding"}>
            <img alt="pic2" src={pic2}/>
            <p>Просто свайпай понравившиеся тебе анкеты</p>
            <Button onClick={goToNextPanel} data-to="screen3" size="l">Далее</Button>
        </Panel>
    );
}

export default Screen2;
