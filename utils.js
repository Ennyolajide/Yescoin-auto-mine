function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFloatRandom(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

function clicks(min, max, boost){
    return getRandom(min, max) * ((boost == true) ? 4 : 1);
}

function interval(min, max, boost){
    return (boost == true ? 5 : getRandom(min, max)) * 1000;
}

module.exports = { clicks, interval, getRandom, getFloatRandom }