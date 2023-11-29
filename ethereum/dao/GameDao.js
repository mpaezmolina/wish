import { EthConfig } from "../EthConfig.js";
import group from "../../bin/ethereum/contracts/Group.json" assert { type: "json" };

class GameDao {
  static async createPlayer(name) {
    return await EthConfig.GAME_CONTRACT.methods.createPlayer(name).send({
      from: EthConfig.MAIN_ACCOUNT,
      gas: 4902883,
      gasPrice: 1000000000,
    });
  }

  static async listPlayers() {
    return await EthConfig.GAME_CONTRACT.methods.listPlayers().call();
  }

  static async listPlayerSummaries() {
    const players = await EthConfig.GAME_CONTRACT.methods.listPlayerSummaries().call();

    var playersLength = Object.keys(players[0]).length;
    var summaries = [];

    for (var i = 0; i < playersLength; i++) {
      var aSummary = {
        address: players[0][i],
        name: players[1][i],
        wallet: players[2][i],
        balance: players[3][i],
      };

      summaries[i] = aSummary;
    }
    return summaries;
  }

  static async createGroup(name) {
    return await EthConfig.GAME_CONTRACT.methods.createGroup(name).send({
      from: EthConfig.MAIN_ACCOUNT,
      gas: 4902883,
      gasPrice: 1000000000,
    });
  }

  static async listGroups() {
    return await EthConfig.GAME_CONTRACT.methods.listGroups().call();
  }

  static async listGroupSummaries() {
    const groups = await EthConfig.GAME_CONTRACT.methods.listGroupSummaries().call();

    var groupsLength = Object.keys(groups[0]).length;
    var summaries = [];

    for (var i = 0; i < groupsLength; i++) {
      var aSummary = {
        name: groups[0][i],
        manager: groups[1][i],
        balance: groups[2][i],
        address: groups[3][i],
      };

      summaries[i] = aSummary;
    }
    return summaries;
  }
}

export { GameDao };
