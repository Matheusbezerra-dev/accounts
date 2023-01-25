"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modulos externos
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const check = (accountName) => {
    if (!fs_1.default.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk_1.default.bgRed.black('Esta conta não existe, escolha outro nome!'));
        return false;
    }
    return true;
};
const getAccount = (accountName) => {
    const accountJSON = fs_1.default.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'UTF8',
        flag: 'r',
    });
    return JSON.parse(accountJSON);
};
const addAmount = (accountName, amount) => {
    const accountData = getAccount(accountName);
    if (!amount) {
        console.log(chalk_1.default.bgRed.black('Ocorreu um erro, tente novamente!'));
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
    fs_1.default.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData));
    console.log(chalk_1.default.green(`Foi depositado o valor de R$${amount},00 na sua conta`));
};
const deposit = () => {
    inquirer_1.default.prompt([{
            name: 'accountName',
            message: 'Qual o nome da sua conta',
        }])
        .then((answer) => {
        const accountName = answer['accountName'];
        if (!check(accountName)) {
            return deposit();
        }
        inquirer_1.default.prompt([{
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }])
            .then((answer) => {
            const amount = answer['amount'];
            addAmount(accountName, amount);
            operation();
        });
    })
        .catch((err) => { console.log(err); });
};
const buildAccount = () => {
    inquirer_1.default.prompt([{
            name: 'accountName',
            message: 'Digite um nome para a sua conta?',
        }]).then((answer) => {
        const accountName = answer['accountName'];
        console.info(accountName);
        if (!fs_1.default.existsSync('accounts')) {
            fs_1.default.mkdirSync('accounts');
        }
        if (fs_1.default.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk_1.default.bgRed.black('Esta conta ja Existe, escolha outro nome!'));
            buildAccount();
            return;
        }
        ;
        fs_1.default.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}');
        console.log(chalk_1.default.green('Parabéns, a sua conta foi criada!'));
        operation();
    }).catch((err) => { console.log(err); });
};
const createAccount = () => {
    console.log(chalk_1.default.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk_1.default.green('Defina as opções da sua conta a seguir.'));
    buildAccount();
};
const operation = () => {
    inquirer_1.default.prompt([{
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        }])
        .then((answer) => {
        const action = answer['action'];
        if (action === 'Criar conta') {
            createAccount();
        }
        ;
        if (action === 'Consultar Saldo') {
        }
        if (action === 'Depositar') {
            deposit();
        }
        if (action === 'Sacar') {
        }
        if (action === 'Sair') {
            console.log(chalk_1.default.bgBlue.black('Obrigado por usar o Account!'));
            process.exit();
        }
    })
        .catch((err) => { console.log(err); });
};
operation();
