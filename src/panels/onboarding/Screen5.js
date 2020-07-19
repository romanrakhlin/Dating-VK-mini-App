import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, Button} from '@vkontakte/vkui';
import pic5 from '../img/Board5.svg'
import '../../css/Onboarding.css'

const Screen5 = ({ id, goToNextView }) => {
    return(
        <Panel id={id} className={"onboarding"}>
            <img alt="pic5" src={pic5}/>
            <p>Перейти к созданию анкеты</p>
            <Button onClick={goToNextView} data-to="create" size="l">Создать анкету</Button>
        </Panel>
    );
}

export default Screen5;
