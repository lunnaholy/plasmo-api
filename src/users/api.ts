import { Plasmo } from "..";
import { Field, ProfileAPIResponse } from "./typings";

export default class API {
    private parent: Plasmo;

    constructor(parent: Plasmo) {
        this.parent = parent;
    }

    /**
     * Ищет пользователя по одному из аргументов
     * @param nickname Никнейм игрока
     * @param discord_id Discord id игрока
     * @param id Id игрока
     * @param fields Возвращаемые поля
     * @returns Ошибку если пользователь не найден, объект ProfileAPIResponse если найден
     */
    profile(
        nickname?: string,
        discord_id?: bigint,
        id?: number,
        fields?: Field[]
    ): Promise<ProfileAPIResponse> {
        return new Promise((resolve, reject) => { 
            this.parent.call("user/profile", "GET", { nick: nickname, discord_id, id, fields })
                .then((res: ProfileAPIResponse) => resolve(res))
                .catch(reject);
        });
    }
}