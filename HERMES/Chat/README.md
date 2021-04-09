# Required:

node v12.18.3

nodemon -g

# Getting Started with HERMES

.env

```
DATABASE=<db_name>
USER=<mysql_user>
PASSWORD=<mysql_pw>
ROOT_PASSWORD=<mysql_root_pw>
```

# Start client server : 
```
npm start
```

# Start api server : 
```
nodemon serveur.js
```

# Gestion base de donnée :

clean BDD:
```
sequelize db:migrate:undo:all
```

création des tables : 
```
sequelize db:migrate
```


# Tips

entrer dans un conteneur :

```
docker exec -it <nom du conteneur OU id> bash (ou ash)
```
