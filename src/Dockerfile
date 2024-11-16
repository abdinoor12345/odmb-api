# Step 1: Define the base image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if present) and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your application code
COPY . .

# Step 5: Expose the port the app will run on
EXPOSE 3000

# Step 6: Run the app when the container starts
CMD ["npm", "start"]
