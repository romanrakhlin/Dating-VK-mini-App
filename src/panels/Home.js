import React, { useState, useEffect } from "react";
import { Div, Panel, Button, PanelHeaderButton, PanelHeader, Text } from "@vkontakte/vkui";
import { Swipeable, direction } from 'react-deck-swiper';
import Icon28Profile from "@vkontakte/icons/dist/28/profile";
import Icon24Like from "@vkontakte/icons/dist/24/like";
import CardButtons from '../components/CardButtons';
import Card from '../components/Card';

const Home = ({ id, goToNextView, snackbar, usersData, updateLike, sendNotifications, notDecidedArray, setActiveModal, openLikeSnackbar, openDislikeSnackbar, onUserData }) => {

    const [dataArray, setDataArray] = useState([]);
    const notDecided = notDecidedArray;

    const handleOnSwipe = (swipeDirection, id) => {
        if (swipeDirection === direction.RIGHT) {
            updateLike(id);
            sendNotifications("Вы кому-то понравились", id);
            openLikeSnackbar();
        }
        if (swipeDirection === direction.LEFT) {
            openDislikeSnackbar();
        }
        setDataArray((prev) => prev.slice(1));
    };

    const renderButtons = ({ right, left }) => (
        <CardButtons
            right={right}
            left={left}
        />
    );

    const renderCard = () => {
        console.log("length", dataArray);
        if(dataArray.length > 0) {
            return (
                <Swipeable
                    renderButtons={renderButtons}
                    onSwipe={handleOnSwipe}
                    onSwipe={(dir) => handleOnSwipe(dir, dataArray[0].id)}
                >
                    <Card item={dataArray[0]} />
                </Swipeable>
            );
        }
        else {
            return (
                <Div className="endCard">
                    <Div className="theEnd">
                        <p className="blackLabel">Мы стараемся подобрать подходящие анкеты</p>
                        <p className="grayLabel">Задайдите через пару минут</p>
                        <Div className="svg">
                            <img src="https://image.flaticon.com/icons/svg/132/132244.svg" alt=""/>
                        </Div>
                    </Div>
                </Div>
            )
        }
    }

    useEffect(() => {
        setDataArray(state => ([ ...state, ...usersData ]));
        console.log('DataArray', dataArray);
    }, [usersData]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderButton onClick={goToNextView} data-to="show">{<Icon28Profile/>}</PanelHeaderButton>}>Шпили Вилли</PanelHeader>
            <Div className="containerOne">
                <Button before={<Icon24Like/>} size="l" onClick={notDecided.length == 0 ? null : goToNextView} data-to="likes">
                    {notDecided.length == 0 ? "(0)" : "(" + notDecided.length + ")"}
                </Button>
            </Div>
            <Div className="containerTwo">
                <Div className="swipe">
                    {renderCard()}
                </Div>
            </Div>
            {snackbar}
        </Panel>
    );
};

export default Home;
