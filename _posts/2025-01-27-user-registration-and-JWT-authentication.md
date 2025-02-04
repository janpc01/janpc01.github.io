---
layout: post
title: "User Registration and JWT Authentication"
date: 2025-01-27
comments: true
---

After deploying a simple spring boot app on AWS, I want to add user registration and JWT authentication.
Resources:
- [Building a user registration and JWT authentication service with Spring Boot 3: Part 1](https://medium.com/@max.difranco/building-a-user-registration-and-jwt-authentication-service-with-spring-boot-3-66cf76233204)
- [Building a user registration and JWT authentication service with Spring Boot 3: Part 2](https://medium.com/@max.difranco/user-registration-and-jwt-authentication-with-spring-boot-3-part-2-email-verification-otp-9613e90437aa)
- [Building a user registration and JWT authentication service with Spring Boot 3: Part 3](https://medium.com/@max.difranco/user-registration-and-jwt-authentication-with-spring-boot-3-part-3-refresh-token-logout-ea0704f1b436)
- [GitHub Repository for user registration and JWT authentication](https://github.com/dfjmax/user-authentication-service-jwt/tree/main)


After going through all that and testing locally, it's time to deploy to AWS. So now I need to figure out how to setup postgresql database, Redis and Mailhog services. This will also require setting up secret managment.

## Setup PostgreSQL Database
Resources:
- [Host PostgreSQL on ECS Fargate(Spot) using AWS Secrets Manager, AWS NLB and EFS](https://medium.com/@harsugangwar/host-postgresql-on-ecs-fargate-spot-using-aws-secrets-manager-aws-nlb-and-efs-af51244f831a)

## Setup Redis

## Setup Mailhog

## Setup Secret Management

## Setup CI/CD Pipeline

- [IntegrationNinjas](https://www.youtube.com/@IntegrationNinjas)
- [AWS CI/CD Pipeline](https://www.youtube.com/watch?v=OMn866JBEtQ&t=3s)