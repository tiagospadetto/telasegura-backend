import { io } from "../app.js";
import telaService from "./telaService.js";

io.on("connection", (socket) => {
  socket.on("bloqueia", async (callback) => {
    console.log("Colocando usuario na lista", socket.id);
    //Adiciona na Fila o sokcetID
    const existeRegistroOcupado =
      await telaService.verificarRegistrosOcupadosBloqueiaTela(socket.id);

    console.log(existeRegistroOcupado);
    callback({
      liberado: existeRegistroOcupado,
    });
  });

  socket.on("verifica", async (callback) => {
    console.log("Verificando se o usuario esta bloqueado a tela", socket.id);

    const destino = await telaService.verficaSessao(socket.id);

    console.log(destino);

    callback({
      liberado: destino,
    });
  });

  socket.on("liberatela", async (id) => {
    
    await telaService.deletarRegistrosOcupados();

    console.log("deletando arquivos");

    const socktIdLibera = (await telaService.encontrarSocketIdDataMaisAntiga()).socketId;

    await telaService.editarOcupadoParaTrue(socktIdLibera);


    io.to(socktIdLibera).emit("acessa", "Tela livre");
  });

  socket.on("ultimaAtualizacao", async (id) => {
    
    await telaService.atualizarUltimaSessao(socket.id);

  });

});
