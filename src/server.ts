import base from "./routes/v1/base";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { startConsumer } from "./queues/consumer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api/v1", base);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    console.log("------------ STARTED ------------");
});

// Iniciar o Consumer RabbitMQ automaticamente
startConsumer()
    .then(() => {
        console.log("Consumer de mensagens do RabbitMQ iniciado!");
    })
    .catch((error) => {
        console.error("Erro ao iniciar o consumer:", error);
    });
