# Slim Alpine base with Java 21 JRE (Eclipse Temurin)
FROM eclipse-temurin

# Install Node.js 20, npm, and curl (Alpine package manager: apk)
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && npm install -g firebase-tools@latest \
    && npm install -g npm@latest  # Ensures latest npm

# Optional: Verify versions during build
RUN java -version && node -v && firebase --version

WORKDIR /app

# Copy your config files
COPY firebase.json .firebaserc storage.rules ./

# Create persistent data directory
RUN mkdir -p /app/firebase-data

# Expose emulator ports
EXPOSE 4000 9099 9199

# Healthcheck for Emulator UI
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=5 \
    CMD curl -f http://localhost:4000 || exit 1

# Start only Auth and Storage emulators
CMD ["firebase", "emulators:start", \
    "--only", "auth,storage", \
    "--project", "demo-project", \
    "--import", "./firebase-data", \
    "--export-on-exit", "./firebase-data"]