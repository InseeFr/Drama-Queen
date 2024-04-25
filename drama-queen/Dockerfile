
FROM nginxinc/nginx-unprivileged:1.25-alpine

# Non root user
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx

USER $NGINX_USER_ID

# Add build to nginx root webapp
COPY --chown=$NGINX_USER:$NGINX_USER dist /usr/share/nginx/html

# Copy nginx configuration
RUN rm etc/nginx/conf.d/default.conf
COPY --chown=$NGINX_USER:$NGINX_USER nginx.conf etc/nginx/conf.d/

COPY --chown=$NGINX_USER:$NGINX_USER entrypoint.sh /entrypoint.sh
RUN chmod 755 /usr/share/nginx/html/vite-envs.sh

USER $NGINX_USER_ID
EXPOSE 8080

# Start Nginx server
ENTRYPOINT ["/usr/share/nginx/html/vite-envs.sh"]
CMD ["nginx", "-g", "daemon off;"]