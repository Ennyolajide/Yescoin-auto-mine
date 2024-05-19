require('dotenv').config();
const axios = require('axios');
const { clicks, interval } = require('./utils.js');
const { getAccountInfo, collectCoin } = require('./requests');
const { taps, intervals, urls, getHeaders, buildAuthQuery } = require('./config');


const data = {
    "code": buildAuthQuery()
};


axios.post(urls.login, data, { headers: getHeaders(data) })
    .then((res) => {
        const { message, data } = res.data;
        const token = (message == 'Success') ? data.token : null;
        const accountInfo = token ? getAccountInfo(token) : null;

        // Function to execute
        function handleCoinCollection() {
            token ? collectCoin(token, clicks(taps)) : false;
        }

        handleCoinCollection();

        setInterval(handleCoinCollection, interval(intervals));
    })
    .catch(error => {
        console.log(error);
    });