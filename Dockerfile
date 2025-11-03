# Use an official Java 21 image
FROM openjdk:21-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the Maven wrapper and pom.xml first
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (this step will cache dependencies in Docker)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the project
COPY src src

# Build the Spring Boot JAR inside the container
RUN ./mvnw clean package -DskipTests

# Expose port 8080 for Spring Boot
EXPOSE 8080

# Run the built application
ENTRYPOINT ["java", "-jar", "target/email-assistant-0.0.1-SNAPSHOT.jar"]
