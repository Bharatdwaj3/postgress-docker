# Use Node.js image directly - no apt-get needed
FROM node:20-alpine

# Install firebase-tools
RUN npm install -g firebase-tools@latest

# Set working directory
WORKDIR /app

# Copy firebase configuration files
COPY firebase.json .firebaserc ./

# Create data directory
RUN mkdir -p firebase-data

# Start Firebase emulators
CMD ["firebase", "emulators:start", "--project", "books-library", "--only", "auth,storage", "--import", "./firebase-data", "--export-on-exit"]