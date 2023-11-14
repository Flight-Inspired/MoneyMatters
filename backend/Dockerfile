#\backend
# Use a base image with Python
FROM python:3.11

# Set working directory in the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire backend directory into the container
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run your application
CMD ["python", "app.py"]
