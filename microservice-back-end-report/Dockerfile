# The builder from node image
FROM node:12-alpine as builder
# Move our files into directory name "app"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .  .
# Build 
RUN npm run build
###################################################
# The server node
FROM node:12-alpine
WORKDIR /usr/src/app
# Copy the build from builder image
COPY --from=builder /usr/src/app/dist/ ./
COPY package*.json ./
RUN npm install
RUN ls -l
CMD ["npm", "start"]
