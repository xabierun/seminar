FROM node:20.10.0

WORKDIR /app

COPY ./seminar-api/package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install


COPY . .

CMD ["npm", "run", "start"]

