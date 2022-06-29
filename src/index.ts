import fetch from "node-fetch";
import UsersAPI from "./users/api";
import { APIMethod, APIResponse } from "./api/globalTypes";

export class Plasmo {
    private access_token: string;
    private base_url: string = "https://rp.plo.su/api/";

    constructor(access_token: string) {
        this.access_token = access_token;
    }

    call(url: string, method: APIMethod, body: Record<string, any>): Promise<any> {
        return new Promise<APIResponse>((resolve, reject) => {
            url = this.base_url + url;
            if(method == "GET" && body != null) {
                url = url + "?" + new URLSearchParams(body);
            }
            fetch(url, {
                body: method == "POST" ? JSON.stringify(body) : null,
                headers: {
                    Authorization: "Bearer " + this.access_token
                },
                method
            })
                .then(res => res.json())
                .then((json: APIResponse) => {
                    if(json.status == false) {
                        reject(`Возникла ошибка во время обращения к API: ${json.error.msg} [${json.error.code}]`);
                    } else {
                        resolve(json);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    users: UsersAPI = new UsersAPI(this)
}