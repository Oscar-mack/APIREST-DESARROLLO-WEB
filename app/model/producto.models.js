module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("producto", { 

    nombre: {
      type: Sequelize.STRING,
      
    },
    costo: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.STRING
    },

    status: {
      type: Sequelize.BOOLEAN
    },
    stock: {
      type: Sequelize.INTEGER
    },
    vencimiento: {
      type: Sequelize.DATE                  
    }

    
  });

  return Producto;

  
};
