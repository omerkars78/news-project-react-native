import { Model, DataTypes, Sequelize } from 'sequelize';

export class Activity extends Model {
  public id!: number;
  public title!:string;
  public topic!: string;
  public content!: string;
  public validityDate!: Date;
  public userId!: number;
  public type!: boolean;
  public image!: string;
}

export function initActivity(sequelize: Sequelize): void {
  Activity.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    topic: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    image: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    validityDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: "activities",
    sequelize,
    timestamps: true, 
    paranoid: true
  });
}

export default Activity;