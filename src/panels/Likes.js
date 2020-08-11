import React from "react";
import { Panel, PanelHeader, PanelHeaderBack, Avatar, Group, RichCell, Button } from "@vkontakte/vkui";
import Icon28Profile from "@vkontakte/icons/dist/28/profile";
import "../css/Likes.css";

const Likes = ({ id, likedYou, updateStatus, sendMessage, sendNotifications }) => {

    let likedYouArray = likedYou;

    async function likeAction(userId) {
        await sendNotifications("У вас Мэтч с кем-то", userId);
        await updateStatus(userId, true);
    }

    async function dislikeAction(userId) {
        await updateStatus(userId, false);
    }

    function makeURL(str) {
        var url = [str.slice(0, -4), "b", str.slice(-4)].join("");;
        return url;
    }

	return(
		<Panel id={id} style={{overflowY: "auto"}}>
			<PanelHeader left={<PanelHeaderBack onClick={e => {window.location.reload()}}/>}>Мои лайки</PanelHeader>
            {likedYouArray.length === 0 ?
                <p className={"clear"}>Пусто</p>
            :
                <Group>
                    {likedYouArray.map((user) =>
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar size={72} src={makeURL(user.image)}/>}
                            text={user.bio}
                            caption={(user.status === false ? "Вы не подошли друг другу" : null)}
                            after={user.age + " лет"}
                            actions={(

                            user.status === "none" ?

                            <React.Fragment>
                                <Button size="l" mode="commerce" onClick={e => {likeAction(user.id)}}>
                                    Нравится
                                </Button>
                                <Button size="l" mode="destructive" onClick={e => {dislikeAction(user.id)}}>
                                    Отклонить
                                </Button>
                            </React.Fragment>

                                : user.status === true ?

                            <React.Fragment>
                                <Button before={<Icon28Profile/>} size="l" mode="outline" href={"https://vk.com/id" + user.id}>
                                    Перейти в профиль
                                </Button>
                            </React.Fragment>

                                :

                            null
                        )}
                    >
                        {user.username}
                    </RichCell>
                )}
            </Group>
        }
        </Panel>
	);
}

export default Likes;
