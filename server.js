const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models")
let corsOptions = {
    origin: "http://localhost:3031"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync({ force: true }).then(() => {
    console.log("Dropped existing DB.")
});


app.get("/", (req, res) => {
    res.json({ message: "Hello, Cloudtype!" });
});

require("./app/routes/student.routes")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});