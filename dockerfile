# 1. Imagem base (leve e estável)
FROM node:22-alpine

# 2. Diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia apenas os arquivos de dependências primeiro
# Isso é um truque de Sênior: o Docker faz cache. 
# Se você não mudou as bibliotecas, ele pula essa etapa na próxima vez.
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o resto do código
COPY . .

# 6. Porta que o contêiner vai expor
EXPOSE 3000

# 7. O comando para ligar o motor
CMD ["npm", "run", "dev"]