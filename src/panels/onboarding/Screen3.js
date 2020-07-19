import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, Button} from '@vkontakte/vkui';
import pic3 from '../img/Board3.svg'
import '../../css/Onboarding.css'
import Icon24Place from '@vkontakte/icons/dist/24/place';

const Screen3 = ({ id, goToNextPanel, confirmLocation, cancelLocation, showLocationAlert, snackbar }) => {
    return(
        <Panel id={id} className={"onboarding"}>
            <img alt="pic3" src={pic3}/>
            <p>В каком городе вы находитесь?</p>
            <Button before={<Icon24Place/>} onClick={confirmLocation} size="l" mode="secondary">Поделиться местоположением</Button>
            <p></p>
            <Button
                onClick={e => {
                    if (cancelLocation == true) {
                        showLocationAlert();
                    } else {
                        goToNextPanel(e);
                    }
                }}
                data-to="screen4"
                size="l">Далее
            </Button>
            {snackbar}
        </Panel>
    );
}

export default Screen3;
