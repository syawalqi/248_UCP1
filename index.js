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

app.post("/film", async (req, res) => {
    const data = req.body;
    try {
        const film = await db.Film.create(data);
        res.send(film);
    }
    catch (err) {
        res.send({ err });
    }
});

app.get("/film", async (req, res) => {
    try {
        const films = await db.Film.findAll();
        res.send(films);
    }
    catch (err) {
        res.send({ err });
    }
});

app.put("/film/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const film = await db.Film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: "Film not found" });
        }
        await film.update(data);
        res.send({message: "Film updated successfully", film });
    }
    catch (err) {
        res.status(500).send({ err });
    }
});

app.delete("/film/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const film = await db.Film.findByPk(id);
        if (!film) {
            return res.status(404).send({ message: "Film not found" });
        }
        await film.destroy();
        res.send({ message: "Film deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ err });
    }
});
