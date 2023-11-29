import { EthConfig } from "../EthConfig.js";
import { GameDao } from "./GameDao.js";
import group from "../../bin/ethereum/contracts/Group.json" assert { type: "json" };

class GroupDao {
  static async getSummary(address) {
    const groupContract = new EthConfig.WEB3.eth.Contract(group.abi, address);
    const groupSummary = await groupContract.methods.getSummary().call();

    return {
      name: groupSummary["0"],
      manager: groupSummary["1"],
      players: groupSummary["2"],
      balance: groupSummary["3"],
      address: groupSummary["4"],
    };
  }
  static async deposit(address, amount) {
    const groupContract = new EthConfig.WEB3.eth.Contract(group.abi, address);

    var result = await groupContract.methods
      .deposit()
      .send({ from: EthConfig.MAIN_ACCOUNT, value: amount });

    return await this.getSummary(address);
  }
}

export { GroupDao };
