// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userServices.getUsers(name, job)
    .then(users => res.send({ users_list: users }))
    .catch(err => res.status(500).send(err.message));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.findUserById(id)
    .then(user => {
      if (!user) res.status(404).send("Resource not found.");
      else res.send(user);
    })
    .catch(err => res.status(500).send(err.message));
});

app.post("/users", (req, res) => {
  const user = req.body;
  userServices.addUser(user)
    .then(savedUser => res.status(201).send(savedUser))
    .catch(err => res.status(400).send(err.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.findUserById(id)
    .then(user => {
      if (!user) return res.status(404).send("Resource not found.");
      return user.deleteOne().then(() => res.status(204).send());
    })
    .catch(err => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
