"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// const inquirer: any= require("inquirer");sdsadsa
// const chalk: any= require('chalk');
//modulo internos
// const fs: any= require('fs');
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
    })
        .catch((err) => console.log(err));
};
operation();
