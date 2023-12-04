import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
}

export function initUser(sequelize: Sequelize): void {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    surname: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
  }, {
    tableName: 'users',
    sequelize
  });
}
