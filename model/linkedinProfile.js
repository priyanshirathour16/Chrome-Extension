const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("userProfile", "root", "PUS#16push4", {
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ");
  });

const LinkedInProfile = sequelize.define("LinkedInProfile", {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  connectionCount: DataTypes.INTEGER,
});
sequelize
  .sync()
  .then(() => {
    console.log("Linkedin profile table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ");
  });

module.exports = LinkedInProfile;
