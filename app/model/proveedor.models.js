module.exports = (sequelize, Sequelize) => {
  const Proveedor = sequelize.define("proveedor", { 

    identificacion: {
      type: Sequelize.STRING,
      
    },
    nombre_proveedor: {
      type: Sequelize.STRING
    },
    ubicacion: {
      type: Sequelize.STRING
    },
    contacto: {
      type: Sequelize.STRING
    },

    producto_servicio: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.BOOLEAN
    }

    
  });

  return Proveedor ;


  
};


