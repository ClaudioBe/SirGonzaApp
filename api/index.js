const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
}); 