FROM node:20

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 5000

CMD ["npm","run","start"]
