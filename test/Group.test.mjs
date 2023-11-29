import assert from "assert";
import { GameDao } from "../ethereum/dao/GameDao.js";
import { GroupDao } from "../ethereum/dao/GroupDao.js";

describe("Group", () => {
  it("Get Summary", async () => {
    const groups = await GameDao.listGroups();
    const aGroup = await GroupDao.getSummary(groups[0]);
    assert(aGroup.name == "Autogov");
  });

  it("Deposit", async () => {
    const groups = await GameDao.listGroups();
    const aGroup = await GroupDao.deposit(groups[0], 10);
    assert(aGroup.balance == 10);
  });
});
