import jsonwebtoken from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Role } from '../3_models/Role';

const expiresIn:string = '2h';

class AccessToken{

   // (1) Create an ACCESS TOKEN (with JWT) containing the user ROLE
   static generateToken(role:Role):string{
      const token = jsonwebtoken.sign({'role':role}, process.env.TOKEN_SECRET ||"default", { expiresIn });
      console.log(token);
      return token;
   }

   // (2) Read the user role from the ACCESS TOKEN
   static userRole(token:string):Role{
      const decodedToken:any = jwtDecode(token);
      console.log(decodedToken.role);
      return decodedToken.role;
   }
}
export {AccessToken}
