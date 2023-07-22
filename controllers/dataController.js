import dataModel from "../models/dataModel.js";
import teamSchema from "../models/teamSchema.js";
class dataController {
  static createDoc = async (req, res) => {
    try {
      const {
        _id,
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available,
      } = req.body;
      const doc = new dataModel({
        _id: _id,
        first_name: first_name,
        last_name: last_name,

        email: email,
        gender: gender,
        avatar: avatar,
        domain: domain,
        available: available,
      });

      const result = await doc.save();
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static getAllDoc = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;

      const startIndex = page - 1;

      const { gender, domain, first_name, last_name } = req.query;
      const filter = {};

      if (gender) {
        filter.gender = gender;
      }

      if (domain) {
        filter.domain = domain;
      }
      if (first_name) {
        filter.domain = first_name;
      }
      if (last_name) {
        filter.domain = last_name;
      }

      const result = await dataModel.find(filter).skip(startIndex); //

      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };

  static getSingleDocById = async (req, res) => {
    try {
      const result = await dataModel.findById(req.params.id);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static updateDocById = async (req, res) => {
    try {
      const result = await dataModel.findByIdAndUpdate(req.params.id, req.body);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static deleteDocById = async (req, res) => {
    try {
      const result = await dataModel.findByIdAndDelete(req.params.id);
      res.status(204).send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static createTeam = async (req, res) => {
    try {
      const { teamMembers } = req.body;

      const team = await dataModel.find({ _id: { $in: teamMembers } });

      const uniqueDomains = new Set(team.map((user) => user.domain));
      const uniqueAvailabilities = new Set(team.map((user) => user.available));

      if (uniqueDomains.size !== 1 || uniqueAvailabilities.size !== 1) {
        return res.status(400).json({
          message:
            "Selected team members must have the same domain and availability.",
        });
      }

      const teamData = {
        members: teamMembers,
        domain: team[0].domain,
        available: team[0].available,
      };

      const teamSchema = new teamSchema(teamData);
      const result = await teamSchema.save();

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };

  static getTeamById = async (req, res) => {
    try {
      const result = await teamSchema.findById(req.params._id);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };
}

export default dataController;
