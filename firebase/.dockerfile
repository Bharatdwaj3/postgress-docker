FROM node:20-slim

# Install Java 21 (required for current firebase-tools Storage emulator)
RUN apk add --no-cache openjdk21-jre bash

# Install firebase-tools
RUN npm install -g firebase-tools

WORKDIR /app

# Copy config files
COPY firebase.json storage.rules ./

# Create data dir
RUN mkdir -p /app/firebase-data

EXPOSE 4000 9099 9199

CMD ["firebase", "emulators:start", "--import=/app/firebase-data", "--export-on-exit=/app/firebase-data"]