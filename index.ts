//modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

const check = (accountName: string): boolean => {
  if(!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false
  }
  return true
}

const deposit = (): void => {
  inquirer.prompt([{
    name: 'accountName' as string,
    message: 'Qual o nome da sua conta' as string,
  }])
  .then((answer: any): void => {    
    const accountName: string = answer['accountName'];   
  
    if(!check(accountName)){
      return deposit();
    }

  })
  .catch((err: any): void => { console.log(err) })
}
 
const buildAccount = (): void => {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Digite um nome para a sua conta',
  }]).then((answer: any) => {
    const accountName: string = answer['accountName'];
    console.info(accountName);
    
    if(!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts');
    }

    if(fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(
        chalk.bgRed.black('Esta conta ja Existe, escolha outro nome!'),
      )
      buildAccount();
      return;
    };

    fs.writeFileSync(
      `accounts/${accountName}.json`,
      '{"balance": 0}',
    )
    console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    operation()
  }).catch((err: any): any => { console.log(err) });
};

const createAccount = (): void => {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir.'));
  buildAccount();
};

const operation = (): void => {
  inquirer.prompt([{
    type: 'list' as string,
    name: 'action' as string,
    message: 'O que você deseja fazer?' as string,
    choices: [
      'Criar conta' as string,
      'Consultar Saldo' as string,
      'Depositar'as string,
      'Sacar'as string,
      'Sair'as string,
    ] as string[],
  }])
  .then((answer: any) => {
    const action: string = answer['action']
    if(action === 'Criar conta'){
      createAccount()
    };
    if(action === 'Consultar Saldo') {

    }
    if(action === 'Depositar') {
      deposit();
    }
    if(action === 'Sacar') {
      
    }
    if(action === 'Sair') {
      console.log(chalk.bgBlue.black('Obrigado por usar o Account!'));
      process.exit();    
    }
  })
  .catch((err: any): any => { console.log(err) });
}

operation();


