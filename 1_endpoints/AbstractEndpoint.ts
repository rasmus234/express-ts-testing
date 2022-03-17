import { Role } from '../3_models/Role';
import { Guard } from '../2_sessions/Guard';
import { Resource } from '../3_models/Resource';
import { SuccessCode } from '../3_models/SuccessCode';

class AbstractEndpoint{

   public static produceResponse(successCode:SuccessCode, minRole:Role, resource:Resource, request:any, response:any):any{
       const code= Guard.deny(request,minRole);
       if (code > 0)
          return response.status(code);
       // + for the parameters
       // + for data
       return response.status(successCode);
   }
}

export {AbstractEndpoint}
