<<<<<<< Updated upstream
const express = require('express');
=======
const express = require("express");
const {
  addUser,
  getUser,
  getUserbyId,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  getProduct,
  addProduct,
  getProductbyId,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  getCategory,
  addCategory,
  getCategorybyId,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  getProfile,
  addProfile,
  getProfilebyId,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile");
const {
  getTransaction,
  addTransaction,
  getTransactionbyId,
  updateTransaction,
  deleteTransaction,
  notification,
} = require("../controllers/transaction");
const {
  uploadImgProfile,
  uploadImgProduct,
} = require("../middleware/updaloadImage");
const { register, login, logout, checkAuth } = require("../controllers/auth");
const { auth } = require("../middleware/auth");

>>>>>>> Stashed changes
const router = express.Router();

const {addUser, getUser, getUserbyId, updateUser, deleteUser} = require('../controllers/user');

<<<<<<< Updated upstream
router.get('/user', getUser);
router.post('/user', addUser);
router.get('/user/:id', getUserbyId);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = router
=======
// Router Profile
router.get("/profile", auth, getProfile);
router.get("/profile/:id", getProfilebyId);
router.post("/profile", auth, auth, uploadImgProfile("image"), addProfile);
router.patch("/profile/:id", auth, updateProfile);
router.delete("/profile/:id", auth, deleteProfile);

// Router Transaction
router.get("/transaction", auth, getTransaction);
router.get("/transaction/:id", getTransactionbyId);
router.post("/transaction", auth, addTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

router.post("/notification", notification);

module.exports = router;
>>>>>>> Stashed changes
