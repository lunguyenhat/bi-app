# AesirX BI

AesirX BI is our Open Source Business Intelligence as a Service (BIaaS) Solution

It allows you to successfully gain legal 1st-party data insights for your business across multiple platforms and devices.

Safeguard your data and your customers' privacy with our Web Analytics solution (a Google Analytics alternative) that’s fully GDPR compliant and built on privacy by design; AesirX BI enables data-driven marketing in a privacy-first world.

Designed for easy integration, all data is collected through the AesirX JS Data Collector which is installed 1st-party on your website or application.

Find out more in [https://bi.aesirx.io](https://bi.aesirx.io)

## Setup instructions

### Setup the 1st party server

Follow the instructions in: [https://github.com/aesirxio/analytics-1stparty/tree/master](https://github.com/aesirxio/analytics-1stparty)

### Setup the Analytics JS Collector

Follow the instructions in: [https://github.com/aesirxio/analytics/tree/master](https://github.com/aesirxio/analytics-1stparty)

### Configure this project

1. Run `yarn install` to install the dependencies.
1. Rename the `.env.dist` file to `.env`.
1. Replace the `REACT_APP_BI_ENDPOINT_URL` in the `.env` file with the link to your `1st party server for AesirX Analytics`.
1. Replace the `REACT_APP_DATA_STREAM` in the `.env` file with the `name` and `domain` to the your data-stream endpoint.
1. Replace the `REACT_APP_DEFAULT_USER` in the `.env` file with the user that you want to set for Login.
1. Replace the `REACT_APP_DEFAULT_PASSWORD` in the `.env` file with the password that you want to set for Login.

### Development

1. Run  `yarn dev`
1. Open [http://localhost:3000](http://localhost:3000) - 3000 is `PORT` to view it in the browser.

### Production
##### Run on a webserver
1. Run `yarn build` after changed `.env` file.
2. Upload `build` folder to webserver.

##### Dockerize
Run `docker compose -f "docker-compose.yml" up -d --build` after changed `.env` file.