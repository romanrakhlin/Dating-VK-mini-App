import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, Button } from '@vkontakte/vkui';
import pic1 from '../img/Board1.svg'
import '../../css/Onboarding.css'

const Screen1 = ({ id, goToNextPanel, createPersonalData }) => {
    return (
        <Panel id={id} className={"onboarding"}>
            <img alt="pic1" src={pic1}/>
            <p>Это приложение поможет тебе найти пару</p>
            <Button
                onClick={e => {
                    createPersonalData();
                    goToNextPanel(e);
                }}
                data-to="screen2"
                size="l"
            >
                Далее
            </Button>
        </Panel>
    );
}

export default Screen1;
