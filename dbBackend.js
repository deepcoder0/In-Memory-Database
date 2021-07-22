const clone = require('clone');
const fs = require('fs');
// const module = require('module');
module.exports = class myDB {
   constructor() {
      // Data with transaction_index
      this.data = [{}];
      // Current Transaction Index
      this.t_Index = 0;
      // Transaction mode Indicator
      this.transaction_Mode = false;

      // Basic Functions //

      /* {@function} count - Returns the number of names that have the given value
       * assigned to them. If that value is not assigned anywhere, return 0
       * @params {String} value the unique identifier for the db search
       * @return {Number} the number of names tht have the given value
       */

      this.count = function(value) {
         let countedValues = 0;

         if (value) {
            for (let property in this.data[this.t_Index]) {
               if (property && (this.data[this.t_Index][property] === value)) {
                  countedValues++;
               }
            }
         }
         return countedValues;
      }

      /* {@function} Deletes the value from the database.
       * @params {String} name the unique identifier for the db lookup
       */
      this.delete = function(name) {
         if (name) {
            if (this.data[this.tIndex][name]) {
               delete this.data[this.tIndex][name];
            }
         }
      };

      /* {@function} get - Returns the value for the given name.
       * If the value is not in the database, prints N ULL
       * @params name the unique identifier for the db lookup
       * @return {Object} the value for the given name
       */
      this.get = function(name) {
         let res = null;

         if (name) {
            res = this.data[this.tIndex][name];
         }
         return res ? res : null;
      };

      /* {@function} set - Sets the name in the database to the given value
       * @params {String} name the unique identifier for the entry
       * @params {String} value the value for the given entry
       */
      this.set = function(name, value) {
         if (!this.data[this.tIndex]) {
            this.data[this.tIndex] = {};
         }
         if (name && name.length > 0) {
            this.data[this.tIndex][name] = value || null;
         }
      };

      /* {@function} show -Shows each tansaction's database by printing it.
       * @params -> No params required.
       */
       this.show  = function() {
         this.data.forEach(function(transaction,index){
            console.log('Database at Transaction Index ' + index + ' : ' + JSON.stringify(transaction));
         })
       };
      // TRANSACTION FUNCTIONS 

      /* {@function} begin - Begins a new transaction. Turns off auto-commit
       */
       this.begin = function () {
         if (!this.transactionMode) {
            this.transactionMode = true;
         }
         // Make sure stage and and main are in sync
         this.data[this.tIndex+1] = clone(this.data[this.tIndex]);
         this.tIndex++;
       }; 
      
      /* {@function} commit - Commit all of the open transactions. Turns on auto-commit
    */
    this.commit = function () {
    	if (this.tIndex === 0) {
        this.transactionMode = false;
    	}
    	if (this.tIndex > 0) {
	    	// Sync Data from transaction
	    	this.data[this.tIndex-1] = clone(this.data[this.tIndex]);
	    	// Clear out the transaction data
	    	this.data[this.tIndex] = {};
	    	// Point to earlier version of data
        this.tIndex--;
      }
      return this.tIndex;
    };

  /* {@function} download - Downloads the content of DB into db_dump.txt
    * @return {Number} the new transaction index
    */

    this.download = function () {
      var db_dump;
      this.data.forEach((entry) => {
        db_dump = JSON.stringify(entry);
      });
      fs.writeFileSync('database.json', db_dump);
      console.log("------- Saving DB to db_dump.json -------");
    }
    
	/* {@function} rollback - Rolls back the most recent transaction.
    * @return {Number} the new transaction index
    */

   }
}
