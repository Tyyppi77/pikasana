const chooseRandom = <T>(options: Array<T>): T => (
    options[Math.floor(Math.random() * options.length)]
);

export default chooseRandom;
