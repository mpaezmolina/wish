import assert from "assert";
import { GameDao } from "../ethereum/dao/GameDao.js";
import { PlayerDao } from "../ethereum/dao/PlayerDao.js";

describe("Player", () => {
  it("Create Wish", async () => {
    const players = await GameDao.listPlayers();
    const result1 = await PlayerDao.createWish(players[0], "Wish 1", "Wish 1 description", 200);
    const result2 = await PlayerDao.createWish(players[0], "Wish 2", "Wish 2 description", 300);
    assert(result1);
  });

  it("List Wishes", async () => {
    const players = await GameDao.listPlayers();
    const wishes = await PlayerDao.listWishes(players[0]);
    assert(wishes.length == 2);
  });
});
