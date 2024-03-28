FROM nginx
RUN rm -rf /usr/share/nginx/html/*

ADD dist /usr/share/nginx/html

RUN rm etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]