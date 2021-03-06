const express = require("express");
const joi = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  const schema = {
    name: joi.string().min(3).required(),
  };
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});
const validateCourse = (course) => {
  const schema = {
    name: joi.string().min(3).required(),
  };
  return joi.validate(course, schema);
};

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  const indexOfCourse = courses.indexOf(course);

  courses.splice(indexOfCourse, 1);
  res.send(course);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port 5000"));
