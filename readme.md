# bamazonCustomer.js

bamazonCustomer.jus is a Node/Javascript store simulation utilizing a MySQL database.

## Installation

Node.js needs to be installed for NPM and bamazon usage.
Use [npm] (https://npmjs.com) to install bamazon's dependencies.

```$
npm install
```

If the provided package-lock.json is not available, install [MySQL](https://www.npmjs.com/package/mysql) and [Inquirer](https://www.npmjs.com/package/inquirer).

```$
npm install mysql
```

```$
npm install inquirer
```

The sample SQL file (bamazon.sql) and a working SQL database are needed for the application to work.

## Usage

```$
node bamazonCustomer
```

Prompts for proper inputs are described in application as it is used. 

Application can be force closed with Ctrl+C, and can be terminated normally on exit prompt.