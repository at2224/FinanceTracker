# use node.js runtime as parent image

FROM node:22-alpine

#set up working dir in container
WORKDIR /app

#copy package.json and package-lock.json files to container
COPY package*.json .

# install dependencies
RUN npm install

# Copy rest of app code
COPY . . 

# expose the port the app runs on
EXPOSE 5000

# Define command to run application
CMD ["node", "./src/server.js"]