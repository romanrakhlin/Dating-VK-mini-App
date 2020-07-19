import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import { Panel, PanelHeader, PanelHeaderBack, Cell, Avatar, Card, FormLayoutGroup, FormLayout, Input, Select, Button, FixedLayout, Separator, Div, Textarea, File } from "@vkontakte/vkui";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import Icon24Place from "@vkontakte/icons/dist/24/place";

const Edit = ({ id, goToNextView, onFileChange, confirmLocation, username, userAge, userBio, userGeodata, updatePersonalData, showEditAlert, snackbar }) => {

	var username_input;
	var age_input;
	var bio_input;

	const [nick, setNick] = useState(username);
	const [age, setAge] = useState(userAge);
	const [bio, setBio] = useState(userBio);

	useEffect(() => {
		username_input = document.getElementById("username_input");
		age_input = document.getElementById("age_input");
		bio_input = document.getElementById("bio_input");

		username_input.value = nick;
		age_input.value = age;
		bio_input.value = bio;
		console.log(userGeodata);
	});

	const osname = platform();

	return(
		<Panel id={id} style={{overflowY: "auto"}}>
			<PanelHeader left={<PanelHeaderBack onClick={goToNextView} data-to="show"/>}>Изменить</PanelHeader>
			<Div>
				<Card mode="outline" size="m" className="Card">
					<FormLayout>
						<FormLayoutGroup top="Имя, Возраст">
							<Input type="text" placeholder="Введите имя" maxLength="15" id="username_input"/>
							<Input type="text" placeholder="Укажите возраст" maxLength="2" id="age_input"/>
	              		</FormLayoutGroup>
						<FormLayoutGroup top="О себе">
							<Input type="text" placeholder="Расскажите о себе" maxLength="40" id="bio_input"/>
	              		</FormLayoutGroup>
						<FormLayoutGroup top="Изменить мое фото">
							<File name="file" before={<Icon24Camera/>} size="xl" accept="image/*" mode="outline" onChange={onFileChange}>
	          					Измениь фото
	        				</File>
	              		</FormLayoutGroup>
						<FormLayoutGroup top="Ваше местоположение">
							<Button before={<Icon24Place/>} top="Обновить данные местоположения" mode="outline" onClick={confirmLocation}>Изменить местоположение</Button>
						</FormLayoutGroup>
						<FormLayoutGroup>
	                		<Button
				                size="xl"
				                mode="primary"
				                onClick={e => {
									if (
										username_input.value == ""
											||
										age_input.value == ""
											||
										bio_input.value == ""
									) {
										showEditAlert();
										console.log("Не все поля введены");
									} else {
			                  			setNick(username_input.value);
										setAge(age_input.value);
										setBio(bio_input.value);
		                  				updatePersonalData(username_input.value, age_input.value, bio_input.value);
									}
								}}
	                			className="ButtonSave">
								Сохранить изменения
	                		</Button>
	              		</FormLayoutGroup>
	            	</FormLayout>
	          	</Card>
				{snackbar}
			</Div>
		</Panel>
	);
}

export default Edit;
