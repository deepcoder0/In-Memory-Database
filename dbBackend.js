const clone = require('clone');
const fs = require('fs');
modules.exports = class myDB {
   constructor () {
      // Data with transaction_index
      this.data = [{}];
      // Current Transaction Index
      this.t_Index = 0;
      // Transaction mode Indicator
      this.transaction_Mode = false;

      // Basic Functions

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







   }
}
