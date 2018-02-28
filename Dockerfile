# shengxiang/mobile:test
FROM docker-registry.ywqian.com:5000/suancloud/nginx4angular
LABEL maintainer="linwh@suancloud.cn"

RUN rm -rf /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
