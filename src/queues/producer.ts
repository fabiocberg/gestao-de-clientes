import amqp from "amqplib";

const RABBITMQ_URL =
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
const QUEUE_NAME = "customer_queue";

export const sendMessage = async (message: any) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });

        console.log(`Mensagem enviada para a fila: ${QUEUE_NAME}`);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Erro ao enviar mensagem para RabbitMQ:", error);
    }
};
