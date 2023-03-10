//modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

const removeAmount = (accountName: string, amount: string): void => {
  const accountData: any = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro tente novamente'));
    return widthdraw();
  };
  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('valor indisponivel!'))
    return widthdraw();
  };
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
  )
  console.log(chalk.green(`Foi Realizado um saque de R$${amount},00 da sua conta`));
  operation();
};

const widthdraw = (): void => {
  inquirer.prompt([{
    name: 'accountName',
    message: 'qual o nome da sua conta'
  }])
    .then((ansewer) => {
      const accountName = ansewer['accountName']
      if (!check(accountName)) {
        return widthdraw();
      }
      inquirer.prompt([{
        name: 'amount',
        message: 'qual o valor que deseja sacar?',
      }])
        .then((ansewer) => {
          const amount = ansewer['amount'];
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const getBalance = (): void => {
  inquirer.prompt([{
    name: 'accountName' as string,
    message: 'Qual o nome da sua conta?' as string,
  }])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (!check(accountName)) {
        return getBalance();
      };
      const accountData: any = getAccount(accountName);

      console.log(chalk.bgBlue.black(
        `Olá, o saldo da sua conta é de R$${accountData.balance}`
      ));
      operation();
    })
    .catch((err) => console.log(err))
};

const check = (accountName: string): boolean => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false
  };
  return true
};
const getAccount = (accountName: string) => {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'UTF8' as BufferEncoding,
    flag: 'r' as string,
  });
  return JSON.parse(accountJSON);
};

const addAmount = (accountName: string, amount: string) => {
  const accountData: any = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'));
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
  );

  console.log(chalk.green(`Foi depositado o valor de R$${amount},00 na sua conta`))
};

const deposit = (): void => {
  inquirer.prompt([{
    name: 'accountName' as string,
    message: 'Qual o nome da sua conta' as string,
  }])
    .then((answer): void => {
      const accountName: string = answer['accountName'];

      if (!check(accountName)) {
        return deposit();
      }

      inquirer.prompt([{
        name: 'amount',
        message: 'Quanto você deseja depositar?'
      }])
        .then((answer: any) => {

          const amount: string = answer['amount'];

          addAmount(accountName, amount)
          operation()
        })
    })
    .catch((err: any): void => { console.log(err) })
}

const buildAccount = (): void => {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Digite um nome para a sua conta?',
  }]).then((answer: any) => {
    const accountName: string = answer['accountName'];
    console.info(accountName);

    if (!fs.existsSync('accounts') as boolean) {
      fs.mkdirSync('accounts');
    }

    if (fs.existsSync(`accounts/${accountName}.json`) as boolean) {
      console.log(
        chalk.bgRed.black('Esta conta ja Existe, escolha outro nome!') as string,
      )
      buildAccount();
      return;
    };

    fs.writeFileSync(
      `accounts/${accountName}.json`,
      '{"balance": 0}',
    ) as void
    console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    operation()
  }).catch((err: any): any => { console.log(err) });
};

const createAccount = (): void => {
  console.log(chalk.bgGreen.black('OObrigado por escolher o nosso banco!') as string);
  console.log(chalk.green('Defina as opções da sua conta a seguir.') as string);
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
      'Depositar' as string,
      'Sacar' as string,
      'Sair' as string,
    ] as string[],
  }])
    .then((answer: any) => {
      const action: string = answer['action']
      switch (action) {
        case 'Criar conta':
          createAccount()
          break;
        case 'Consultar Saldo':
          getBalance()
          break;
        case 'Depositar':
          deposit();
          break;
        case 'Sacar':
          widthdraw();
          break;
        default:
          console.log(chalk.bgBlue.black('Obrigado por usar o Account!'));
          process.exit();
      };
    })
    .catch((err: any): any => { console.log(err) });
}

operation();
