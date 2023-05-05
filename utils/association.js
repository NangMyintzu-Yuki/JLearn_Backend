const db = require('../models');
const {Op} = require("sequelize");
const {
  searchKanji,
  searchVocab,
  searchGrammar
} = require('./query');

const isObjEmpty = (obj) =>{
  return Object.values(obj).length === 0 && obj.constructor === Object;
}

const ASSOCIATION = {
  get: (model,params) =>{
    let relationshipModel = [];
    let searchQuery = {};
    let operator = [
      {
        model:db.Operator,
        as:"createdBy",
        attributes:["id","fullname","username","email","phone"]
      },
      {
        model:db.Operator,
        as:"updatedBy",
        attributes:["id","fullname","username","email","phone"]
      },
      {
        model:db.Operator,
        as:"deletedBy",
        attributes:["id","fullname","username","email","phone"]
      },
    ];
    switch(model){
      case db.Kanji:
        relationshipModel = [
          {
            model: db.Operator,
            as: "createdBy",
            attributes: ["id", "fullname","username"],
          },
          {
            model: db.Operator,
            as: "updatedBy",
            attributes: ["id", "fullname","username"],
          },
          {
            model: db.Operator,
            as: "deletedBy",
            attributes: ["id", "fullname","username"],
          },
        ];
        console.log("params===>",params);
        console.log("isObjectEmpty",isObjEmpty(params))
        searchQuery = isObjEmpty(params) === false && searchKanji(params)
        break;
        case db.Vocab:
          relationshipModel = [
            {
              model: db.Operator,
              as: "createdBy",
              attributes: ["id", "fullname", "username"],
            },
            {
              model: db.Operator,
              as: "updatedBy",
              attributes: ["id", "fullname", "username"],
            },
            {
              model: db.Operator,
              as: "deletedBy",
              attributes: ["id", "fullname", "username"],
            },
            {
              model:db.Kanji,
              attributes:["id","level","kanji","romaji","onyomi","kunyomi","stroke"]
            }
          ];
        searchQuery = isObjEmpty(params) === false && searchVocab(params);
          break;
          case db.Grammar:
        relationshipModel = [
          {
            model: db.Operator,
            as: "createdBy",
            attributes: ["id", "fullname", "username"],
          },
          {
            model: db.Operator,
            as: "updatedBy",
            attributes: ["id", "fullname", "username"],
          },
          {
            model: db.Operator,
            as: "deletedBy",
            attributes: ["id", "fullname", "username"],
          },
        ];
        searchQuery = isObjEmpty(params) === false && searchGrammar(params);

    }
    return { relationshipModel,searchQuery};
  }
}
module.exports = ASSOCIATION;

