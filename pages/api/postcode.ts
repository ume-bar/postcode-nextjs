import { Sequelize, Model, DataTypes } from 'sequelize';

//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
const sequelize = new Sequelize({
  database: 'postcode',
  username: 'umehara',
  password: null,
  dialect: 'postgres',
  port: 5432,
  host: 'localhost',
  timezone: 'Asia/Tokyo',
});


class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

export default async(req, res) => {
  await sequelize.sync();
  if (0 === await User.count()){
    await User.create({
      username: 'umehara',
      birthday: new Date(1982, 9, 14)
    })
  }
  const users = await User.findAll({
    //where: {
    //  username: 'umehara',
    //}
  });
  res.status(200).send(JSON.stringify(users.map((user)=>user)))
}