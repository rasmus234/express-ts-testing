import {model, Schema, Model, Document} from 'mongoose';

interface IUser extends Document {
    userName:string;
    password: string;
    email?:string;
    telephone?:string;
    userStatus? :boolean;
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  telephone: { type: String, required: false},
  userStatus: { type: Boolean, required: false }
});

const User: Model<IUser> = model('User', UserSchema);

export {User,IUser}