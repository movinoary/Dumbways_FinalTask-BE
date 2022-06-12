const { chats, profile, user } = require("../../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// on = penerima informasi/event
// emit = pengirim informasi

const connectedUser = {};

const socketIo = io => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", socket => {
    console.log("client connect: ", socket.id);

    const userId = socket.handshake.query.id;
    connectedUser[userId] = socket.id;

    // load data admin
    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        socket.emit("admin contact", adminContact);
      } catch (error) {
        console.log(error);
      }
    });

    // load data customer
    socket.on("load customer contacts", async () => {
      try {
        let customerContacts = await user.findAll({
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
              },
            },
            {
              model: chats,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
            {
              model: chats,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
          where: {
            status: "customer",
          },
        });

        customerContacts = JSON.parse(JSON.stringify(customerContacts));
        customerContacts = customerContacts.map(item => ({
          ...item,
          image: item.image
            ? "http://localhost:5000/public/profile/" + item.image
            : null,
        }));

        socket.emit("customer contacts", customerContacts);
      } catch (error) {
        console.log(error);
      }
    });

    // yang kirim pesen
    socket.on("load messages", async payload => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.TOKEN_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idRecipient = payload; // menangkap data id dari client
        const idSender = verified.id;

        const data = await chats.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender],
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender],
            },
          },
          include: [
            {
              model: user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [["createdAt", "ASC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          },
        });
        socket.emit("messages", data);
      } catch (error) {
        console.log(error);
      }
    });

    // buat kirim pesen
    socket.on("send message", async payload => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.TOKEN_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idSender = verified.id;

        const { message, idRecipient } = payload;

        await chats.create({
          message,
          idRecipient,
          idSender,
        });

        io.to(socket.id)
          .to(connectedUser[idRecipient])
          .emit("new message", idRecipient);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
    });
  });
};

module.exports = socketIo;
