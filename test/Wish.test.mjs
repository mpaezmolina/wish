import assert from "assert";
import { GameDao } from "../ethereum/dao/GameDao.js";
import { PlayerDao } from "../ethereum/dao/PlayerDao.js";
import { WishDao } from "../ethereum/dao/WishDao.js";

describe("Wish", () => {
  it("Get Summary", async () => {
    const players = await GameDao.listPlayers();
    const wishes = await PlayerDao.listWishes(players[0]);

    const aWishSummary = await WishDao.getSummary(wishes[0]);
    assert(aWishSummary.title == "Wish 1");
  });

  it("Contribute", async () => {
    const players = await GameDao.listPlayers();
    const wishes = await PlayerDao.listWishes(players[0]);

    const aWish = await WishDao.contribute(wishes[0], players[0], 12);
    const aWish2 = await WishDao.contribute(wishes[0], players[0], 12);
    const aWish3 = await WishDao.contribute(wishes[0], players[1], 9);
    assert(aWish3.balance == 33);
  });

  it("List Constributors", async () => {
    const players = await GameDao.listPlayers();
    const wishes = await PlayerDao.listWishes(players[0]);

    const constributors = await WishDao.listContributors(wishes[0]);
    assert(constributors.length == 2);
  });
});
