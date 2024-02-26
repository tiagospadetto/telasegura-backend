import mongoose from "mongoose";

const telaSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    socketId: { type: String, required: true, unique: true },
    bloqueada: { type: Boolean, default: false }, 
    dataEntrada: { type: Date, default: Date.now },
    ultimaAtualizacao: { type: Date }
  },
  { versionKey: false }
);

const tela = mongoose.model("telas", telaSchema);

export { tela, telaSchema };
