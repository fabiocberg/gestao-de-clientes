import amqp from "amqplib";

const RABBITMQ_URL =
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
const QUEUE_NAME = "customer_queue";

const processMessage = async (msg: amqp.ConsumeMessage | null) => {
    if (!msg) return;

    const content = JSON.parse(msg.content.toString());
    console.log(`Mensagem recebida:`, content);

    // Simulando processamento (pode ser persistência, notificação, etc.)
    console.log(`Processando evento: ${content.event}`);

    setTimeout(() => {
        console.log("Mensagem processada!");
    }, 2000);
};

export const startConsumer = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Aguardando mensagens na fila: ${QUEUE_NAME}`);
        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg) {
                await processMessage(msg);
                channel.ack(msg); // Confirma que a mensagem foi processada
            }
        });
    } catch (error) {
        console.error("Erro no consumidor:", error);
    }
};
