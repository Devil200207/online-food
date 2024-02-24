import { Schema,model } from "mongoose";

export interface MineUser
{
    id: string;
  name: string;
  email: string;
  password:string;
  address:string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<MineUser>(
    {
        name : {type: String, required: true},
        email : {type: String, required: true, unique: true},
        password : {type: String, required: true},
        address : {type: String, required: true},
        isAdmin : {type: Boolean, required: false}
    },{
        toJSON:{ virtuals:true },
        toObject:{ virtuals:true},
        timestamps:true
    }
);

export const MineUserModel = model<MineUser>('User',UserSchema);