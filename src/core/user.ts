import { number, string } from "prop-types";

class User {
    name = '';

    score = 0;

    constructor(name: string) {
        this.name = name;
    }
}

export default User;
