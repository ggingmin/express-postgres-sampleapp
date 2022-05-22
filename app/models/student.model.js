const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Student = sequelize.define("student", {
        student_num: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        college: {
            type: DataTypes.STRING
        },
        major: {
            type: DataTypes.STRING
        },
        student_type: {
            type: DataTypes.ENUM('UNDERGRADUATE', "GRADUATE", "EXCHANGE")
        },
        graduated: {
            type: DataTypes.BOOLEAN
        }
    });
    return Student;
}