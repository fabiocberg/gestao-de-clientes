import { Schema, Document } from "mongoose";

export interface IBaseEntity extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const BaseEntitySchema = new Schema(
    {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true } // O Mongoose automaticamente gerencia createdAt e updatedAt
);
