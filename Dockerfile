FROM node:14 as build-step
RUN mkdir -p /front-end-app
WORKDIR /front-end-app
RUN npm install -g @angular/cli
COPY ./front-end/ .
RUN npm install && npm update
RUN ng build --prod

RUN mkdir -p /back-end-app
WORKDIR /back-end-app
RUN npm install -g tsc
COPY back-end/ .
RUN npm install && npm update
RUN npm run build

FROM node:14 as run
RUN curl https://musl.libc.org/releases/musl-1.2.2.tar.gz -o musl-1.2.2.tar.gz && tar -xvf musl-1.2.2.tar.gz && cd musl-1.2.2 && ./configure && make && make install
COPY --from=build-step /front-end-app/dist/front-end/ /front-end/dist/front-end/
COPY --from=build-step /front-end-app/node_modules/ /front-end/node_modules/
COPY --from=build-step /back-end-app/dist/ /back-end/
COPY --from=build-step /back-end-app/node_modules/ /back-end/node_modules/
WORKDIR /back-end/
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
