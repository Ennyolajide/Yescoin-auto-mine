const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

function getAccountInfo(token) {
    return axios.get(urls.accountInfo, { headers: getHeaders({}, { token: token }) }).then((res) => {
        const { message, data } = res.data;
        message == 'Success' ? logAccountInfo(data) : console.log(chalk.red('Error getting account info'));
    }).catch((error) => {
        console.log(chalk.red(error));
    });
}

function collectCoin(token, data) {
    return axios.post(urls.collectCoin, data, { headers: getHeaders(data, { token: token }) }).then((res) => {
        const { message, data } = res.data;
        const status = message == 'Success';
        status ? logCollectCoin(data) : exitProcess(token);
        (!status || !data.collectStatus) ? exitProcess(token) : false;
    }).catch((error) => {
        console.log(chalk.red(error));
    });
}

function logAccountInfo(object) {
    console.log(chalk.green(`Amount: ${object.currentAmount}`), chalk.red(`Invited: ${object.inviteAmount}`), chalk.blue(`Level: ${object.userLevel}`), chalk.white(`Rank: ${object.rank}`), chalk.yellow(`Total: ${object.totalAmount}`));
}

function logCollectCoin(object) {
    console.log(chalk.green(`Collected Amount: ${object.collectAmount}`), `Status:  ${object.collectStatus ? chalk.green('\u2714') : chalk.red('\u274C') }`);
}

function exitProcess(token) {
    console.log(chalk.red('Error collecting coin or coin mining completed. Exiting...'));
    getAccountInfo(token); // show mining Result
    process.exit(); //end the process
}

function logInterval(interval) {
    console.log(chalk.yellow(`Interval: ${interval} seconds`));
}

module.exports = { getAccountInfo, collectCoin, logInterval }
