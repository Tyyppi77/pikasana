const chooseRandom = (options) => {
    return options[Math.floor(Math.random() * options.length)]
}

export default chooseRandom
