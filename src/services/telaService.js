import { tela } from "../models/tela.js";

const telaService = {
  // Função para adicionar um registro à fila
  async adicionarFilaRegistro(socketId) {
    try {
      const novoRegistro = new tela({
        socketId,
        ocupado: false,
        dataEntrada: new Date(),
        ultimaAtualizacao: new Date(),
      });
      await novoRegistro.save();
      return {
        success: true,
        message: "Novo registro adicionado à fila com sucesso.",
      };
    } catch (error) {
      console.error("Erro ao adicionar novo registro à fila:", error);
      return {
        success: false,
        message: "Erro ao adicionar novo registro à fila.",
      };
    }
  },

  // Função para encontrar o socketId do registro com a dataEntrada mais antiga
  async encontrarSocketIdDataMaisAntiga() {
    try {
      const registroMaisAntigo = await tela.findOne(
        {},
        {},
        { sort: { dataEntrada: 1 } }
      );
      if (registroMaisAntigo) {
        return { success: true, socketId: registroMaisAntigo.socketId };
      }
    } catch (error) {
      console.error(
        "Erro ao encontrar registro com a data mais antiga:",
        error
      );
      return {
        success: false,
        message: "Erro ao encontrar registro com a data mais antiga.",
      };
    }
  },

  // Função para editar o campo ocupado para true com base no socketId
  async editarOcupadoParaTrue(socketId) {
    try {
      const resultado = await tela.updateOne({ socketId }, { bloqueada: true });
      if (resultado.nModified > 0) {
        console.log("1");
        return { success: true, message: "Registro atualizado com sucesso." };
      } else {
        return { success: false, message: "Nenhum registro foi atualizado." };
      }
    } catch (error) {
      console.error("Erro ao editar o campo ocupado:", error);
      return { success: false, message: "Erro ao editar o campo ocupado." };
    }
  },

  // Função para deletar registros com o campo ocupado igual a true
  async deletarRegistrosOcupados() {
    try {
      const resultado = await tela.deleteMany({ bloqueada: true });
      return {
        success: true,
        message: `Foram deletados ${resultado.deletedCount} registros ocupados.`,
      };
    } catch (error) {
      console.error("Erro ao deletar registros ocupados:", error);
      return { success: false, message: "Erro ao deletar registros ocupados." };
    }
  },

  // Função para verificar se existe algum registro com ocupado igual a true
  async verificarRegistrosOcupados() {
    try {
      const registroOcupado = await tela.exists({ bloqueada: true });

      return registroOcupado;
    } catch (error) {
      console.error("Erro ao verificar registros ocupados:", error);
      return false;
    }
  },

  async verificarRegistrosOcupadosBloqueiaTela(socketId) {
    try {
      await this.adicionarFilaRegistro(socketId);

      const registroOcupado =
        (await this.verificarRegistrosOcupados()) || false;

      if (!registroOcupado) {
        const log = await this.editarOcupadoParaTrue(socketId);

        return true;
      }

      return registroOcupado;
    } catch (error) {
      console.error("Erro ao verificar registros ocupados:", error);
      return false;
    }
  },

  async verficaSessao(socketId) {
    try {
      const socketIdBloqueada = await this.encontrarSocketIdDataMaisAntiga();

      console.log(socketIdBloqueada.socketId);

      if (!socketIdBloqueada) {
        return "home";
      }

      if (socketIdBloqueada.socketId === socketId) {
        return "secure";
      }

      return "block";
    } catch (error) {
      console.error("Erro ao verificar sessao:", error);
      return false;
    }
  },

  // Função para atualizar a data da última sessão com base no socketId
  async atualizarUltimaSessao(socketId) {
    try {
      const resultado = await tela.updateOne(
        { socketId },
        { ultimaAtualizacao: new Date() }
      );
      if (resultado.nModified > 0) {
        return {
          success: true,
          message: "Data da última sessão atualizada com sucesso.",
        };
      } else {
        return { success: false, message: "Nenhum registro foi atualizado." };
      }
    } catch (error) {
      console.error("Erro ao atualizar a data da última sessão:", error);
      return {
        success: false,
        message: "Erro ao atualizar a data da última sessão.",
      };
    }
  },

  async removerRegistrosExpirados() {
    try {
      const dataLimite = new Date(Date.now() - 2 * 60 * 1000); // Subtrai 2 minutos da data atual
      const resultado = await tela.deleteMany({
        ultimaSessao: { $lt: dataLimite },
      });
      return {
        success: true,
        message: `Foram deletados ${resultado.deletedCount} registros expirados.`,
      };
    } catch (error) {
      console.error("Erro ao deletar registros expirados:", error);
      return {
        success: false,
        message: "Erro ao deletar registros expirados.",
      };
    }
  },
};

export default telaService;
