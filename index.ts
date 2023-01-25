//modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs'
// const inquirer: any= require("inquirer");sdsadsa

// const chalk: any= require('chalk');

//modulo internos
// const fs: any= require('fs');

const operation = () => {
  inquirer.prompt([{
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
    const action: string = answer['action']
  })
  .catch((err) => console.log(err));
}

operation()