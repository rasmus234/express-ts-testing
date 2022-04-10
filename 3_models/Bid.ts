import {model, Schema, Model, Document} from 'mongoose';

interface IBid extends Document {
    timestamp?:number;
    userID: string;
    productID:string;
    value:number;
}

const BidSchema: Schema = new Schema({
  timestamp: { type: Number, required: false },
  userID: { type: String, required: true },
  productID: { type: String, required: true },
  value: { type: Number, required: true }
});

const Bid: Model<IBid> = model('Bid', BidSchema);

export {Bid,IBid}