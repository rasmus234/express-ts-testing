import jsonwebtoken from 'jsonwebtoken';
import {Role} from '../3_models/Role';
import jwtDecode from "jwt-decode";

type token = {role: Role};
class AccessToken {

    // (1) Create an ACCESS TOKEN (with JWT) containing the user ROLE
    static generateToken(role: Role): string {
        return jsonwebtoken.sign({role: role}, process.env.TOKEN_SECRET || "default", {expiresIn: 10000000});
    }

    // (2) Read the user role from the ACCESS TOKEN
    static userRole(token: string): Role {
        const decoded = jwtDecode(token) as token
        return decoded.role;
    }
}

export {AccessToken}
