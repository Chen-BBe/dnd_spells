FROM ubuntu:20.04

# installing the necessary tools
RUN apt-get update && apt-get install -y curl

# setup node env
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs

# add src folder & files
ADD src src/
ADD public public/
ADD package.json ./
ADD package-lock.json ./

# install all dependencies
RUN npm install --production

# build
RUN npm run build

# install serve
RUN npm install -g serve