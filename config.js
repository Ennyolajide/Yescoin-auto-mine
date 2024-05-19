require('dotenv').config();

const env = process.env;
const baseUrl = 'https://api.yescoin.gold';

const urls = {
    login: `${baseUrl}/user/login`,
    collectCoin: `${baseUrl}/game/collectCoin`,
    accountInfo: `${baseUrl}/account/getAccountInfo`,
}

const taps = { 'min': parseInt(env.MIN_CLICK), 'max': parseInt(env.MAX_CLICK), 'boost': parseInt(env.BOOST) };
const intervals = { 'min': parseInt(env.MIN_INTERVAL), 'max': parseInt(env.MAX_INTERVAL), 'boost': parseInt(env.BOOST) };

function buildAuthQuery() {
    return `user={"id":${process.env.USER_ID},"first_name":"${process.env.FIRST_NAME}","last_name":"${process.env.LAST_NAME}","username":"${process.env.USERNAME}","language_code":"${process.env.LANGUAGE_CODE}","allows_write_to_pm":${process.env.ALLOWS_WRITE_TO_PM}}&chat_instance=${process.env.CHAT_INSTANCE}&chat_type=${process.env.CHAT_TYPE}&auth_date=${process.env.AUTH_DATE}&hash=${process.env.HASH}`;
}

function getHeaders(data = {}, headers = {}, ContentLength = null) {

    return {
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Site': 'same-site',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        // 'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NzA2NTcyODYiLCJjaGF0SWQiOiI0NzA2NTcyODYiLCJpYXQiOjE3MTU5NjM0NDcsImV4cCI6MTcxODU1NTQ0Nywicm9sZUF1dGhvcml6ZXMiOltdLCJ1c2VySWQiOjE3ODA4NzgxMzA2NDgwMjcxMzZ9.IDjKdvdFbtBUej39K7JcnOAYSNUaJ1_3QwzsMKdbjsODQK_pFeGCcUHut_4_pnuC8zjW3rjl-arZVDJ80V6jjQ',
        'Origin': 'https://www.yescoin.gold',
        // 'Content-Length': ContentLength || JSON.stringify(data).length,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://www.yescoin.gold/',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'empty',
        ...headers
    };

}

module.exports = { taps, intervals, urls, getHeaders, buildAuthQuery }
