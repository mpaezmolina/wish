import assert from "assert";
import { GameDao } from "../ethereum/dao/GameDao.js";
import { EthConfig } from "../ethereum/EthConfig.js";

before(async () => {
  await EthConfig.initTestMode();
});

describe("Game", () => {
  it("its created", () => {
    assert.ok(EthConfig.GAME_CONTRACT.options.address);
  });

  it("Create Players", async () => {
    var result1 = await GameDao.createPlayer("Justo");
    EthConfig.MAIN_ACCOUNT = EthConfig.ACCOUNTS[1];

    var result2 = await GameDao.createPlayer("Alfredo");
    EthConfig.MAIN_ACCOUNT = EthConfig.ACCOUNTS[0];
    assert(result1);
  });

  it("List Players", async () => {
    const players = await GameDao.listPlayers();
    assert(players.length == 2);
  });

  it("List Players Summaries", async () => {
    const playerSummaries = await GameDao.listPlayerSummaries();
    assert(playerSummaries.length == 2);
    assert(playerSummaries[0].name == "Justo");
  });

  it("Create Groups ", async () => {
    var result1 = await GameDao.createGroup("Autogov");
    var result2 = await GameDao.createGroup("Kiosco");
    var result2 = await GameDao.createGroup("Estancieros");
    assert(result1);
  });

  it("List Groups", async () => {
    const groups = await GameDao.listGroups();
    assert(groups.length == 3);
  });

  it("List Group Summaries", async () => {
    const groupSummaries = await GameDao.listGroupSummaries();
    assert(groupSummaries.length == 3);
    assert(groupSummaries[1].name == "Kiosco");
  });
});
