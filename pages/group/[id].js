import React from "react";
import Button from "../../components/Button";
import { getGroup, deposit, deposit3 } from "../../ethereum/dao";

function Group(props) {
  const { groupProp } = props;
  const [group, setGroup] = React.useState(groupProp);
  const [open, setOpen] = React.useState(false);

  function join() {
    deposit(group.id, 1).then((group) => {
      setGroup(group);
    });
  }

  return (
    <div className="gdp">
      <div className="yellowBlock center">
        <div className="title">{group.name}</div>
        <div className="sub-title">{group.id}</div>
      </div>
      <div
        className="vault-container"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img
          className={"vault " + (!open ? "" : "hide")}
          src="/images/closed-vault.png"
        />
        <img
          className={"vault " + (open ? "" : "hide")}
          src="/images/open-vault.png"
        />
        <div className={"vault-balance-container " + (open ? "" : "hide")}>
          <p className="vault-balance">{group.balance}</p>
          <p className="vault-eth-symbol">wei</p>
        </div>
      </div>
      <div className="cardsContainer">
        <div className="cardWrapper two">
          <div className="item-title">Members</div>
          <div className="item-value">{group.members.length}</div>
          <div className="item-title">Addresses</div>
          <div className="addresses-container center">
            {group.members.map((member, idx) => {
              return <p key={idx}> {member}</p>;
            })}
          </div>
        </div>
        <div className="cardWrapper two center">
          <div className="item-title">Next event</div>
          <div className="item-value">March 1st</div>
          <img className="event-map" src="/images/city-map.jpg" />
        </div>
      </div>
      <div className="join-button-container" onClick={join}>
        <Button>Join</Button>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const group = await getGroup(context.params.id);

  return {
    props: {
      groupProp: group,
    },
  };
}

export async function getStaticPaths() {
  const paths = [
    { params: { id: "0xE1cDf91aDa287B103D726A8Eba957c0b5A951A80" } },
    { params: { id: "0xbd3340a850B5223403f07A7474E0b2C0B1cC13a1" } },
  ];
  return { paths, fallback: false };
}

export default Group;
