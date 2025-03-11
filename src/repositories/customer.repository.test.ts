import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Customer, { ICustomer } from "../../src/models/customer.model";
import { CustomerRepository } from "../../src/repositories/customer.repository";

let mongoServer: MongoMemoryServer;
let customerRepository: CustomerRepository;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    customerRepository = new CustomerRepository();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("CustomerRepository", () => {
    it("deve criar um cliente", async () => {
        const customer = await customerRepository.create({
            name: "Test User",
            email: "test@email.com",
            phone: "123456789",
        });

        expect(customer).toHaveProperty("_id");
        expect(customer.name).toBe("Test User");
    });

    it("deve buscar um cliente por ID", async () => {
        const createdCustomer = await customerRepository.create({
            name: "Find User",
            email: "find@email.com",
            phone: "987654321",
        });

        const foundCustomer = await customerRepository.findById(
            createdCustomer._id
        );
        expect(foundCustomer).not.toBeNull();
        expect(foundCustomer?.email).toBe("find@email.com");
    });

    it("deve listar todos os clientes", async () => {
        const customers = await customerRepository.findAll();
        expect(customers.length).toBeGreaterThan(0);
    });

    it("deve atualizar um cliente", async () => {
        const customer = await customerRepository.create({
            name: "Update User",
            email: "update@email.com",
            phone: "1122334455",
        });

        const updatedCustomer = await customerRepository.update(customer._id, {
            name: "Updated Name",
        });
        expect(updatedCustomer?.name).toBe("Updated Name");
    });

    it("deve deletar um cliente", async () => {
        const customer = await customerRepository.create({
            name: "Delete User",
            email: "delete@email.com",
            phone: "5566778899",
        });

        const deletedCustomer = await customerRepository.delete(customer._id);
        expect(deletedCustomer).not.toBeNull();

        const foundCustomer = await customerRepository.findById(customer._id);
        expect(foundCustomer).toBeNull();
    });
});
