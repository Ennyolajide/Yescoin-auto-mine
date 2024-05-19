require('dotenv').config();
const axios = require('axios');
const { clicks, interval } = require('./utils.js');
const { getAccountInfo, collectCoin } = require('./requests');
const { urls, getHeaders, buildAuthQuery } = require('./config');


const boost = process.env.BOOST || 0;

const data = {
    "code": buildAuthQuery()
};


axios.post(urls.login, data, { headers: getHeaders(data) })
    .then((res) => {
        const { message, data } = res.data;
        const token = (message == 'Success') ? data.token : null;
        const accountInfo = token ? getAccountInfo(token) : null;

        // Function to execute
        function handleCoinCollection(){
            token ? collectCoin(token, clicks(100, 200, boost)) : false;
        }

        handleCoinCollection();

        setInterval(handleCoinCollection, interval(5, 10, boost));
    })
    .catch(error => {
        console.log(error);
    });