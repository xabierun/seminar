FROM node:20.10.0

WORKDIR /app

COPY ./seminar-front/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

