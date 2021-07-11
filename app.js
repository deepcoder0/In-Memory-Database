const path = require('path');
const readline = require('readline');
const dbBackend = require(path.resolve('./dbBackend'));
const { config } = require('./config.js') // Importing Password! -> config.PASSWORD


const readInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false //ToSEE
});

let db = new dbBackend();
console.log("----------- InMemDB Ready!! -----------");

readInput.on('line', (input) => {
   let cmd = input.split(' ');
   cmd[0] = cmd[0].toUpperCase();
   let command = cmd[0];
   let key;
   let value;

   if (cmd.length > 1){
      key = cmd[1] || null;
      value = cmd[2] || null;
   }

   let transactionsIndex;
   switch (command) {
      case 'SET':
			db.set(key, value);
			break;

		case 'GET':
			console.log(db.get(key));
			break;

		case 'DELETE':
			db.delete(key);
			break;

		case 'COUNT':
			console.log(db.count(key));
			break;

		case 'BEGIN':
			db.begin();
			break;

      case 'ROLLBACK':
         transactionIndex = db.rollback();
			if ( transactionIndex == -1) console.log('Transaction not found!!');
         else console.log("Rolled back transaction with ID " + transactionIndex);
			break;

		case 'COMMIT':
         transactionIndex = db.commit();
         console.log("Commited to DB with Transaction ID as " + transactionIndex);
         break;

      case 'DOWNLOAD':
         db.download();
         break;

		case 'END':
         readInput.close();
			console.log('----------- InMemDB Closed!! -----------');
			break;

      case 'SHOW':
         if (key == config.PASSWORD) db.show();
         else console.log('Please enter correct Password!');
         break;

		case 'OPTIONS':
			console.log('options:\nSET <Key> <Val>\n' +
				'GET <Key>\nDELETE <Key>\nCOUNT <value>\n' +
				'BEGIN\nROLLBACK\nCOMMIT\nSHOW <PASSWORD>\nEND\n');
			break;

		default:
         console.log('\nInvalid input. Please try again.\n' +
             'Use OPTIONS to see all possible commands\n');
			break;
   }

   db.manageState(); // ToSEE

})
