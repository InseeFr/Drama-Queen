FROM nginx:stable-alpine
ADD build /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
# Overload nginx.conf to enable cors
COPY nginx.conf etc/nginx/conf.d/

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

COPY ./scripts/env.sh .
COPY ./scripts/.env .

# Make shell script executable and prevent windows encoding
RUN sed -i -e 's/\r$//' env.sh && sed -i -e 's/\r$//' .env && chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
