#!/bin/bash
docker image rm xin_manage_api:latest
docker build -t xin_manage_api:latest .
docker rm -f xin_manage_api
docker run -it -d --name xin_manage_api --restart always -p 6800:6800 --network apps --link nginx-proxy --link letsencrypt-nginx-proxy --env TZ=Asia/Ho_Chi_Minh -e VIRTUAL_HOST="api.3rdapis.com" -e VIRTUAL_PORT=6800 -e LETSENCRYPT_HOST="api.3rdapis.com" -e LETSENCRYPT_EMAIL="3rdapis@gmail.com" xin_manage_api:latest
docker system prune -f