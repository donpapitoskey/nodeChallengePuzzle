console.log('process.env.DATABASE_URL >>>> ', process.env.DATABASE_URL);
module.exports =
{
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/entity/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
