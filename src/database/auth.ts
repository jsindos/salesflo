// Info: You need to add your business logic to log in and save data
import avatar3 from "@/assets/images/avatars/3.png";

import { IAuthUser } from "@/types/auth";

const findUser = ({ email, password }: Pick<IAuthUser, "email" | "password">) => {
    const fakeUser: IAuthUser = {
        id: 1,
        email: "admin@daisyui.com",
        username: "daisyui",
        password: "password",
        firstName: "Daisy",
        lastName: "Admin",
        avatar: avatar3,
    };

    if (email === fakeUser.email && password === fakeUser.password) {
        return fakeUser;
    }
    return null;
};

export const dummyAuthData = {
    findUser,
};
