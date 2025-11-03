# Use an official Java 21 image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and config first
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# ✅ Give execute permission to mvnw
RUN chmod +x mvnw

# Download dependencies (cache layer)
RUN ./mvnw dependency:go-offline -B

# Copy rest of the source code
COPY src src

# Package the app
RUN ./mvnw package -DskipTests

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "target/email-assistant-0.0.1-SNAPSHOT.jar"]
