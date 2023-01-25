"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modulos externos
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
// const inquirer: any= require("inquirer");sdsadsa
// const chalk: any= require('chalk');
//modulo internos
// const fs: any= require('fs');
const createAccount = () => {
    console.log(chalk_1.default.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk_1.default.green('Defina as opções da sua conta a seguir.'));
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
                'sacar',
                'Sair',
            ],
        }])
        .then((answer) => {
        const action = answer['action'];
        if (action === 'Criar conta') {
            createAccount();
        }
    })
        .catch((err) => console.log(err));
};
operation();
