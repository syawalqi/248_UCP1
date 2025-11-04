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

app.post("/films", async (req, res) => {
    const data = req.body;
    try {
        const films = await db.Film.create(data);
        res.send(films );
    }
    catch (err) {
        res.send({ err });
    }
});

app.get("/films", async (req, res) => {
    try {
        const films = await db.Film.findAll();
        res.send(films);
    }
    catch (err) {
        res.send({ err });
    }
});

app.put("/films/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const films = await db.Film.findByPk(id);
        if (!films) {
            return res.status(404).send({ message: "Film not found" });
        }
        await films.update(data);
        res.send({message: "Film updated successfully", films });
    }
    catch (err) {
        res.status(500).send({ err });
    }
});

app.delete("/films/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const films = await db.Film.findByPk(id);
        if (!films ) {
            return res.status(404).send({ message: "Film not found" });
        }
        await films.destroy();
        res.send({ message: "Film deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ err });
    }
});
