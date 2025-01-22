## Tasks

- add src/pipes/
- add src/middleware/
- add src/interceptors/

### for logger (winston) and http logging (morgan) - (done)

https://stackoverflow.com/questions/55093055/logging-request-response-in-nest-js
logger in nestjs --> logs things in nestjs,
we use interceptor(before and after) with nestjs --> to log the req and res using nestjs logger

- add logger in lib/logger
- add db config
- read https://docs.nestjs.com/techniques/configuration
- read https://docs.nestjs.com/techniques/logger

### for db setup use - (done)

https://docs.nestjs.com/recipes/sql-sequelize
https://docs.nestjs.com/recipes/sql-sequelize#getting-started
https://docs.nestjs.com/techniques/database#sequelize-integration
https://victoronwuzor.medium.com/how-to-setup-sequelize-migration-in-a-nestjs-project-b4aec1f88612

    -- make migrations
    -- run raw query
    -- run CRUD query in sequelize

### for config(env) setup - (done)

- read nestjs config

### dockerizing nestjs application

https://www.tomray.dev/nestjs-docker-production

### LOCAL DB SETUP - (docker image) - done

docker run --name postgres-db2 -d -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=pdb -e POSTGRES_USER=user -p 3005:5432 postgres
