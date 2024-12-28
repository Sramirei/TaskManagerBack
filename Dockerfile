FROM node:21.4.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 9000

ENV MONGO_URL=mongodb+srv://user:password@cluster0.ohqouip.mongodb.net/TaskManager?retryWrites=true&w=majority
ENV PORT=9000
ENV SECRET_JWT=kG5-BjqhF_H&7yU/&iJ%k/+/pMFG_x@Wgr4XLXh&ZnjEM?
ENV NODE_ENV=development
ENV PROD_URL=http://

CMD ["node", "./index.js"]