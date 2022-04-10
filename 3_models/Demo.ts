

class Demo{
   private value1:string;
   private value2?:string;

   constructor(value1:string, value2?:string){
       this.value1 = value1;
       if(value2){
           this.value2 = value2;
       }
   }



}

export{Demo}

