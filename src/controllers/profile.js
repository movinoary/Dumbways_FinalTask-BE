const { profile } = require("../../models");

exports.addProfile = async (req, res) => {
  try {
    await profile.create(req.body);
    const { ...data } = req.body;

    const newProfile = await profile.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
    });

    let profileData = await profile.findOne({
      where: {
        id: newProfile.id,
      },
    });

    profileData = JSON.parse(JSON.stringify(profileData));
    res.send({
      status: "Success",
      data: {
        ...profileData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await profile.findOne({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    let FILE_PATH = "http://localhost:5000/public/profile/";
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: FILE_PATH + data.image,
    };

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProfilebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await profile.findOne({
      where: {
        id: id,
      },
    });

    let FILE_PATH = "http://localhost:5000/public/profile/";
    data = JSON.parse(JSON.stringify(data));

    data = data.map(item => {
      return {
        ...item,
        image: FILE_PATH + item.image,
      };
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

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await profile.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update profile id: ${id}`,
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

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await profile.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete profile id:${id}`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
