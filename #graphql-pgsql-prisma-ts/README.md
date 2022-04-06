

## Step 1 — Creating the Node.js Project
```
  npm init -y

  # ts
  npm i typescript ts-node @types/node -D
  create tsconfig.json

  # express
  npm i express 
  npm i @types/express -D 
```

## Setup 2 Setup graphql
```
  npm i graphql apollo-server
```



## Step 3 — Setting Up Prisma with PostgreSQL
Install primsa
```
  npm i prisma -D
  npm i @prisma/client
```

Setup PostgreSql on Heroku
```
  1. Create new app
  2. Resource -> Add-ons Select Heroku Posgres
  3. get the crednetials
```

Creating and Migrating the Database with Prisma

1. init Prisma
```
  npx prisma init
```

2. create scheme in /prisma/schema.prisma


3. Create db    
```
npx prisma db push  
```


migration, giving a name
```
  npx prisma migrate dev --name init

  npx prisma migrate dev --name add-post
```
foler `migrations` would be created, 每次执行 migrate， prisma 都会更新 prisma client，以便使用最新生成的数据类型


Open prisma GUI and add data
```
npx prisma studio
```


Seed data
```  
  npx ts-node ./prisma/seed.ts
```

## 






