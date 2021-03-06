FROM node:alpine

EXPOSE 8080

WORKDIR /sv-react

COPY sv-react/package.json /sv-react

RUN yarn install

COPY ./sv-react /sv-react

CMD ["yarn", "run", "start"]
