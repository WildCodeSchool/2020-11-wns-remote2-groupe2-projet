# Getting Started with HERMES

- Docker

TODO: --watch
TODO: encoding mysql db utf8mb4
TODO: docker file : install sequelize-cli &&

.env

```
DATABASE=<db_name>
USER=<mysql_user>
PASSWORD=<mysql_pw>
ROOT_PASSWORD=<mysql_root_pw
```

start application **chat**:

```
docker-compose up --build
```

you can see you env var with (during container running)

```
docker-compose config
```

# Tips

entrer dans un conteneur :

```
docker exec -it <nom du conteneur OU id> bash (ou ash)
```
