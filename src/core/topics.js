import chooseRandom from "../util/choose-random"

import topics from "../resources/topics.json"

export default {
    chooseRandom: () => {
        return chooseRandom(topics)
    },
};
