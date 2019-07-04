# The journey to building a full microservice app

### Author: Cleison Ferreira de Melo @cleisommais

 I will share my journey creating a POC to build a full microservice app. Full microservice means that I plan to build components in the front-end and back-end side separately, **to help CI/CD process** inside of the agile teams. Was 24 articles and several hours until reach the final result. I hope you enjoy it.


[![Angular](https://img.shields.io/badge/Angular-8.0.0-DD0031.svg)](https://angular.io/)
[![Single-spa](https://img.shields.io/badge/Single_spa-3.0.0.beta-0011FF.svg)](https://single-spa.js.org/)
[![Node](https://img.shields.io/badge/Node-10.15.0-43853D.svg)](https://nodejs.org/en/)
[![Express](https://img.shields.io/badge/Express-4.16.0-2EA1FF.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.0-10AA50.svg)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-5.0.5-A41F16.svg)](https://redis.io/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.8-FF6600.svg)](https://www.rabbitmq.com/)

 ### Links articles published

* https://www.linkedin.com/pulse/journey-building-full-microservice-app-begin-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-dev-env-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-model-routes-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-docker-compose-cleison/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-implementing-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-front-end-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-routes-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-products-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-product-add-ferreira-de-melo/ 
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-component-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-product-edit-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-connection-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-using-redis-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-rabbitmq-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-server-broker-cleison/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-client-send-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-new-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-order-cleison/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-api-ferreira-de-melo/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-ferreira-de-melo-1c/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-changing-micro-cleison/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-creating-micro-cleison/
* https://www.linkedin.com/pulse/journey-building-full-microservice-app-management-all-cleison/


### Docker commands

- *Remove all Docker images*: `docker system prune -a`
- *Remove all Docker volumes*: `docker volume rm $(docker volume ls -q -f dangling=true)`
- *Start and update all services in Docker-compose file*: `docker-compose up --build -d`
- *Stop all services started*: `docker-compose down`

### Important to know

- The details about the projects are documented inside each project
- To see the final result just run `docker-compose up --build -d` inside root project folder

> Success is a journey, not a destination. The doing is often more important than the outcome. Arthur Ashe

_Good luck_

_Cleison Ferreira de Melo_
