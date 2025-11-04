const express = require("express");
const app = express();
const db = require("./models");
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
})

db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})

.catch((err) => {
    console.log(err);
});