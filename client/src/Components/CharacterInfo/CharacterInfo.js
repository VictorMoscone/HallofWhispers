import React, { useContext } from 'react';
import AccountContext from "../../Context/AccountContext";

function CharacterInfo(props) {
    const { userData } = useContext(AccountContext);

    const handleChange = (e) => {
        // Whenever a form with this function changes, it will run the parent function to save state.
        props.onChange(e.target);
    };


    return (
        <>
        < div className="container">
            <form>
                <div className="form-row">
                    <h3>Who are you?</h3>
                    <div className="col-sm">
                        <label for="validationServer01">Name</label>
                        <input onChange={handleChange} name="Name" type="text" className="form-control" id="validationServer01" defaultValue={userData.character?.chrName} placeholder="Full Name, Title" required />
                        {/* <div className="valid-feedback">
                        Looks good!
                        </div> */}
                    </div>
                </div>
                <div className="form-row row">
                    <div className="col-sm-4 mb-4">
                        <label for="validationServer03">Class</label>
                        <input onChange={handleChange} name="Class" type="text" className="form-control" id="validationServer03" defaultValue={userData.character?.chrClass} placeholder="Class" required />
                        {/* <div className="invalid-feedback">
                            Please provide a Class or Subclass.
                            </div> */}

                    </div>
                    <div className="col-sm-4 mb-4 form-group">
                        <label for="validationServer04">Race</label>
                        <select onChange={handleChange} name="Race" className="form-control" id="raceselect">
                            <option disabled selected>Select</option>
                            <option id="dwarf">Dwarf</option>
                            <option id="elf">Elf</option>
                            <option id="human">Human</option>
                            <option id="half-elf">Half Elf</option>
                            <option id="halfling">Halfling</option>
                            <option id="half-orc">Half Orc</option>
                            <option id="orc">Orc</option>
                            <option id="tiefling">Tiefling</option>
                            <option id="warforged">Warforged</option>
                        </select>
                        {/* <div className="invalid-feedback">
                            Please select a Race.
                            </div> */}
                    </div>
                    <div className="col-sm-4 mb-4">
                        <label for="validationServer05">Alignment</label>
                        <select onChange={handleChange} name="Alignment" className="form-control" id="alignment">
                            <option disabled selected>Select</option>
                            <option id="lg">Lawful Good</option>
                            <option id="ng">Neutral Good</option>
                            <option id="cg">Chaotic Good</option>
                            <option id="ln">Lawful Neutral</option>
                            <option id="tn">Neutral</option>
                            <option id="cn">Chaotic Neutral</option>
                            <option id="le">Lawful Evil</option>
                            <option id="ne">Neutral Evil</option>
                            <option id="ce">Chaotic Evil</option>
                        </select>
                        {/* <div className="invalid-feedback">
                            Please select an Alignment.
                            </div> */}
                    </div>
                    <div className="form-row">
                        <h3>Your Story</h3>
                        <div className="input-group col-md-3 mb-3">
                            <textarea onChange={handleChange} name="Story" className="form-control" aria-label="With textarea" id="characterstory" defaultValue={userData.character?.chrStory}></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default CharacterInfo
