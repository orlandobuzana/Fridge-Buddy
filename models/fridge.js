module.exports = function(sequelize, DataTypes) {
    var Fridge = sequelize.define("Fridge", {
      fridgeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Fridge.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Fridge can't be created without an Author due to the foreign key constraint
      Fridge.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),

      Fridge.hasMany(models.Items, {
        onDelete: "cascade"
      });
    };
  
    return Fridge;
};