docker build --tag app .
docker run --env-file ./.env -d -it -p 3000:3000 app