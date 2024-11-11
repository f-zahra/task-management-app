const { faker } = require("@faker-js/faker");
const User = require("./models/User");
const Task = require("./models/Task");
var db = require("./db");

async function populate_db() {
  db();
  try {
    // Delete any existing users and tasks
    await User.deleteMany();
    await Task.deleteMany();

    // Create some users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
      users.push(await user.save());
    }

    console.log(`${users.length} users created`);

    // Create some tasks linked to the users
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const task = new Task({
        description: faker.lorem.sentence(),
        dueDate: faker.date.future(),
        status: ["Not Started", "In Progress", "Completed"][
          Math.floor(Math.random() * 3)
        ],
        priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        user: randomUser._id, // Assign a random user
      });
      await task.save();
    }

    console.log("Tasks created and linked to users");
  } catch (error) {
    console.log(error);
  }
}

populate_db();
