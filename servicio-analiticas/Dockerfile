FROM node:16-alpine

WORKDIR /app
COPY app.js .

RUN npm install express axios --production

CMD ["node", "app.js"]