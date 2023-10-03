const { Op } = require("sequelize");

const getLikeOp = (keyword) => {
  let obj = {
    [Op.like]: `%${keyword}%`,
  };
  return obj;
};
const searchKanji = (param) =>{
  const { keyword } = param;
 
  return {
     where:{
      [Op.or] :[
        {
          kanji:getLikeOp(keyword)
        },
        {
          stroke:getLikeOp(keyword)
        },
        {
          romaji:getLikeOp(keyword)
        },
        {
          kunyomi:getLikeOp(keyword)
        },
        {
          onyomi:getLikeOp(keyword)
        },
        {
          meaning:getLikeOp(keyword)
        }
      ]
     }
  }
}

const searchVocab = (param) => {
  const { keyword } = param;
  return {
    where: {
      [Op.or]: [
        {
          kanji: getLikeOp(keyword)
        },
        {
          furigana: getLikeOp(keyword)
        },
        {
          romaji: getLikeOp(keyword)
        },
        {
          meaning: getLikeOp(keyword)
        }
      ]
    }
  }
}

const searchGrammar = (param) => {
  const { keyword } = param;
  return {
    where: {
      [Op.or]: [
        {
          title: getLikeOp(keyword)
        },
        {
          setsuzoku: getLikeOp(keyword)
        },
        {
          romaji: getLikeOp(keyword)
        },
        {
          furigana: getLikeOp(keyword)
        },
        {
          meaning: getLikeOp(keyword)
        }
      ]
    }
  }
}

const getSearchQuery = (param) =>{
  let query = {};
  const {keyword} = param;
  query = searchKanji(keyword) || searchVocab(keyword) || searchGrammar(keyword);
  return query;
}

const QUERY = {
  getSearchQuery,
  searchKanji,
  searchVocab,
  searchGrammar
};
module.exports = QUERY;
