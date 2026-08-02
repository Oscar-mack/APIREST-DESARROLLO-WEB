module.exports = (sequelize, Sequelize) => {
  const Empleado = sequelize.define("empleado", { 

    identificacion: {
    type: Sequelize.STRING, // DPI o código del empleado
    allowNull: false,
    unique: true
    
    },
    informacion_personal: {
      type: Sequelize.STRING
    },
    contacto: {
      type: Sequelize.STRING
    },
    puesto_laboral: {
      type: Sequelize.STRING
    },

    fecha_ingreso: {
      type: Sequelize.DATE
    },
    
    estado: {
      type: Sequelize.BOOLEAN
    }

    
  });

  return Empleado;


  
};




