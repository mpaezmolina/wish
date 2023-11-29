import { EthConfig } from "../EthConfig.js";
import group from "../../bin/ethereum/contracts/Group.json" assert { type: "json" };

export async function createPlayer(name) {
  return await EthConfig.GAME_CONTRACT.methods.createPlayer(name).send({
    from: EthConfig.MAIN_ACCOUNT,
    gas: 4902883,
    gasPrice: 1000000000,
  });
}

export async function listPlayers() {
  return await EthConfig.GAME_CONTRACT.methods.listPlayers().call();
}

export async function listPlayerSummaries() {
  const players = await EthConfig.GAME_CONTRACT.methods.listPlayerSummaries().call();

  var playersLength = Object.keys(players[0]).length;
  var summaries = [];

  for (var i = 0; i < playersLength; i++) {
    var aSummary = {
      name: players[0][i],
      wallet: players[1][i],
      balance: players[2][i],
    };

    summaries[i] = aSummary;
  }
  return summaries;
}

export async function createGroup(name) {
  return await EthConfig.GAME_CONTRACT.methods.createGroup(name).send({
    from: EthConfig.MAIN_ACCOUNT,
    gas: 4902883,
    gasPrice: 1000000000,
  });
}

export async function listGroups() {
  return await EthConfig.GAME_CONTRACT.methods.listGroups().call();
}

export async function listGroupSummaries() {
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

export async function getGroup(address) {
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

export async function deposit(address, amount) {
  const groupContract = new EthConfig.WEB3.eth.Contract(group.abi, address);

  var result = await groupContract.methods
    .deposit()
    .send({ from: EthConfig.MAIN_ACCOUNT, value: amount });

  return await getGroup(address);
}
