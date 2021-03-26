const { Character } = require("../models");

module.exports = {

  // Returns all character information. This is primarily a debugging route.
  findAll: async (req, res) => {
    try {
      res.json(await Character.find())
    } catch (err) {
      res.send(err);
    };
  },

  // Finds a character in the database by their ID.
  findChr: async (req, res) => {
    try {
      console.log(req.params.id)
      res.json(await Character.find({ chrAccountId: req.params.id }));
    } catch (err) {
      res.send(err);
    };
  },

  // Will create a new character in the database.
  createChr: async (req, res) => {
    try {
      const newChr = new Character({
        chrName: req.body.chrName,
        chrClass: req.body.chrClass,
        chrRace: req.body.chrRace,
        chrAlign: req.body.chrAlign,
        chrStory: req.body.chrStory,
        chrAccountId: req.account,
        // This will create an array within our Character containing stat objects.
        chrStats: [
          { name: "strength", value: req.body.chrStr },
          { name: "dexterity", value: req.body.chrDex },
          { name: "constitution", value: req.body.chrCon },
          { name: "intelligence", value: req.body.chrInt },
          { name: "wisdom", value: req.body.chrWis },
          { name: "charisma", value: req.body.chrCha },
        ],
        chrArmor: [
          { name: "armor-class", value: req.body.chrAc },
          { name: "speed", value: req.body.chrSpeed },
          { name: "initiative", value: req.body.chrIni },
          { name: "proficiency", value: req.body.chrProf },
        ],
        chrHealth: [
          { name: "max-hit-points", value: req.body.chrMaxHp },
          { name: "current-hit-points", value: req.body.chrCurrHp },
        ],
        chrSkills: [
          { name: "acrobatics", value: req.body.chrAcr },
          { name: "animal-handling", value: req.body.chrAnHa },
          { name: "arcana", value: req.body.chrArc },
          { name: "athletics", value: req.body.chrAth },
          { name: "deception", value: req.body.chrDec },
          { name: "history", value: req.body.chrHis },
          { name: "insight", value: req.body.chrIns },
          { name: "intimidation", value: req.body.chrIntim },
          { name: "investigation", value: req.body.chrInv },
          { name: "medicine", value: req.body.chrMed },
          { name: "nature", value: req.body.chrNat },
          { name: "perception", value: req.body.chrPerc },
          { name: "persuasion", value: req.body.chrPers },
          { name: "religion", value: req.body.chrRel },
          { name: "sleight-of-hand", value: req.body.chrSoh },
          { name: "stealth", value: req.body.chrSte },
          { name: "survival", value: req.body.chrSur },
        ]
      })
      res.json(await newChr.save());
    } catch (err) {
      res.send(err);
    };
  },

  // This will update the ENTIRE character data. If req.body is missing a paramter, it will update to NULL.
  // As such, it's important that whatever runs this route, has rules built in.
  updateChr: async (req, res) => {
    try {
      res.json(
        await Character.findByIdAndUpdate(req.body._id, {
          chrName: req.body.chrName,
          chrClass: req.body.chrClass,
          chrRace: req.body.chrRace,
          chrAlign: req.body.chrAlign,
          chrStory: req.body.chrStory,
          chrStats: [
            { name: "strength", value: req.body.chrStr },
            { name: "dexterity", value: req.body.chrDex },
            { name: "constitution", value: req.body.chrCon },
            { name: "intelligence", value: req.body.chrInt },
            { name: "wisdom", value: req.body.chrWis },
            { name: "charisma", value: req.body.chrCha },
          ],
          chrArmor: [
            { name: "armor-class", value: req.body.chrAc },
            { name: "speed", value: req.body.chrSpeed },
            { name: "initiative", value: req.body.chrIni },
            { name: "proficiency", value: req.body.chrProf },
          ],
          chrHealth: [
            { name: "max-hit-points", value: req.body.chrMaxHp },
            { name: "current-hit-points", value: req.body.chrCurrHp },
          ],
          chrSkills: [
            { name: "acrobatics", value: req.body.chrAcr },
            { name: "animal-handling", value: req.body.chrAnHa },
            { name: "arcana", value: req.body.chrArc },
            { name: "athletics", value: req.body.chrAth },
            { name: "deception", value: req.body.chrDec },
            { name: "history", value: req.body.chrHis },
            { name: "insight", value: req.body.chrIns },
            { name: "intimidation", value: req.body.chrIntim },
            { name: "investigation", value: req.body.chrInv },
            { name: "medicine", value: req.body.chrMed },
            { name: "nature", value: req.body.chrNat },
            { name: "perception", value: req.body.chrPerc },
            { name: "persuasion", value: req.body.chrPers },
            { name: "religion", value: req.body.chrRel },
            { name: "sleight-of-hand", value: req.body.chrSoh },
            { name: "stealth", value: req.body.chrSte },
            { name: "survival", value: req.body.chrSur },
          ],
        }),
      );
    } catch (err) {
      alert(err.message);
      res.send(err);
    };
  },

  updateAlChr: async (req, res) => {
    try {
      res.json(
        await Character.findOneAndUpdate({ chrAccountId: req.account }, {
          chrName: req.body.chrName,
          chrClass: req.body.chrClass,
          chrRace: req.body.chrRace,
          chrAlign: req.body.chrAlign,
          chrStory: req.body.chrStory,
          chrStats: [
            { name: "strength", value: req.body.chrStr },
            { name: "dexterity", value: req.body.chrDex },
            { name: "constitution", value: req.body.chrCon },
            { name: "intelligence", value: req.body.chrInt },
            { name: "wisdom", value: req.body.chrWis },
            { name: "charisma", value: req.body.chrCha },
          ],
          chrArmor: [
            { name: "armor-class", value: req.body.chrAc },
            { name: "speed", value: req.body.chrSpeed },
            { name: "initiative", value: req.body.chrIni },
            { name: "proficiency", value: req.body.chrProf },
          ],
          chrHealth: [
            { name: "max-hit-points", value: req.body.chrMaxHp },
            { name: "current-hit-points", value: req.body.chrCurrHp },
          ],
          chrSkills: [
            { name: "acrobatics", value: req.body.chrAcr },
            { name: "animal-handling", value: req.body.chrAnHa },
            { name: "arcana", value: req.body.chrArc },
            { name: "athletics", value: req.body.chrAth },
            { name: "deception", value: req.body.chrDec },
            { name: "history", value: req.body.chrHis },
            { name: "insight", value: req.body.chrIns },
            { name: "intimidation", value: req.body.chrIntim },
            { name: "investigation", value: req.body.chrInv },
            { name: "medicine", value: req.body.chrMed },
            { name: "nature", value: req.body.chrNat },
            { name: "perception", value: req.body.chrPerc },
            { name: "persuasion", value: req.body.chrPers },
            { name: "religion", value: req.body.chrRel },
            { name: "sleight-of-hand", value: req.body.chrSoh },
            { name: "stealth", value: req.body.chrSte },
            { name: "survival", value: req.body.chrSur },
          ],
        }),
      );
    } catch (err) {
      res.send(err);
    };
  },

  // This will find a character by their id and delete them from the database.
  deleteChr: async (req, res) => {
    try {
      res.json(await Character.findByIdAndDelete(req.params.id));
    } catch (err) {
      res.send(err);
    };
  },

};
