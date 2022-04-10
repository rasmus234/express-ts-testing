import {IProduct, Product} from "../3_models/Product";
import {IUser, User} from "../3_models/User";
import {Encryption} from "./Encryption";
import {Bid, IBid} from "../3_models/Bid";


class Api {
    // CRUD support on products (Five methods):

    // #1
    static async getAllProducts(): Promise<IProduct[]> {
        try{
            return await Product.find({}, {_id: 0, __v: 0});
        }
        catch (e){
            console.error("Api getAllProducts(), "+e)
        }
        return [];
    }

    // #2
    static async getProduct(no:string):Promise<any>{
        try{
            return await Product.findOne({'no': no}, {_id: 0, __v: 0});
        }
        catch (e){
            console.error("Api getProduct(), "+e)
        }
    }

    // #3
    static async insertProduct(no:string,name:string, price:number):Promise<boolean>{
        try{
            const product: IProduct = new Product({
                no,
                name,
                price,
            });
            await product.save();
            return true;
        }
        catch(e){
            console.error("Api insertProduct(), "+e);
            return false;
        }
    }

    // #4
    static async updateProduct(no:string, name:string, price:number):Promise<any>{
        try{
            return await Product.findOneAndUpdate({'no': no}, {'name': name, 'price': price}, {_id: 0, __v: 0});
        }
        catch (e){
            console.error("Api updateProduct(), "+e);
        }
    }

    // #5
    static async deleteProduct(no:string):Promise<any>{
        try{
            return await Product.findOneAndRemove({'no': no}, {_id: 0, __v: 0});
        }
        catch (e){
            console.error("Api getProduct(), "+e)
        }
    }


    // User Management
    // #1
    static async login(userName:string,password:string):Promise<boolean>{
        try{
            const user = await User.findOne({'userName':userName});
            return (user && await Encryption.compareHash(password, user.password));

        } catch(e){
            console.error("Api login(), "+e);
            return false;
        }
    }

    // #2
    static async register(userName:string,password:string, email:string, telephone:string):Promise<boolean>{
        try{
            const userStatus:boolean = false;
            const user: IUser = new User({
                userName,
                password,
                email,
                telephone,
                userStatus
            });
            await user.save();
            return true;
        } catch(e){
            console.error('Api register, '+e);
            return false;
        }
    }

    static async placeBid(userID:string, productID:string, value:number):Promise<boolean>{
        try{
            const timestamp:number = new Date().getTime();
            const bid: IBid = new Bid({
                timestamp,
                userID,
                productID,
                value
            });
            await bid.save();
            return true;
        }
        catch(e){
            console.error("Api placeBid(), "+e);
            return false;
        }
    }
}
export {Api}
