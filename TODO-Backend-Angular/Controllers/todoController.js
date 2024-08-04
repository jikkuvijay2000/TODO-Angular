const userModel = require("../Models/users");

const getalltodo = async (req, res) => {
  const { userID } = req.params;
  try {
    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await userModel.findById(userID).populate("todos");
    res.status(200).json(user.todos);
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

const addTodo = async (req, res) => {
  const { todo } = req.body;
  const { userID } = req.params;
  // console.log(todo);
  // console.log(id);

  try {
    if (!userID || !todo) {
      res.status(401).json({ message: "Give all details" });
    }
    const user = await userModel.findById(userID);
    user.todos.push({ todo });
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

const deleteTodo = async (req, res) => {
  const { userID } = req.params;
  const { todoId } = req.body;

  // console.log(userID, todoId);

  try {
    if (!userID || !todoId) {
      return res
        .status(400)
        .json({ message: "User ID and Todo ID are required" });
    }
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

module.exports = { addTodo, deleteTodo, getalltodo };
