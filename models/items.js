module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      itemDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
    },

        intemQt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
              len: [1]
            } 
        }
    });
  
    Items.associate = function(models) {
      // We're saying that a Items should belong to an Fridge
      // A Item can't be created without an Fridge due to the foreign key constraint
      Items.belongsTo(models.Fridge, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Items;
};