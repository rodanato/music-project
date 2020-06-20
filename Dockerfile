FROM node:12.10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g firebase-tools
COPY . .
EXPOSE 3000
CMD [ "npm", "build" ]