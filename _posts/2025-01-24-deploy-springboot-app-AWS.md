---
layout: post
title: "Deploy Spring Boot App on AWS"
date: 2025-01-24
comments: true
---

I want to figure out how to deploy a spring boot app on AWS. I want to do this process correctly, using containers, proper secrets management, and a proper CI/CD pipeline.

## Initial Spring Boot App
To start I'm going to create a very simple app using Spring Initializr (https://start.spring.io/) to generate a basic project structure.

![Spring Initializr](/assets/images/spring-initializr.png)

Simple REST controller that responds to HTTP requests.

![Simple REST controller](/assets/images/rest-controller.png)

Need to make sure that Maven will create a JAR file. In the pom.xml file, I need to make sure that the packaging is set to JAR.
```xml
<packaging>jar</packaging>
```

Now we can create a JAR file by running the following command in the terminal:
```bash
./mvnw clean install
```
- ```./mvnw``` calls the Maven wrapper script.
- ```clean``` cleans the project directory by removing all files created by previous builds.
- ```install``` compiles the project, runs any tests, and packages it into a JAR file located in the target directory. It also installs the JAR file into the local Maven repository.

## Containerize the Spring Boot App
Next we want to containerize the spring boot app using Docker.

First need to understand how to use docker to create a container. 

Docker is a platform that allows you to build, package and run applications in an isolated enviroment, ie a container.

Let's create a simple Dockerfile.

```dockerfile
# Start with a base image containing Java runtime
FROM openjdk:21-jdk-slim

# Add the application's jar to the image
COPY target/tempo-0.0.1-SNAPSHOT.jar tempo-0.0.1-SNAPSHOT.jar

# Command to execute the application
ENTRYPOINT ["java", "-jar", "tempo-0.0.1-SNAPSHOT.jar"]
```

To build the image, run the following command:
```bash
docker build -t tempo-app .
```
The above command builds a Docker image named "tempo-app" using the Dockerfile in the current directory (.).

To run the container, run the following command:
```bash
docker run -p 8080:8080 tempo-app
```
The above command:
- Creates and starts a container from the tempo-app image
- Maps port 8080 from the container to port 8080 on your host machine
- Your Spring Boot application will be accessible at http://localhost:8080

To run the container in detached mode, run the following command:
```bash
docker run -d -p 8080:8080 tempo-app
```

To list all running containers, run the following command:
```bash
docker ps
```

To list all containers, run the following command:
```bash
docker ps -a
```

To stop a running container, run the following command:
```bash
docker stop <container_id>
```

To remove a container, run the following command:
```bash
docker rm <container_id>
```

For more info: https://medium.com/@ksaquib/docker-3-ways-to-dockerize-spring-boot-you-need-to-know-now-07d2e2dd7668

