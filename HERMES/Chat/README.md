# Required:

node v12.18.3

nodemon -g

# Getting Started with HERMES

voir .env.dist de chaque fichier

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

Par **Adrien Bruno Moshtagh Victor**