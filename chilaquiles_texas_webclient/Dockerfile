FROM node:24-alpine3.21
WORKDIR /app

COPY package*.json /app
COPY ./build /app


RUN which npm; \
    if [ $? -ne 0 ]; then \
        apk add --no-cache npm; \
    fi

RUN npm ci --omit dev

ENV PORT=1367
EXPOSE 1367

CMD ["node", "."]