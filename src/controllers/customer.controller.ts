import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomerRepository } from "../repositories/customer.repository";
import redisClient from "../config/redis";
import { sendMessage } from "../queues/producer";

const customerRepository = new CustomerRepository();

export class CustomerController {
    static async create(req: Request, res: Response) {
        try {
            const customer = await customerRepository.create(req.body);

            await sendMessage({ event: "NEW_CUSTOMER", data: customer });

            res.status(StatusCodes.CREATED).json({
                message: "Cliente cadastrado com sucesso!",
                customer,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao cadastrar o cliente",
            });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const updatedCustomer = await customerRepository.update(
                id,
                req.body
            );
            if (!updatedCustomer) {
                res.status(StatusCodes.NOT_FOUND).json({
                    error: "Cliente não encontrado",
                });
                return;
            }

            await redisClient.del(`customer:${id}`);

            res.json({
                message: "Cliente atualizado!",
                customer: updatedCustomer,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao atualizar cliente",
            });
        }
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const cachedCustomer = await redisClient.get(`customer:${id}`);

            if (cachedCustomer) {
                console.log("Cache HIT - Dados retornados do Redis");
                res.json(JSON.parse(cachedCustomer));
                return;
            }

            const customer = await customerRepository.findById(id);

            if (!customer) {
                res.status(StatusCodes.NOT_FOUND).json({
                    error: "Cliente não encontrado",
                });
                return;
            }

            await redisClient.setex(
                `customer:${id}`,
                300,
                JSON.stringify(customer)
            );
            console.log("Cache MISS - Dados salvos no Redis por 5 minutos");

            res.json(customer);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao buscar cliente",
            });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const customers = await customerRepository.findAll();
            res.json(customers);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao listar clientes",
            });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const deletedCustomer = await customerRepository.delete(id);
            if (!deletedCustomer) {
                res.status(StatusCodes.NOT_FOUND).json({
                    error: "Cliente não encontrado",
                });
                return;
            }

            await redisClient.del(`customer:${id}`);

            res.json({ message: "Cliente deletado!" });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao deletar cliente",
            });
        }
    }
}
