# Use a base image with Node.js
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install the dependencies
RUN yarn install

# Add the missing devDependency
RUN yarn add @babel/plugin-proposal-private-property-in-object --dev

# Copy the entire frontend directory into the container
COPY . .

# Build the React app
RUN yarn build

# Command to serve the React app using Node.js
CMD ["node", "node_modules/serve/bin/serve", "-s", "build"]
