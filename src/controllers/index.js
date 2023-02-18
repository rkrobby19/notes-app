const Note = require("../models/note");

const addNoteHandler = async (request, h) => {
  const { title, tags, body } = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const note = new Note({
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  });

  await note.save();

  const response = h.response({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    data: { noteId: note.id },
  });
  response.code(201);
  return response;
};

const getAllNotesHandler = async (request, h) => {
  const notes = await Note.find();
  const response = h.response({
    message: "Success",
    data: { notes },
  });

  return response;
};

const getNoteByIdHandler = async (request, h) => {
  const { id } = request.params;

  const note = await Note.findById(id);

  if (note !== null) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = async (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const note = await Note.findByIdAndUpdate(id, {
    title,
    tags,
    body,
    updatedAt,
  });

  if (note !== null) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = async (request, h) => {
  const { id } = request.params;

  const note = await Note.findByIdAndDelete(id);

  if (note !== null) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
