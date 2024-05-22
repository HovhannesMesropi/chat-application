import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    static async getAllUsers() {
        return await this.findAll();
    }
}


export const UserModel = (sequelize: Sequelize) => User.init({
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
})