const moment = require("moment")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        code: '487126349871263',
        name: 'Bolacha Água e Sal',
        description: 'Bolacha Água e Sal 120g Dalbuco',
        quantity: 20,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};