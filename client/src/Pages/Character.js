import React, { useContext, useEffect } from 'react'
//import React from 'react';
import CharacterInfo from '../Components/CharacterInfo/CharacterInfo'
import CharacterStats from '../Components/CharacterStats/CharacterStats';
import axios from 'axios';
import AccountContext from "../Context/AccountContext";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "../Pages/Character.css";

const Character = () => {
  const { userData, setUserData } = useContext(AccountContext);
  const history = useHistory();

  // This function is used to change 

  const onClick = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");
    try {
      //changing character creation in database
      const { data } = await axios.post("/api/characterCreation", {}, {
        headers: { "x-auth-token": token },
      });
      setUserData({ ...userData, account: data });
      history.push("/");
    } catch (error) {
      console.log(error)
    }

  }


  //If it is not logged in, then go back to login
  useEffect(() => {
    if (!userData.pending && !userData.account) history.push("/login");

  }, [userData.pending, userData.account, history])




  const [formObject, setFormObject] = React.useState({});

  const handleChange = (e) => {
    // When a child component sends us an event with data, we save it in an object state.
    setFormObject({ ...formObject, [e.name]: e.value });
  };

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  // let characterData = {
  //   chrName: (formObject.Name === null) ? userData.character?.chrName : formObject.Name,
  //   chrClass: formObject.Class,
  //   chrRace: formObject.Race,
  //   chrAlign: formObject.Alignment,
  //   chrStory: formObject.Story,
  //   chrStr: formObject.Strength,
  //   chrDex: formObject.Dexterity,
  //   chrCon: formObject.Constitution,
  //   chrInt: formObject.Intelligence,
  //   chrWis: formObject.Wisdom,
  //   chrCha: formObject.Charisma,
  //   chrAc: formObject.ArmorClass,
  //   chrSpeed: formObject.Speed,
  //   chrIni: formObject.Initiative,
  //   chrProf: formObject.Proficiency,
  //   chrMaxHp: formObject.MaxHitPoints,
  //   chrCurrHp: formObject.CurrentHitPoints,
  //   chrAcr: formObject.Acrobatics,
  //   chrAnHa: formObject.AnimalHandling,
  //   chrArc: formObject.Arcana,
  //   chrAth: formObject.Athletics,
  //   chrDec: formObject.Deception,
  //   chrHis: formObject.History,
  //   chrIns: formObject.Insight,
  //   chrIntim: formObject.Intimidation,
  //   chrInv: formObject.Investigation,
  //   chrMed: formObject.Medicine,
  //   chrNat: formObject.Nature,
  //   chrPerc: formObject.Perception,
  //   chrPers: formObject.Persuasion,
  //   chrRel: formObject.Religion,
  //   chrSoh: formObject.SleightOfHand,
  //   chrSte: formObject.Stealth,
  //   chrSur: formObject.Survival,
  // };

  let characterData = {
    chrName: (formObject.Name === "" || !formObject.Name || formObject.Name === null) ? userData.character?.chrName : formObject.Name,
    chrClass: (formObject.Class === "" || !formObject.Class || formObject.Class === null) ? userData.character?.chrClass : formObject.Class,
    chrRace: (formObject.Race === "" || !formObject.Race || formObject.Race === null) ? userData.character?.chrRace : formObject.Race,
    chrAlign: (formObject.Alignment === "" || !formObject.Alignment || formObject.Alignment === null) ? userData.character?.chrAlign : formObject.Alignment,
    chrStory: (formObject.Story === "" || !formObject.Story || formObject.Story === null) ? userData.character?.chrStory : formObject.Story,
    chrStr: (formObject.Strength === "" || !formObject.Strength || formObject.Strength === null) ? userData.character?.chrStats[0].value : formObject.Strength,
    chrDex: (formObject.Dexterity === "" || !formObject.Dexterity || formObject.Dexterity === null) ? userData.character?.chrStats[1].value : formObject.Dexterity,
    chrCon: (formObject.Constitution === "" || !formObject.Constitution || formObject.Constitution === null) ? userData.character?.chrStats[2].value : formObject.Constitution,
    chrInt: (formObject.Intelligence === "" || !formObject.Intelligence || formObject.Intelligence === null) ? userData.character?.chrStats[3].value : formObject.Intelligence,
    chrWis: (formObject.Wisdom === "" || !formObject.Wisdom || formObject.Wisdom === null) ? userData.character?.chrStats[4].value : formObject.Wisdom,
    chrCha: (formObject.Charisma === "" || !formObject.Charisma || formObject.Charisma === null) ? userData.character?.chrStats[5].value : formObject.Charisma,
    chrAc: (formObject.ArmorClass === "" || !formObject.ArmorClass || formObject.ArmorClass === null) ? userData.character?.chrArmor[0].value : formObject.ArmorClass,
    chrSpeed: (formObject.Speed === "" || !formObject.Speed || formObject.Speed === null) ? userData.character?.chrArmor[1].value : formObject.Speed,
    chrIni: (formObject.Initiative === "" || !formObject.Initiative || formObject.Initiative === null) ? userData.character?.chrArmor[2].value : formObject.Initiative,
    chrProf: (formObject.Proficiency === "" || !formObject.Proficiency || formObject.Proficiency === null) ? userData.character?.chrArmor[3].value : formObject.Proficiency,
    chrMaxHp: (formObject.MaxHitPoints === "" || !formObject.MaxHitPoints || formObject.MaxHitPoints === null) ? userData.character?.chrHealth[0].value : formObject.MaxHitPoints,
    chrCurrHp: (formObject.CurrentHitPoints === "" || !formObject.CurrentHitPoints || formObject.CurrentHitPoints === null) ? userData.character?.chrHealth[1].value : formObject.CurrentHitPoints,
    chrAcr: (formObject.Acrobatics === "" || !formObject.Acrobatics || formObject.Acrobatics === null) ? userData.character?.chrSkills[0].value : formObject.Acrobatics,
    chrAnHa: (formObject.AnimalHandling === "" || !formObject.AnimalHandling || formObject.AnimalHandling === null) ? userData.character?.chrSkills[1].value : formObject.AnimalHandling,
    chrArc: (formObject.Arcana === "" || !formObject.Arcana || formObject.Arcana === null) ? userData.character?.chrSkills[2].value : formObject.Arcana,
    chrAth: (formObject.Athletics === "" || !formObject.Athletics || formObject.Athletics === null) ? userData.character?.chrSkills[3].value : formObject.Athletics,
    chrDec: (formObject.Deception === "" || !formObject.Deception || formObject.Deception === null) ? userData.character?.chrSkills[4].value : formObject.Deception,
    chrHis: (formObject.History === "" || !formObject.History || formObject.History === null) ? userData.character?.chrSkills[5].value : formObject.History,
    chrIns: (formObject.Insight === "" || !formObject.Insight || formObject.Insight === null) ? userData.character?.chrSkills[6].value : formObject.Insight,
    chrIntim: (formObject.Intimidation === "" || !formObject.Intimidation || formObject.Intimidation === null) ? userData.character?.chrSkills[7].value : formObject.Intimidation,
    chrInv: (formObject.Investigation === "" || !formObject.Investigation || formObject.Investigation === null) ? userData.character?.chrSkills[8].value : formObject.Investigation,
    chrMed: (formObject.Medicine === "" || !formObject.Medicine || formObject.Medicine === null) ? userData.character?.chrSkills[9].value : formObject.Medicine,
    chrNat: (formObject.Nature === "" || !formObject.Nature || formObject.Nature === null) ? userData.character?.chrSkills[10].value : formObject.Nature,
    chrPerc: (formObject.Perception === "" || !formObject.Perception || formObject.Perception === null) ? userData.character?.chrSkills[11].value : formObject.Perception,
    chrPers: (formObject.Persuasion === "" || !formObject.Persuasion || formObject.Persuasion === null) ? userData.character?.chrSkills[12].value : formObject.Persuasion,
    chrRel: (formObject.Religion === "" || !formObject.Religion || formObject.Religion === null) ? userData.character?.chrSkills[13].value : formObject.Religion,
    chrSoh: (formObject.SleightOfHand === "" || !formObject.SleightOfHand || formObject.SleightOfHand === null) ? userData.character?.chrSkills[14].value : formObject.SleightOfHand,
    chrSte: (formObject.Stealth === "" || !formObject.Stealth || formObject.Stealth === null) ? userData.character?.chrSkills[15].value : formObject.Stealth,
    chrSur: (formObject.Survival === "" || !formObject.Survival || formObject.Survival === null) ? userData.character?.chrSkills[16].value : formObject.Survival,
  };


  const createCharacter = async (e) => {

    e.preventDefault();
    let token = localStorage.getItem("auth-token");

    try {
      if (userData.account.charCreated) {
        console.log(typeof document.querySelector("[name='Name']").getAttribute("placeholder"))
        console.log(characterData);

        await axios.patch("/api/characters/update", characterData, { headers: { "x-auth-token": token } });
        alert("Record Saved!")
        // window.location.reload();
        // history.push("/");
      } else {

        // When the Submit to Hall Records button is clicked, it creates a character with the below params.
        console.log(document.querySelector("[name = 'Name']").getAttribute("placeholder"));

        console.log(characterData);
        const mychr = await API.createChr(characterData);
        // API.findAll().then(res => console.log(res.data));
        //changing character creation in database
        console.log(mychr);
        const { data } = await axios.post("/api/characterCreation", {}, {
          headers: { "x-auth-token": token },
        });
        console.log(mychr.data)
        setUserData({ ...userData, account: data, character: mychr.data, pending: false });
        history.push("/");
      }
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div>
      {/* This button is a placeholder for when create character is created */}
      {/* <button onClick={onClick}>Create Character</button> */}
      <div className="container box-model">
        <h1>Almanac of Heroes</h1>
        <p>Mark your place in the records. Please fill out all fields completely.</p>
        <button onClick={createCharacter} className="btn btn-danger" type="submit">Submit to Hall Records</button>
      </div>
        <CharacterInfo onChange={handleChange} />
        <CharacterStats onChange={handleChange} />


    </div>
  )
}

export default Character
