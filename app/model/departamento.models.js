module.exports = (sequelize, Sequelize) => {
  const Departamento = sequelize.define("departamento", { 

    identificacion: {
      type: Sequelize.STRING,
      field: "identificación"
    },
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    encargado: {
      type: Sequelize.STRING
    },

    ubicacion: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    
    }

    
  });

  return Departamento   ;


  
};

