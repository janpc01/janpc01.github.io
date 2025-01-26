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

![Animated GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjJueW83bXZiZWZ1NndveG42eGRndGkyNG5mYWF2bnJha2pkYTNobyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lqRu0AbfzcpMJlmT2I/giphy.gif)

Some decent info here: [Deploying a container with Amazon ECS](https://kevinkiruri.medium.com/deploying-a-container-with-amazon-ecs-d95dcab8b411).

[Deploy a Spring Boot application to AWS ECS](https://hkcodeblogs.medium.com/deploy-a-spring-boot-application-to-aws-ecs-91742a32a5f1)

## January 25, 2025

## Deploying to AWS ECS with GitHub Actions

Resources:
- [ECS Deployments with GitHub Actions](https://medium.com/@octavio/ecs-deployments-with-github-actions-dd34beed6528)
- [Deploying to Amazon Elastic Container Service](https://docs.github.com/en/actions/use-cases-and-examples/deploying/deploying-to-amazon-elastic-container-service?source=post_page-----dd34beed6528--------------------------------)


Next I want to set up a CI/CD pipeline with GitHub Actions.

First we need to generate AWS credentials.

1. Log in to AWS Management Console
Go to the IAM Console.
2. Select Your User
Click on Users in the left sidebar.
Select the IAM user for which you want the access keys.
3. Manage Access Keys
In the User details page, go to the Security credentials tab.
Scroll down to the Access keys section.
4. Create a New Access Key
If no access keys exist:
- Click Create access key.
  - Choose the access key type:
    - Command Line Interface (CLI), SDK, and API.
![Create Access Key](/assets/images/create-aws-access-key.png)

  - Click Next, then Create.
  - Download the .csv file with your Access Key ID and Secret Access Key.
- If an access key already exists but is inactive:
  - Reactivate it by clicking the Activate button.

Now we can create a .github/workflows/aws.yml file in our github repository.
```yaml
name: Deploy to Amazon ECS

on:
  push:
    branches:
      - main

env:
  AWS_REGION: us-east-1 # set this to your region
  ECR_REPOSITORY: tempo # set this to your repository name

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment: development # this might have to be "production"

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: Cache Maven dependencies
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: |
            ${{ runner.os }}-m2

      - name: Build with Maven
        run: mvn clean package -DskipTests

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@0e613a0980cbf65ed5b322eb7a1e075d28913a83
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@62f4f872db3836360b72999f4b87f1ff13310f3a

      - name: Build, tag, and push image to Amazon ECR
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          # Build a docker container and
          # push it to ECR so that it can
          # be deployed to ECS.
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT
```

Now we can commit and push our changes to the repository.
You can check in the ECR registry to confirm the image is there.

Next 