import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { tela } from "../../models/tela"; // Importe seu modelo aqui
import telaService from "../telaService";

const mockData = [
  {
    socketId: "socket1",
    bloqueada: false,
    dataEntrada: new Date("2024-02-25T10:00:00.000Z"),
    ultimaAtualizacao: new Date("2024-02-25T10:00:00.000Z"),
  },
  {
    socketId: "socket2",
    bloqueada: true,
    dataEntrada: new Date("2024-02-25T11:00:00.000Z"),
    ultimaAtualizacao: new Date("2024-02-25T11:00:00.000Z"),
  },
];

let mongoServer;
let connection;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  connection = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await tela.deleteMany({});
  await tela.insertMany(mockData);
});

afterEach(async () => {
  await tela.deleteMany({});
});

afterAll(async () => {
  await connection.disconnect();
  await mongoServer.stop();
});

describe("Tela Service", () => {
  describe("adicionarFilaRegistro", () => {
    it("deve adicionar um novo registro à fila", async () => {
      const result = await telaService.adicionarFilaRegistro("socket3");
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty(
        "message",
        "Novo registro adicionado à fila com sucesso."
      );

      const registro = await tela.findOne({ socketId: "socket3" });
      expect(registro).toBeTruthy();
    });

    it("deve retornar um erro se falhar ao adicionar o registro", async () => {
      jest.spyOn(tela.prototype, "save").mockImplementation(() => {
        throw new Error("Erro ao salvar registro");
      });

      const result = await telaService.adicionarFilaRegistro("socket3");
      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty(
        "message",
        "Erro ao adicionar novo registro à fila."
      );
    });
  });

  describe("encontrarSocketIdDataMaisAntiga", () => {
    it("deve retornar o socketId do registro com a data de entrada mais antiga", async () => {
      const result = await telaService.encontrarSocketIdDataMaisAntiga();
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("socketId", "socket1");
    });

    it("deve retornar um erro se falhar ao encontrar o registro", async () => {
      jest.spyOn(tela, "findOne").mockImplementation(() => {
        throw new Error("Erro ao encontrar registro");
      });

      const result = await telaService.encontrarSocketIdDataMaisAntiga();
      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty(
        "message",
        "Erro ao encontrar registro com a data mais antiga."
      );
    });
  });

  describe("verificarRegistrosOcupados", () => {
    it("deve retornar false se não houver registros ocupados", async () => {
      await tela.insertMany([{ socketId: "socket3", bloqueada: false }]);

      const result = await telaService.verificarRegistrosOcupados();
      expect(result).toBe(false);
    });

    it("deve retornar false se não houver registros ocupados", async () => {
      await tela.deleteMany({});

      const result = await telaService.verificarRegistrosOcupados();
      expect(result).toBe(false);
    });

    it("deve retornar false se ocorrer um erro ao verificar registros", async () => {
      jest.spyOn(tela, "exists").mockImplementation(() => {
        throw new Error("Erro ao verificar registros");
      });

      const result = await telaService.verificarRegistrosOcupados();
      expect(result).toBe(false);
    });
  });
});
