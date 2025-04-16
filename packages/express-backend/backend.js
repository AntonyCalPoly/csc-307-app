// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => {
    if (name && job) {
     return user["name"] === name && user["job"] === job;
    } else if (name) {
      return user["name"] === name;
    } else if (job) {
      return user["job"] === job;
    } else {
      return true;
    }
  });
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  let result = findUserByNameAndJob(name, job);
  if (name == undefined && job == undefined) {
    res.send(users);
  } else {
    res.send({ users_list: result});
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    res.status(404).send("Resource not found.");
  } else {
    users.splice(index, 1);
    res.send("User Successfully deleted");
  }
})

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send("User created successfully");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
