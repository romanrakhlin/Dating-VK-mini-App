import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner"
import { View, Root, Alert, Avatar, Snackbar, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, Div, Button, Group, RichCell } from "@vkontakte/vkui";
import Icon16Done from "@vkontakte/icons/dist/16/done";
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import Icon24Place from "@vkontakte/icons/dist/24/place";
import Icon24NotificationCheckOutline from "@vkontakte/icons/dist/24/notification_check_outline";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Repeat from "@vkontakte/icons/dist/24/repeat";
import Icon28EditOutline from "@vkontakte/icons/dist/28/edit_outline";
import Icon16CheckCircleOutline from '@vkontakte/icons/dist/16/check_circle_outline';
import Icon16CancelCircleOutline from '@vkontakte/icons/dist/16/cancel_circle_outline';
import "@vkontakte/vkui/dist/vkui.css";
import "./css/Home.css";

// Имтортируем модуль для работы с Firebase
import firebase from "./firebase";

// Импортируем все Панели
import Screen1 from "./panels/onboarding/Screen1";
import Screen2 from "./panels/onboarding/Screen2";
import Screen3 from "./panels/onboarding/Screen3";
import Screen4 from "./panels/onboarding/Screen4";
import Screen5 from "./panels/onboarding/Screen5";
import Home from "./panels/Home";
import Edit from "./panels/Edit";
import Create from "./panels/Create";
import Show from "./panels/Show";
import Likes from "./panels/Likes";

// Нужна для помощи с POST запросом
const axios = require("axios");

// Создвем экземпляр БД Firestore
const db = firebase.firestore();

// Создаем путь до коллекции. Так будет легче потом
const usersRef = db.collection("users");

const App = () => {

	// Основные константы
	const [activeView, setActiveView] = useState("home");
	const [activePanel, setActivePanel] = useState("screen1");
	const [fetchedUser, setUser] = useState({
		id: 0,
	    first_name: "",
	    last_name: "",
	    sex: 0,
	    city: {
		    id: 0,
		    title: ""
	    },
	    country: {
		    id: 0,
		    title: ""
	    },
	    photo_100: "",
	    photo_max_orig: "",
	    photo_200: "",
	    timezone: 0,
    });

	const [popout, setPopout] = useState(null);
	const [snackbarIsActive, setSnackbarIsActive] = useState(false)
	const [snackbar, setSnackbar] = useState(null);

	// Константы для сохранения и задачи значений Пользователя
	const [id, setId] = useState(null);
	const [username, setUsername] = useState(null);
	const [userAge, setUserAge] = useState(null);
	const [userBio, setUserBio] = useState(null);
	const [userSex, setUserSex] = useState(null);
	const [userLookSex, setUserLookSex] = useState(null);
	const [userFileUrl, setUserFileUrl] = useState(null);
	const [lat, setLat] = useState(0.0);
	const [long, setLong] = useState(0.0);

	// Для проверки наличия данных в БД
	const [cancelLocation, setCancelLocation] = useState(true);
	const [cancelPhoto, setCancelPhoto] = useState(true);

	// Массивы для хранения Id и Данных всех юзеров в БД
	const [usersData, setUsersData] = useState([]);
	const [likedYou, setLikedYou] = useState([]);
	const [notDecidedArray, setNotDecidedArray] = useState([]);

	useEffect(() => {
		// Theme changer
		bridge.subscribe(({ detail: { type, data }}) => {
    		if (type === "VKWebAppUpdateConfig") {
        		const schemeAttribute = document.createAttribute("scheme");
        		schemeAttribute.value = data.scheme ? data.scheme : "bright_light";
        		document.body.attributes.setNamedItem(schemeAttribute);
    		}
		});

		// Функция для получения данных о пользователе
		async function fetchData() {
			const user = await bridge.send("VKWebAppGetUserInfo");

			// Присваиваем данные в константу fetchedUser
			setUser({...user});
    	}

		// Вызываем функцию
		fetchData();
	}, []);

	useEffect(() => {
		onUserData();
	}, [fetchedUser])

	// Установка голубого цыета Snackbar
	const blueBackground = {
    	backgroundColor: "var(--accent)"
  	};

	// Метод для проверки если ли Юзер в БД
	async function onUserData() {
		console.log('onUserData')
		setPopout(<ScreenSpinner size="large"/>);
		if (fetchedUser) {
			await usersRef.doc("id" + fetchedUser.id).get().then(function(doc) {
				// Если есть
				if (doc.exists) {
					setId(doc.data().id);
					setUsername(doc.data().username);
					setUserAge(doc.data().age);
					setUserBio(doc.data().bio);
					setUserSex(doc.data().sex);
					setUserLookSex(doc.data().look_sex);
					setUserFileUrl(doc.data().image);
					setLat(doc.data().lat);
					setLong(doc.data().long);

					// Вызываем метод для Получения и Сортировки всех пользователей
					getAllUsers();
					setPopout(null);
					setActiveView("home");
				// Если нету
				} else {
					console.log("User does not exist");
					setPopout(null);
					setActiveView("onboarding");
				}
			});
		}
	}

	// Метод для получения всех юзеров в БД
    async function getAllUsers() {
		if (fetchedUser) {

			const dataArray = [];
			const youLikedArray = [];
			const likedYouArray = [];
			const notDecided = [];

			let age = "";
			let lookSex = "";
			let userId = 0;

			// Кладем в массив youLikedArray тех юзеров, которых лайкнул текущий юзер
			await usersRef.doc("id" + fetchedUser.id).collection("you_liked").get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					youLikedArray.push(doc.data().id);
				});
			});

			// Кладем в массив likedYouArray тех юзеров, которых лайкнул текущий юзер
			await usersRef.doc("id" + fetchedUser.id).collection("liked_you").get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					if (doc.data().status == "none") {
						notDecided.push(doc.data());
					}
					likedYouArray.push(doc.data());
				});
			});

			// Берем Возраст и Пол текущего юзера
			await usersRef.doc("id" + fetchedUser.id).get().then(function(doc) {
				let userAge = doc.data().age;
				let sex = doc.data().look_sex;
				let id = doc.data().id;
				age = userAge;
				lookSex = sex;
				userId = id;
			});

			// Получаем предалагаемых юзеров и берем только тех, у кого соответствуют параметры
			const snapshot = await usersRef.where("age", "==", age).where("sex", "==", lookSex).get();
			snapshot.forEach(doc => {
				if (youLikedArray.includes(doc.data().id)) {
					return;
				} else {
					// Проверка нужна чтобы убрать карточку самого себя
					if (doc.data().id == userId) {
						return;
					} else {
						let distance = sortAllUsers(lat, long, doc.data().lat, doc.data().long);

						// Когда в прилоежниее будет больше человек
							// if (distance <= 50) {
							// }

						// Пока что отображаем всех пользователей
						dataArray.push(doc.data());
					}
				}
			});

			// Задаем каждому пользователю парамент distance для дальнейшего расположения в массиве по удаленности
			for (let i = 0; i < dataArray.length; i++) {
	   			let distance = sortAllUsers(lat, long, dataArray[i].lat, dataArray[i].long);
	   			dataArray[i].distance = Math.round(distance);
			}

			// Располагаем в массиве сначала юзеров по удаленности
			await dataArray.sort(function(a, b) {
	   			return b.distance - a.distance
			});

			// Перемешиваем наш массив
			shuffle(dataArray);


			// Передаем в готовые массивы
			setUsersData(dataArray);
			setLikedYou(likedYouArray);
			setNotDecidedArray(notDecided);
		}
    }

	// Функция для перемешки массива
	function shuffle(a) {
	    for (let i = a.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [a[i], a[j]] = [a[j], a[i]];
	    }
	    return a;
	}

	// Метод для сортировки всех юзеров в БД
	function sortAllUsers(lat1, lon1, lat2, lon2) {
		var R = 6371; // Радиус всех Земли в км
		var dLat = deg2rad(lat2-lat1);
		var dLon = deg2rad(lon2-lon1);
		var a =
			Math.sin(dLat/2) * Math.sin(dLat/2) +
		   	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c; // Дистанция в км
		return d;  // Возврашщаем дистанцию
	}

	// Помошник для метода выше
	function deg2rad(deg) {
   		return deg * (Math.PI/180)
	}

	// Метод для загрузки самых первых данных
	const createPersonalData = () => {
		setPopout(<ScreenSpinner size="large"/>);
		if (fetchedUser) {
			usersRef.doc("id" + fetchedUser.id).set({
				id: fetchedUser.id,
				username: "",
				age: 0,
				bio: "",
				sex: "",
				look_sex: "",
				image: "",
				lat: lat,
				long: long
			});
		}
		setPopout(null);
		setActivePanel("screen2");
	};

	// Метод для сохранения переданных данных
	const savePersonalData = (username, age, bio, sex, look_sex) => {
		if (fetchedUser) {

			let int = parseInt(age, 10);

			if (int === parseInt(int, 10)) {
				usersRef.doc("id" + fetchedUser.id).update({
					username: username,
					age: age,
					bio: bio,
					sex: sex,
					look_sex: look_sex
				})

				setPopout(null);
				onUserData();
				openCreateSnackbar();
			} else {
    			showAgeAlert();
				return;
			}
		}
	};

	// Метод для обновления переданных данных
	const updatePersonalData = (username, age, bio) => {
		if (fetchedUser) {
			setPopout(<ScreenSpinner size="large"/>);
			usersRef.doc("id" + fetchedUser.id).update({
				username: username,
				age: age,
				bio: bio
			});

			setPopout(null);
			onUserData();
			openEditSnackbar();
		}
	};

	// Функция срабатывающая после лайка анкеты на Главном экране
	async function updateLike(currentId) {
		if (fetchedUser) {
			// Задаем пустые данные пользователю которого лайкнули, пльзователя который лайкнул
			await usersRef.doc("id" + fetchedUser.id).get().then(function(doc) {
				usersRef.doc("id" + currentId).collection("liked_you").doc("id" + fetchedUser.id).set({
					id: fetchedUser.id,
					username: doc.data().username,
					bio: doc.data().bio,
					age: doc.data().age,
					image: doc.data().image,
					status: "none"
				});

				// Задаем пользователю который этого пользователя в коллекцию you_liked чтобы больше его не показывать
				usersRef.doc("id" + fetchedUser.id).collection("you_liked").doc("id" + currentId).set({
					id: currentId
				});
			});
		}
	}

	// Функция срабатывающая полсе лайка/дизлайка на икране Мои лайки
	async function updateStatus(currentId, bool) {
		if (fetchedUser) {
			// Обновлкение status у пользоватлея который оценил на экране Мои лайки
			await usersRef.doc("id" + fetchedUser.id).collection("liked_you").doc("id" + currentId).update({
				status: bool
			});

			// Перезагружаем экран
			window.location.reload();
		}
	}

	// Метод для преобразовывания картинрки в ссылку с помощью imgur.com
	const onFileChange = async (e) => {
		if (fetchedUser) {
			setPopout(<ScreenSpinner size="large"/>);
			const imageFile = e.target.files[0];

			try {
				const formData  = new FormData();
				formData.append("image", imageFile);
				const response = await axios.post("https://api.imgur.com/3/image", formData, {
					headers: {
	        			authorization: `Client-ID 5a82e97932baa7c`
	      			}
				});
				const result = Object.assign({ success: true, url: response.data.data.link });
				if (fetchedUser) {
					usersRef.doc("id" + fetchedUser.id).update({
						image: result.url
					});
					setCancelPhoto(false);
					setPopout(null);
					openPhotoSnackbar();
				}
			} catch (error) {
	    		const result = Object.assign({ success: false, message: error.message, imageFile });
				console.log("Error");
				setCancelPhoto(true);
				setPopout(null);
	  		}
		}
	};

	// Метод для вызова окна с разрешением доступа к местоположению
	const confirmLocation = () => {
		if (fetchedUser) {
			setPopout(<ScreenSpinner size="large"/>);
			bridge.send("VKWebAppGetGeodata", {})
				.then((data) => {
					usersRef.doc("id" + fetchedUser.id).update({
						lat: data.lat,
						long: data.long
					});
					setCancelLocation(false);
					setPopout(null);
					openLocationSnackbar();
				})
				.catch(() => {
					console.log("User declined location sharing");
					setCancelLocation(true);
					setPopout(null);
				});
		}
	}

	// Метод для разрешения доступа к уведомлениям
	const allowNotifications = () => {
		if (fetchedUser) {
			setPopout(<ScreenSpinner size="large"/>);
			bridge.send("VKWebAppAllowNotifications", {})
				.then((data) => {
					setPopout(null);
					openNotificationsSnackbar();
				})
				.catch(() => {
					console.log("User declined getting notifications");
					setPopout(null);
				});
		}
	}

	// Метод для показа Алерта с вопросом - подтверждаете ли вы создание нового Юзера
	const showAskAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
	          		title: "Продолжить",
	          		autoclose: true,
	          		mode: "destructive",
	          		action: () => setActiveView("create"),
        		}, {
          			title: "Отмена",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
				<h2>Подтвердите действие</h2>
				<p>Предыдущая анкета будет удалена</p>
      		</Alert>
		)
	}

	// Метод для показа Алерта с просьбой заполнить все поля
	const showEditAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
          			title: "ОК",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
        		<h2>Не удалось сохранить</h2>
        		<p>Вы заполнили не все поля</p>
      		</Alert>
		)
	}

	// Метод для показа Алерта с просьбой заполнить все поля
	const showCreateAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
          			title: "ОК",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
        		<h2>Не удалось сохранить</h2>
        		<p>Вы заполнили не все поля</p>
      		</Alert>
		)
	}

	// Метод для показа Алерта с просьбой разрешить доступ к локации
	const showLocationAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
          			title: "ОК",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
        		<h2>Не удалось</h2>
        		<p>Пожалуйста, разрешите доступ к вашему местоположению</p>
      		</Alert>
		)
	}

	// Метод для показа Алерта с просьбой добавить фото
	const showPhotoAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
          			title: "ОК",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
        		<h2>Не удалось сохранить</h2>
        		<p>Пожалуйста, добавьте вашу фотографию</p>
      		</Alert>
		)
	}

	// Метод для показа Алерта с просьбой написать корректный возраст
	const showAgeAlert = () => {
		setPopout(
			<Alert
        		actionsLayout="vertical"
        		actions={[{
          			title: "ОК",
          			autoclose: true,
          			mode: "cancel"
        		}]}
        		onClose={hideAlert}
      		>
        		<h2>Не удалось сохранить</h2>
        		<p>Пожалуйста, укажите коректный Возраст</p>
      		</Alert>
		)
	}

	// Метод для скрытия Алерта
	const hideAlert = () => {
		setPopout(null);
	}

	// Snackbar после добавления фото на экране создания анкеты
	const openPhotoSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon24Camera fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вы успешно добавили фотографию!
      		</Snackbar>
    	)
  	}

	// Snackbar после разрешения доспупа к геолокации
	const openLocationSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon24Place fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вы разрешили доступ к геолокации!
      		</Snackbar>
    	)
  	}

	// Snackbar после разрешения уведомлений
	const openNotificationsSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon24NotificationCheckOutline fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вы разрешили получение уведомлений!
      		</Snackbar>
    	)
  	}

	// Snackbar после изменения Юзера
	const openEditSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon24Done fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вы успешно изменили анкету!
      		</Snackbar>
    	)
  	}

	// Snackbar после создания Юзера
	const openCreateSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon24Done fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Ваша анкета успешно создана!
      		</Snackbar>
    	)
  	}

	// Snackbar после лайка на Главном экране
	const openLikeSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon16CheckCircleOutline fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вам понравилась анкета!
      		</Snackbar>
    	)
  	}

	// Snackbar после дизлайка на Главном экране
	const openDislikeSnackbar = () => {
    	setSnackbarIsActive(true)
    	setSnackbar(
      		<Snackbar
        		layout="vertical"
        		onClose={() => {setSnackbarIsActive(false); setSnackbar(null)}}
        		before={<Avatar size={24} style={blueBackground}><Icon16CancelCircleOutline fill="#fff" width={14} height={14} /></Avatar>}
      		>
        		Вам не понравилась анкета
      		</Snackbar>
    	)
  	}

	// Метод для перехода на другие View
	const goToNextView = e => {
		setActiveView(e.currentTarget.dataset.to);
	};

	// Метод для перехода на другие Panel
	const goToNextPanel = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	// Метод для отправклю уведомлений принимая само сообщение и id человека которому пойдет уведомление
	const sendNotifications = (message, senderId) => {
		if (fetchedUser) {
			bridge.send("VKWebAppCallAPIMethod", {
				method: "notifications.sendMessage",
				request_id: "1",
				params: {
					v: "5.110",
					access_token: "411ffdc5411ffdc5411ffdc537416d81824411f411ffdc51fc2e9799763a33616a53f8a",
					user_ids: senderId,
					message: message
				}
			}).then((data) => {
				usersRef.doc("id" + senderId).update({
					notifications: data
				});
			}).catch((error) => {
				usersRef.doc("id" + senderId).update({
					notifications: error
				});
			});
		}
	}

	// Возвращаем все экраны по уровням
	return (
		<Root activeView={activeView} popout={popout} snackbar={snackbar}>
			<View id="onboarding" activePanel={activePanel}>
				<Screen1 id="screen1" goToNextPanel={goToNextPanel} createPersonalData={createPersonalData}/>
				<Screen2 id="screen2" goToNextPanel={goToNextPanel}/>
				<Screen3 id="screen3" goToNextPanel={goToNextPanel} confirmLocation={confirmLocation} cancelLocation={cancelLocation} showLocationAlert={showLocationAlert} snackbar={snackbar}/>
				<Screen4 id="screen4" goToNextPanel={goToNextPanel} allowNotifications={allowNotifications} snackbar={snackbar}/>
				<Screen5 id="screen5" goToNextView={goToNextView}/>
			</View>
			<View id="home" activePanel="home">
				<Home
					id="home"
					goToNextView={goToNextView}
					usersData={usersData}
					updateLike={updateLike}
					sendNotifications={sendNotifications}
					snackbar={snackbar}
					notDecidedArray={notDecidedArray}
					openLikeSnackbar={openLikeSnackbar}
					openDislikeSnackbar={openDislikeSnackbar}
				/>
			</View>
			<View id="likes" activePanel="likes">
				<Likes
					id="likes"
					goToNextView={goToNextView}
					likedYou={likedYou}
					updateStatus={updateStatus}
					sendNotifications={sendNotifications}
				/>
			</View>
			<View id="show" activePanel="show">
				<Show
					id="show"
					goToNextView={goToNextView}
					username={username}
					userAge={userAge}
					userBio={userBio}
					userFileUrl={userFileUrl}
					showAskAlert={showAskAlert}
					snackbar={snackbar}
				/>
			</View>
			<View id="edit" activePanel="edit">
				<Edit
					id="edit"
					goToNextView={goToNextView}
					onFileChange={onFileChange}
					confirmLocation={confirmLocation}
					username={username}
					userAge={userAge}
					userBio={userBio}
					updatePersonalData={updatePersonalData}
					showEditAlert={showEditAlert}
					snackbar={snackbar}
				/>
			</View>
			<View id="create" activePanel="create">
				<Create
					id="create"
					goToNextView={goToNextView}
					onFileChange={onFileChange}
					savePersonalData={savePersonalData}
					showCreateAlert={showCreateAlert}
					showPhotoAlert={showPhotoAlert}
					cancelPhoto={cancelPhoto}
					snackbar={snackbar}
				/>
			</View>
		</Root>
	);
}

export default App;
