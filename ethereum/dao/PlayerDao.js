import { EthConfig } from "../EthConfig.js";
import player from "../../bin/ethereum/contracts/Player.json" assert { type: "json" };

class PlayerDao {
  static async createWish(address, title, description, targetAmount) {
    const playerContract = new EthConfig.WEB3.eth.Contract(player.abi, address);

    return await playerContract.methods.createWish(title, description, targetAmount).send({
      from: EthConfig.MAIN_ACCOUNT,
      gas: 4902883,
      gasPrice: 10000000,
    });
  }

  static async listWishes(address) {
    const playerContract = new EthConfig.WEB3.eth.Contract(player.abi, address);
    return await playerContract.methods.listWishes().call();
  }
}
export { PlayerDao };
