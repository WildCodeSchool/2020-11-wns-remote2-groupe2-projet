# Getting Started with HERMES

.env

```
DATABASE=<db_name>
USER=<mysql_user>
PASSWORD=<mysql_pw>
ROOT_PASSWORD=<mysql_root_pw>
```

start application **chat**:

```
docker-compose up --build
```

you can see your env var with (during container running)

```
docker-compose config
```

# Tips

entrer dans un conteneur :

```
docker exec -it <nom du conteneur OU id> bash (ou ash)
```
