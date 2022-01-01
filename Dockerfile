FROM node:14.8.0-alpine3.12 as builder
WORKDIR /src/code
COPY . /src/code
RUN apk add make
ENV NODE_ENV=production
RUN npm ci --production && make build-front


FROM python:3.8.5-slim-buster

WORKDIR /usr/src/app

COPY . .

RUN pip install -r requirements.txt

COPY --from=builder /src/code/public/css/* public/css/
COPY --from=builder /src/code/public/fonts/* public/fonts/
COPY --from=builder /src/code/public/images/* public/images/
COPY --from=builder /src/code/public/*.js public/

EXPOSE 8000

ENTRYPOINT [ "sh", ".bin/start.sh" ]
