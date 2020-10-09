import chooseRandom from '../util/choose-random';

export default {
    chooseRandom: (): string => {
        const alphabet = 'aaabcdeefghhiijjkkklllmmnnnnoopprrsssttuuvvwyäö'.split('');
        return chooseRandom(alphabet).toUpperCase();
    },
};
