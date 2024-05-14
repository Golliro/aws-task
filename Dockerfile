FROM node:20.9.0-slim

WORKDIR /usr/src/app
RUN  apt-get update && apt-get -y install procps \
    && rm -rf /var/lib/apt/lists/*
COPY --chown=node:node . .

# RUN yarn &  yarn build
# CMD [ "node", "dist/main.js" ]
RUN yarn
ENTRYPOINT ["sh", "yarn start:dev"]
# "-c",


# "yarn db:migrate:up --env uat && yarn start:dev"]
# CMD ["yarn","db:migrate:up","&&","yarn", "start:dev"]
