import {connect} from 'mongoose';
export class DB{
  static async connect():Promise<void> {
        await connect(process.env.DB || "");
  }
}
