# Dating VK Mini App
[![License](https://img.shields.io/github/license/romarakhlin/Dating-VK-mini-App)](https://github.com/romarakhlin/Dating-VK-mini-App/blob/master/LICENSE)

This is a dating service works with Google Firebase for storing & interacting users.

## Screenshots
<p float="left">
  <img src="/screenshot_1.PNG" width="250" />
  <img src="/screenshot_2.PNG" width="250" /> 
  <img src="/screenshot_3.PNG" width="250" /> 
</p>

## Features
- App has Onboarding thats shows up with first launch
- For uploading images I've used https://imgur.com API
- Sorting users depends on location and age
- App uses alghorithm for filtering users by location radius
- Users get notifications about like/match
- Users can create & edit theirs profiles

## To Do

## License
Dating-VK-mini-App is available under the MIT license. See the LICENSE file for more info.

# Create VK Mini App [![npm][npm]][npm-url] [![deps][deps]][deps-url]
[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

## How to install

### Create VK Mini App with gh-pages deploy

`npx @vkontakte/create-vk-mini-app <app-directory-name>`

### Create VK Mini App with Zeit deploy

Firstly, you have to create Zeit account and connect it with your GitHub profile — https://zeit.co/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --zeit`

### Create VK Mini App with Surge deploy

Firstly, you have to create Surge account and Surge-domain — https://surge.sh/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --surge <surge-domain>`

## How to start work with app

Go to created folder and run:
`yarn start` || `npm start` — this will start dev server with hot reload on `localhost:10888`.

`yarn run build` || `npm run build` — this will build production bundle, with tree-shaking, uglify and all this modern fancy stuff

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app# Dating-App
