

## Setup

```
  npm init -y

  # ts
  npm i typescript ts-node @types/node -D
  create tsconfig.json

  # express
  npm i express 
  npm i @types/express -D 


  # graphql
  npm i graphql apollo-server


  # prisma
  npm i prisma -D
  npm i @prisma/client
```

##  Setup PostgreSql on Heroku
```
  1. Create new app
  2. Resource -> Add-ons Select Heroku Posgres
  3. get the crednetials
```


## Prisma operation
init Prisma
```
  npx prisma init
```

Create db    
```
npx prisma db push  
```

Open prisma GUI and add data
```
npx prisma studio
```

init db, migrate
```
 
  npx prisma migrate dev --name init

  npx prisma migrate dev --name add_post_table
```

Seed data
```  
  npx ts-node ./prisma/seed.ts
```







