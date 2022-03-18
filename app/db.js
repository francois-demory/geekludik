const { Sequelize } = require('sequelize');

const client = new Sequelize(process.env.PG_URL, {
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    logging: false
});

const connect = async () => {
  try {
    await client.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();

module.exports = client;