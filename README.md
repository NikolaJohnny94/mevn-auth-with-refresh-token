# <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" width="32px"> <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" width="32px"/> MEVN <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vue_icon_130078.png" width="28px"/> <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png" width="32px"/> Stack + TypeScript <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_plain_logo_icon_146316.png" width="32px"/> , Pinia <img src='https://pinia.vuejs.org/logo.svg' width='26px'>, VeeValidate <img src='https://raw.githubusercontent.com/logaretm/vee-validate/main/logo.png' width='32px'/>, Yup <img src='https://cdn.icon-icons.com/icons2/2000/PNG/512/cool_smiley_sunglasses_icon_123402.png' width='20px'> , JWT <img src='https://jwt.io/img/pic_logo.svg' width='26px'>, daisyUI and Vitest <img src='https://user-images.githubusercontent.com/11247099/145112184-a9ff6727-661c-439d-9ada-963124a281f7.png' width='32px'/> authentification app with refresh token logic 🙌

### 💻 Stack: <br/>

<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" width="20px"/> [[M]ongoDB](https://www.mongodb.com/)<br>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/express_original_logo_icon_146527.png" width="20px"/> [[E]xpress.js](https://expressjs.com/)<br>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vue_icon_130078.png" width="20px"/> [[V]ue.js](https://vuejs.org/)<br>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png" width="20px"/> [[N]ode.js](https://nodejs.org/en/)<br>
➕

<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/typescript_plain_logo_icon_146316.png" width="20"/> [TypeScript](https://www.typescriptlang.org/)<br/>
<img src="https://pinia.vuejs.org/logo.svg" width="20"/> [Pinia](https://pinia.vuejs.org/)<br/>
<img src="https://raw.githubusercontent.com/logaretm/vee-validate/main/logo.png" width="26"/> [VeeValidate](https://vee-validate.logaretm.com/v4/)<br/>
<img src="https://user-images.githubusercontent.com/11247099/145112184-a9ff6727-661c-439d-9ada-963124a281f7.png" width="26"/> [Vitest](https://vitest.dev/)<br/>
<img src='https://cdn.icon-icons.com/icons2/2000/PNG/512/cool_smiley_sunglasses_icon_123402.png' width='20px'> [Yup](https://www.npmjs.com/package/yup)
<br/>
<img src='https://cdn.icon-icons.com/icons2/3914/PNG/512/daisyui_logo_icon_249080.png' width='32px'>[daisyUI](https://daisyui.com/)<br/>
<img src='https://jwt.io/img/pic_logo.svg' width='26px'> [JWT](https://jwt.io/)

## Description 📑

### MEVN stack authentification app with refresh token logic that uses TypeScript for type checking, JWT for generating and verifying tokens, Pinia for state management, VeeValidate for handling forms, Yup as schema validation, daisyUI for UI and Vitest for unit testing🤗<br>

User have option to **register** new account and to **login** if account is registered successfully.<br>
Upon every successfull **login**, user gets **refresh** and **access** token (_expires in 20 minutes_), that is stored in the **localStorage** and that is sent upon requests to the _protected routes_ ( **/logout** and **/me** ).<br> <br>
When sending requests to _protected routes_ ( **/logout** and **/me** ), the request is intercepted in the middleware and the token is decoded.
If token is valid, user gets the adequate response.<br><br>
After user is decoded there is _**isAuthorized**_ middleware, that checks if user is authorized to access the route based on the user's role.
If everything is sucessfull, user gets access to **/me** and **/logout** endpoint.<br><br>
If client gets a message that the access token expired when trying to send a request to **/me** endpoint, **_axios_** interceptors sends another request to **/refresh-token** route, where **_refresh token_** is decoded and new **_access token_** is generated.
If this is _successfull_, the initial request to **/me** route is sent one more time with new **access token**, which if it is decoded **successfully**, user gets access to **/me** and **/logout** route again.

## Requirements ⚙️

Install node modules: <br>

```
npm install
```

## Back-End 🌐

### Create .env file and add values 📄

In the **./backend** folder create **.env** file.<br>
Copy content from **example.env** file, and add missing values (**MONGO_URL**, **JWT_SECRET**), and change existing values to your preferance if you want.

### Routes: <br>

### Unauthorized routes: <br>

- /api/auth/registration [POST]<br/>
  **Description**: Register new user.<br/>
  **Required fields**: username, email, password
- /api/auth/login [POST]<br/>
  **Description**: Login user and get the token<br/>
  **Required fields**: email, password

### Authorized routes: <br>

When sending request to **/me** and **/logout** endpoints, set authorization header -> 'Authorization' : 'Bearer ${token}'<br/>

- /api/auth/me [GET]<br/>
  **Description**: Get currently logged user <br/>
- /api/auth/loggout [POST]<br/>
  **Description**: Loggout currentyl logged user <br/>
- /api/auth/refresh-token [POST]<br/>
  **Description**: Decode refresh token and generate new access token <br/>
  **Required fields**: token

### Front-End 🖼️

### .env file 📄

If you change the API base url of a Back-End application (values of **BASE_URL** and **PORT** in **./backend/.env** file), then you need to change the value of **VITE_BACKEND_BASE_URL** in the **./frontend/.env** file aswell.

## Run the dev server 👨‍💻

Navigate to **backend** folder and run:

```
npm run dev
```

Navigate to **frontend** folder and run:

```
npm run dev
```
