import React, { useEffect } from "react";
import { Panel, PanelHeader, Card, FormLayoutGroup, FormLayout, Input, Select, Button, Div, File } from "@vkontakte/vkui";
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import Icon28ChecksOutline from "@vkontakte/icons/dist/28/checks_outline";

const Create = ({ id, goToNextView, onFileChange, savePersonalData, showCreateAlert, showPhotoAlert, cancelPhoto, snackbar }) => {

	var username_input;
	var age_input;
	var bio_input;
	var sex_select;
    var look_sex_select;

	useEffect(() => {
		username_input = document.getElementById("username_input");
		age_input = document.getElementById("age_input");
		bio_input = document.getElementById("bio_input");
		sex_select = document.getElementById("sex_select");
        look_sex_select = document.getElementById("look_sex_select");
	});

	return(
		<Panel id={id} style={{overflowY: "auto"}}>
			<PanelHeader>Создать</PanelHeader>
			<Div>
				<Card mode="outline" size="m" className="Card">
					<FormLayout>
						<FormLayoutGroup top="Имя, Возраст">
							<Input type="text" placeholder="Введите имя" maxLength="15" id="username_input"/>
							<Input type="text" placeholder="Укажите возраст" maxLength="2" id="age_input"/>
	              		</FormLayoutGroup>
						<Select top="Укажите ваш пол" placeholder="Ваш пол" id="sex_select">
              				<option value="male">Мужской</option>
              				<option value="female">Женский</option>
            			</Select>
						<Select top="Кого вы ищите?" placeholder="Кого вы ищите?" id="look_sex_select">
              				<option value="male">Парня</option>
              				<option value="female">Девушку</option>
            			</Select>
						<FormLayoutGroup top="Расскажите о себе">
							<Input type="text" placeholder="О себе" maxLength="40" id="bio_input"/>
	              		</FormLayoutGroup>
						<FormLayoutGroup top="Загрузите ваше фото">
	        				<File name="file" before={<Icon24Camera/>} size="xl" accept="image/*" mode="outline" onChange={onFileChange}>
	          					Загрузить фото
	        				</File>
						</FormLayoutGroup>
						<FormLayoutGroup>
	                		<Button
								before={<Icon28ChecksOutline/>}
				                size="xl"
				                mode="primary"
				                onClick={e => {
									if (
										username_input.value === ""
											||
										age_input.value === ""
											||
										bio_input.value === ""
											||
										sex_select.value === ""
											||
										look_sex_select.value === ""
									) {
										showCreateAlert();
										console.log("Не все поля введены");
									} else if (cancelPhoto === true) {
										showPhotoAlert();
									} else {
										savePersonalData(username_input.value, age_input.value, bio_input.value, sex_select.value, look_sex_select.value);
									}
								}}
	                			className="ButtonSave"
							>
								Сохранить изменения
	                		</Button>
							<h5></h5>
	              		</FormLayoutGroup>
	            	</FormLayout>
	          	</Card>
				{snackbar}
			</Div>
		</Panel>
	);
}

export default Create;
