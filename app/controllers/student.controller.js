const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` }} : null;
    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `There is no student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with id=${id}.`
            })
        })
};

exports.findGraduated = (req, res) => {
    Student.findAll({ where: { graduated: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Empty object not allowed."
        });
        return;
    }

    const student = {
        student_num: req.body.student_num,
        name: req.body.name,
        college: req.body.college,
        major: req.body.major,
        student_type: req.body.student_type,
        graduated: req.body.graduated ? req.body.graduated : false
    };

    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `The student with id ${id} was updated.`
                });
            } else {
                res.send({
                    message: `The student with id ${id} cannot be updated.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with student id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `The student with id ${id} was deleted.`
                });
            } else {
                res.send({
                    message: `The student with id ${id} cannot be deleted.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with student id ${id}`
            })
        })
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} students were deleted.`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};