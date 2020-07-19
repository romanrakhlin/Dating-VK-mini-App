import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, Button} from '@vkontakte/vkui';
import pic4 from '../img/Board4.svg'
import '../../css/Onboarding.css'
import Icon24Notification from '@vkontakte/icons/dist/24/notification';

const Screen4 = ({ id, goToNextPanel, allowNotifications, snackbar }) => {
    return(
        <Panel id={id} className={"onboarding"}>
            <img alt="pic4" src={pic4}/>
            <p>Вас нужно оповещать если вы кому-то понравитесь?</p>
            <Button
                before={<Icon24Notification/>}
                onClick={e => {
                    allowNotifications();
                }}
                size="l"
                mode="secondary"
            >
                Разрешить
            </Button>
            <p></p>
            <Button onClick={goToNextPanel} data-to="screen5" size="l">Далее</Button>
            {snackbar}
        </Panel>
    );
}

export default Screen4;
