import { Sequelize } from 'sequelize';
import { initUser, User } from './User';
import { initActivity, Activity } from './Activity';
import config from '../config/config';

const sequelize = new Sequelize(config);

  
initUser(sequelize);
initActivity(sequelize);

User.hasMany(Activity, {
  foreignKey: 'userId',
  as: 'activities'
});
Activity.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export { sequelize, User, Activity };
