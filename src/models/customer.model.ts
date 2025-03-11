import mongoose, { Schema } from "mongoose";
import { IBaseEntity, BaseEntitySchema } from "./base.entity";

export interface ICustomer extends IBaseEntity {
    name: string;
    email: string;
    phone: string;
}

const CustomerSchema: Schema = new Schema({
    ...BaseEntitySchema.obj, // Herdando campos genéricos
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
});

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
