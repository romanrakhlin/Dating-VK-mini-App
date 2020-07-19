import React, { useState } from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import { Div, Panel, Button, PanelHeader, PanelHeaderBack, Alert } from "@vkontakte/vkui";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24Repeat from "@vkontakte/icons/dist/24/repeat";
import Icon28EditOutline from "@vkontakte/icons/dist/28/edit_outline";
import TinderCard from "react-tinder-card";

const Show = ({ id, goToNextView, username, userAge, userBio, userFileUrl, showAskAlert, snackbar, onUserData }) => {

    const swiped = () => {
        console.log("Was swiped");
    }

    const outOfFrame = () => {
        console.log("Left the screen!");
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={e => {window.location.reload()}}/>}>Моя анкета</PanelHeader>
            <Div className="containerOne">
				<Button before={<Icon28EditOutline/>} size="l" onClick={goToNextView} data-to="edit">
        			Изменить
        	    </Button>
            </Div>
            <Div className="containerOne">
        		<Button before={<Icon24Repeat/>} mode="destructive" size="l" onClick={showAskAlert} data-to="create">
        			Заполнить заново
        	    </Button>
            </Div>
            <Div className="containerTwo">
                <TinderCard className="swipe" key={username} onSwipe={(dir) => swiped()} onCardLeftScreen={() => outOfFrame()} preventSwipe={["up", "down", "left", "right"]}>
                    <Div style={{ backgroundImage: "url(" + userFileUrl + ")" }} className="card">
                        <Div className="info">
                            <h3>{username}, {userAge} лет</h3>
                            <h5>{userBio}</h5>
                        </Div>
                    </Div>
                </TinderCard>
            </Div>
            {snackbar}
        </Panel>
    );
};

export default Show;
