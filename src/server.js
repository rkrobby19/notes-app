require("dotenv").config();
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const routes = require("./routes");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
