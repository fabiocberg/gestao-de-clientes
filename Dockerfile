# Usa uma imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do package.json e package-lock.json antes do restante do código
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta do servidor
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]
