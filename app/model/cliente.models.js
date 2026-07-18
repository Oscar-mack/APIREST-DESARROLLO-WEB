module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("cliente", { 

    nombre: {
      type: Sequelize.STRING,
      
    },
    apellido: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },

    ingreso: {
      type: Sequelize.DATE
    },
    telefono: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Cliente;


  
};


