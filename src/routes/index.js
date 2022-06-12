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

const router = express.Router();

// Router
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/check-auth", auth, checkAuth);

// Router User
router.get("/user", auth, getUser);
router.get("/user/:id", getUserbyId);
router.post("/user", addUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Router Product
router.get("/product", getProduct);
router.get("/product/:id", getProductbyId);
router.post("/product", auth, uploadImgProduct("image"), addProduct);
router.patch("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// Router Category
router.get("/category", getCategory);
router.get("/category/:id", getCategorybyId);
router.post("/category", addCategory);
router.patch("/category/:id", auth, updateCategory);
router.delete("/category/:id", auth, deleteCategory);

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
