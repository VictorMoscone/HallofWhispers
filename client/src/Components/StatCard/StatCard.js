import React, { useContext } from "react";
import PowerStats from "../PowerStats/PowerStats";
import Col from "../Col/Col";
import Row from "../Row/Row";
import "./StatCard.css";
import AccountContext from "../../Context/AccountContext";

const StatCard = (prop) => {
  const { userData } = useContext(AccountContext);

  return (
    <div>
      <h4 className="card-title text-black">Power Stats</h4>

      <div className="card-deck">
      <div className="card card-border" style={{ backgroundColor: "transparent"}}>
        <div className="card-body">
          
          <Row className="row">
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Strength" number={userData.character?.chrStats && userData.character?.chrStats[0].value} />
              <PowerStats title="Dexterity" number={userData.character?.chrStats && userData.character?.chrStats[1].value} />
            </Col>
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Constitution" number={userData.character?.chrStats && userData.character?.chrStats[2].value} />
              <PowerStats title="Intelligence" number={userData.character?.chrStats && userData.character?.chrStats[3].value} />
            </Col>
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Wisdom" number={userData.character?.chrStats && userData.character?.chrStats[4].value} />
              <PowerStats title="Charisma" number={userData.character?.chrStats && userData.character?.chrStats[5].value} />
            </Col>
          </Row>
          <Row>
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Armor" number={userData.character?.chrStats && userData.character?.chrArmor[0].value} />
            </Col>
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Max HP" number={userData.character?.chrStats && userData.character?.chrHealth[0].value} />
            </Col>
            <Col size="md-4 s-4 xs-4">
              <PowerStats title="Current HP" number={userData.character?.chrStats && userData.character?.chrHealth[1].value} />
            </Col>
          </Row>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StatCard;
