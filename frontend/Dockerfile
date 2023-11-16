#\frontend
# Use a base image with Node.js
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install the dependencies, forcing the resolution
RUN 

# Add the missing devDependency
RUN yarn add @babel/plugin-proposal-private-property-in-object --dev


# Copy the entire frontend directory into the container
COPY . .

# Build the React app, ignoring the production environment to prevent dynamic import issues
RUN yarn build 
#--ignore="CI"

# Command to serve the React app (using serve as an example)
CMD ["npx", "serve", "-s", "build", "-l", "80"]
