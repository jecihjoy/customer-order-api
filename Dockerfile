FROM node:7

COPY . /app/customer-order-webservice

RUN cd /app/customer-order-webservice && npm install 

CMD ["node", "/app/customer-order-webserviceindex.js" ]
