import {CustomError} from "./custom-error"

export class databaseConnectionError extends CustomError {
   statusCode= 500
   constructor(){
      super('db connection error!')
   }
   generateErrors(){
      return [{message: 'database connection error!'}]
   }
}