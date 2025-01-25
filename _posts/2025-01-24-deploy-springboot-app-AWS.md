---
layout: post
title: "Deploy Spring Boot App on AWS"
date: 2025-01-24
comments: true
---

I want to figure out how to deploy a spring boot app on AWS. I want to do this process correctly, using containers, proper secrets management, and a proper CI/CD pipeline.

## Initial Spring Boot App
To start I'm going to create a very simple app using [Spring Initializr](https://start.spring.io/) to generate a basic project structure.

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

```Dockerfile
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

For more info: [3 Ways to Dockerize Spring Boot](https://medium.com/@ksaquib/docker-3-ways-to-dockerize-spring-boot-you-need-to-know-now-07d2e2dd7668)

## Deploying to AWS ECR

There are many ways to deploy a container to AWS as listed here [The 17 Ways to Run Containers on AWS](https://www.lastweekinaws.com/blog/the-17-ways-to-run-containers-on-aws/).

First I will push the container to a registry, namely AWS ECR, so that AWS has access to it.

One big issue I am having with AWS in general is issues with credentials. I don't feel like creating IAM users and roles and such. So I will run everything in the AWS cloud shell.

First I create a container registry in AWS ECR:
![Create ECR Repository](/assets/images/create-ecr-repository.png)

And then I select the repository and click "Push commands".
This will show a list of commands to run in the cloud shell.
The first command is to login to the ECR registry.
After this we have to upload our project to the cloud shell, which we do by clicking Actions and then "Upload files". Make sure to zip your project first, upload the zip file, and then unzip it with ```unzip <filename>.zip```. After that cd into your project directory and you can run the rest of the commands.

And now you have a container in ECR!

## Deploying to AWS ECS

Now I want to deploy the container to AWS ECS. ECS is a container orchestration service that allows you to deploy, scale, and manage containers in a cluster. A cluster is a grouping of resources that create an environment for tasks (containers) to run in.

ECS has two launch types:
- EC2: Launch your tasks on EC2 instances.
- Fargate: Launch your tasks on AWS Fargate, which is a serverless compute engine that allows you to run containers without having to manage servers.

Let's use Fargate.

First we need to create a ECS service-linked role.
Using the AWS Management Console:
- Go to the IAM Console.
- In the left menu, click Roles → Create role.
- Choose AWS Service → Elastic Container Service.
- Select Elastic Container Service use case.
- Follow the prompts to create the role.

Now we can create a cluster on AWS ECS Console.

![Create ECS Cluster](/assets/images/create-ecs-cluster.png)

Next we create a task definition.

![Create Task Definition Part 1](/assets/images/create-ecs-task-p1.png)
![Create Task Definition Part 2](/assets/images/create-ecs-task-p2.png)

And finally we create a service.

![Create Service](/assets/images/create-ecs-service.png)

You may have to create a security group for the service.
Go to VPC Console and create a security group.
Click on the default Security group ID and then click "Edit inbound rules".
Add 2 rules, one for IP version 4 and one for IP version 6.

![Create Security Group](/assets/images/inbound-rules.png)

Give it some time for the service to deploy successfully.
Select the service you created.
Move to the Tasks tab and click on one of the running tasks.
Copy the ip address and paste it in a browser. Add the port number to the ip address.
You should see this:

![Hello World](/assets/images/hello-world.png)