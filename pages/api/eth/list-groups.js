import factory from "../../../ethereum/game";
export default async (req, res) => {
  const groups = await factory.methods.getDeployedGroups().call();

  res.statusCode = 200;
  res.json(groups);
};
