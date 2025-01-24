---
layout: post
title: "Deploy Spring Boot App on AWS"
date: 2025-01-24
comments: true
---

# 2:00pm 
I want to figure out how to deploy a spring boot app on AWS. To start I'm going to create a very simple app using Spring Initializr (https://start.spring.io/) to generate a basic project structure.

![Spring Initializr](assets/images/Screenshot 2025-01-24 at 2.43.08 PM.png)

Simple REST controller that responds to HTTP requests.

![Simple REST controller](assets/images/Screenshot 2025-01-24 at 2.46.35 PM.png)

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

Next we want to containerize the spring boot app using Docker.

First need to understand how to use docker to create a container. 

Docker is a platform that allows you to build, package and run applications in an isolated enviroment, ie a container.