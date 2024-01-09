FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]