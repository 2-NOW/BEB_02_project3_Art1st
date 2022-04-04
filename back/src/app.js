import loaders from './loaders/index.js';
import express from 'express';

async function startServer() {
  const app = express();
  await loaders({expressApp: app});
  app.listen(4000, () => {
    console.log(`🚀  Your server is listening... http://localhost:${4000}`)
  })
}

startServer();
