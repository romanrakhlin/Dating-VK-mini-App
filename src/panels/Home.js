import React, { useState, useEffect } from "react";
import { Div, Panel, Button, PanelHeaderButton, PanelHeader, Text } from "@vkontakte/vkui";
import { Swipeable, direction } from 'react-deck-swiper';
import Icon28Profile from "@vkontakte/icons/dist/28/profile";
import Icon24Like from "@vkontakte/icons/dist/24/like";
import CardButtons from '../components/CardButtons';
import Card from '../components/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = ({ id, goToNextView, snackbar, usersData, updateLike, sendNotifications, notDecidedArray, setActiveModal, openLikeSnackbar, openDislikeSnackbar, onUserData }) => {

    const [dataArray, setDataArray] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const notDecided = notDecidedArray;

    const handleOnSwipe = (swipeDirection) => {
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
        <Div className="buttons">
            <CardButtons
                right={right}
                left={left}
            />
        </Div>
    );

    const renderCard = () => {
        if(dataArray.length > 0) {
            return (
                <Swipeable
                    renderButtons={renderButtons}
                    onSwipe={(e) => {
                        handleOnSwipe(e);
                        setVisibility(false);
                    }}
                >
                    {showProgress()}
                </Swipeable>
            );
        }
        else {
            return (
                <Div className="endCard">
                    <CircularProgress />
                </Div>
            );
        }
    }

    useEffect(() => {
        // const abortController = new AbortController();
        setTimeout(() => {
            setVisibility(true);
        }, 500);
        // return () => clearTimeout(time);
    }, [dataArray.length])

    const showProgress = () => {
        if (visibility === false) {
            return (
                <Div className="endCard">
                    <CircularProgress />
                </Div>
            );
        } else if (visibility === true) {
            return (
                <Card item={dataArray[0]} />
            );
        }
    }

    useEffect(() => {
        setDataArray(state => ([ ...state, ...usersData ]));
    }, [usersData]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderButton onClick={goToNextView} data-to="show">{<Icon28Profile/>}</PanelHeaderButton>}>Познакомимся?</PanelHeader>
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
