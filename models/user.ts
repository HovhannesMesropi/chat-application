import { DataTypes, Model, Sequelize } from "sequelize";
import { hash } from 'bcrypt';
export class User extends Model {
    static async getAllUsers() {
        return await this.findAll();
    }

    static async registerUser(nickname: string, password: string): Promise<boolean> {
        password = await hash(password, 10);

        try {
            await this.create({
                nickname,
                password
            })
        }catch(err){
            return false;
        }

        
        return true
    }
}


export const UserModel = (sequelize: Sequelize) => User.init({
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
})