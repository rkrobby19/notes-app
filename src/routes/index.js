const { addNoteHandler } = require("../controllers");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
];

module.exports = routes;
