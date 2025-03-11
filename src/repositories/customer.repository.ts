import Customer, { ICustomer } from "../models/customer.model";
import { BaseRepository } from "./base.repository";

export class CustomerRepository extends BaseRepository<ICustomer> {
    constructor() {
        super(Customer);
    }
}
