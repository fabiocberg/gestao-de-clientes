import { Model, Document } from "mongoose";

export class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const createdDocument = new this.model(data);
        return await createdDocument.save();
    }

    async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}
