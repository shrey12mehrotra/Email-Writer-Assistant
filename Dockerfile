# Use an official Java image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file from target folder into the container
COPY target/email-assistant-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (Spring Boot default)
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
