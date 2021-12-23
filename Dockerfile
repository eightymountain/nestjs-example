FROM node:17.3-alpine
LABEL maintainer="eightymountain"

RUN apk add --no-cache bash tzdata

# time
ARG TZ="Asia/Seoul"
ENV TZ="Asia/Seoul"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# source
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.build.json .
COPY ./tsconfig.json .
COPY ./ormconfig.json .
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh \
  && yarn

COPY . .

CMD [ "bash", "-c", "/wait-for-it.sh $DB_URL:3306 --strict -- yarn start:prod"]