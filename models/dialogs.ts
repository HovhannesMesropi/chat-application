import { DataTypes, Model, Sequelize } from "sequelize";

export class Dialogs extends Model {}


export const DialogsModel = (sequelize: Sequelize) => Dialogs.init({
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Dialog',
    tableName: 'dialog'
})