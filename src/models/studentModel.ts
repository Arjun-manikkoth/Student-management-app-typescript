import mongoose, { Schema,Document} from 'mongoose'

export interface IUser extends Document {

  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isDeleted: Number;
}

const userSchema: Schema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  isDeleted: {
    type: Number,
    default:0
  }

})
const userModel = mongoose.model<IUser>("user",userSchema)

export default userModel;