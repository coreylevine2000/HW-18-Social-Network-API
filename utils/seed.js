const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUsername, getRandomEmail } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {

    const username = getRandomUsername();
    const email = getRandomEmail();

    if (
      users.filter((e) => e.username === username).length === 0 &&
      users.filter((e) => e.email === email).length === 0
    ) {
      users.push({
        username: username,
        email: email,
      });
    }
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Data seeded");
  process.exit(0);
});
