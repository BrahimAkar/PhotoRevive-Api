FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

RUN npm uninstall argon2

RUN npm install argon2

# Copy the application code
COPY . .

# Copy the .env file
COPY .env .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
