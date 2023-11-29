import { EthConfig } from "../EthConfig.js";
import wish from "../../bin/ethereum/contracts/Wish.json" assert { type: "json" };

class WishDao {
  static async getSummary(address) {
    const wishContract = new EthConfig.WEB3.eth.Contract(wish.abi, address);
    const wishSummary = await wishContract.methods.getSummary().call();

    return {
      title: wishSummary["0"],
      description: wishSummary["1"],
      targetAmount: wishSummary["2"],
      player: wishSummary["3"],
      balance: wishSummary["4"],
    };
  }
  static async contribute(address, player, amount) {
    const wishContract = new EthConfig.WEB3.eth.Contract(wish.abi, address);

    var result = await wishContract.methods
      .contribute(player)
      .send({ from: EthConfig.MAIN_ACCOUNT, value: amount, gas: 4902883, gasPrice: 10000000 });

    return await this.getSummary(address);
  }

  static async listContributors(address) {
    const playerContract = new EthConfig.WEB3.eth.Contract(wish.abi, address);
    return await playerContract.methods.listContributors().call();
  }
}
export { WishDao };
