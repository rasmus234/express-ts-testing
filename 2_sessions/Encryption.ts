const bcrypt = require('bcrypt');

const salt:number = 5;

class Encryption{


   static async createHash(originalText:string):Promise<any>{
    return bcrypt.hash(originalText,salt);
   }

   static async compareHash(clearText:string,encryptedText:string):Promise<any>{
    const isCorrect:boolean = await bcrypt.compare(clearText,encryptedText);
    console.log('compareHash'+isCorrect);
    return isCorrect;
    }

}
export {Encryption}
