<<<<<<< Updated upstream
const {user} = require('../../models');
=======
const { user, profile } = require("../../models");
>>>>>>> Stashed changes

exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);

    res.send({
      status: "success",
      message: "Add user",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUser = async (req, res) => {
<<<<<<< Updated upstream
    // code here
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });

        // `SELECT name,email, status, id FROM`
        res.send({
            status: "success",
            data: {
                users
            }
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
=======
  try {
    let data = await user.findAll({
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    let FILE_PATH = "http://localhost:5000/public/profile/";
    data = JSON.parse(JSON.stringify(data));

    data = data.map(item => {
      return {
        ...item,
        profile: {
          ...item.profile,
          image: "http://localhost:5000/public/profile/" + item.profile,
        },
      };
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
>>>>>>> Stashed changes
};

exports.getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update user id: ${id}`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

<<<<<<< Updated upstream
        res.send({
            status: "success",
            message: `Delete user id:${id}`
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
};
=======
    res.send({
      status: "success",
      message: `Delete user id:${id}`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
>>>>>>> Stashed changes
