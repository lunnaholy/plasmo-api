### Plasmo API
Node.js библиотека, созданная для упрощения работы с Plasmo RP API.
Полную документацию по API Plasmo можно найти [тут](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

### Использование
```js
import { PlasmoAPI, oauth2 } from "plasmo-api";

const plasmoClient = new oauth2.Client({
    client_id: "id",
    client_secret: "secret",
    redirect_uri: "http://localhost:3000/pepega",
    scopes: [oauth2.Scope.BANK_BALANCE]
});

try {
    const token = await plasmoClient.code.getToken("code, полученный с oauth2 с grant_type = code");
} catch (e) {
    console.log(e);
}

const plasmoApi = new PlasmoAPI(token);
console.log(await plasmoApi.users.getAccount()); // ProfileAPIResponse
```

(вы можете спокойно использовать библиотеку и без oauth2, если у вас уже есть токен)