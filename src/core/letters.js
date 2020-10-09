import chooseRandom from "../util/choose-random"

export default {
    chooseRandom: () => {
        const alphabet = "aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö";
        return chooseRandom(alphabet).toUpperCase();
    }
}
