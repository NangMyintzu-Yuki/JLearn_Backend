const { Op } = require('sequelize')
const { apiResponseHeader, messages, httpStatusCode } = require('../utils/constant')
const paginate = require("../utils/paginate");
// const QUERY = require("../utils/query");

class Services {
    constructor(model) {
        this.model = model;
    }
    create(data, transaction) {
        if (transaction === undefined) {
            return this.model.create(data)
        } else {
            return this.model.create(data, { transaction })
        }
    }
    update(data, transaction) {
        if (transaction === undefined) {
            return this.model.update(data, { where: { id: data.id } })
        } else {
            return this.model.update(data, {
                where: { id: data.id },
                transaction
            })
        }
    }
    delete(data, transaction) {
        if (data.deleted_by !== undefined) {
            return this.update({
                id: data.id,
                deleted_by: data.deleted_by,
                deleted_at: new Date().toString(),
            }, transaction)
        } else {
            if (transaction === undefined) {
                return this.model.destroy({ where: { id: data.id } })
            } else {
                return this.model.destroy({ where: { id: data.id }, transaction })
            }
        }
    }
    
    async findAll(query) {
        const { page_at: page, row_count: limit, sort_by,order_by, ...params } = query;
        // let search = QUERY.getSearchQuery(params);
        let result = await paginate(this.model, page, limit, sort_by,order_by,params);
        return result;
    }
    formatResponse(data, msg = messages.retrieved) {
        const { code, status, message } = apiResponseHeader(
            httpStatusCode.OK,
            messages.success,
            msg
        );
        return { code, status, message, data };
    }
    formatValidationErrors(errors) {
        let formatedError = {};
        if (errors.length === 0) {
            return;
        }
        const { code, status } = apiResponseHeader(
            httpStatusCode.OK,
            messages.failed
        );
        errors.forEach((error) => {
            formatedError[error.path[0]] = [error.message.replace(/[\"]+/g, "")];
        })
        return { code, status, formatedError };
    }
    async handleUpdate(id) {
        const data = await this.model.findByPk(id);
        const { code, status, message } = apiResponseHeader(
            httpStatusCode.OK,
            messages.success,
            messages.updated
        )
        return { code, status, message, data }
    }
    deleteByCustomId(key, value) {
        let options = {};
        options[key] = value;
        return this.model.destroy({ where: options })
    }
    findById(id,transaction){
        if(transaction === undefined){
            return this.model.findByPk(id);
        }
        else{
            this.model.findByPk(id,{transaction});
        }
    }
    async findByLevel(key,value,query,showAll=false){
        console.log("query=>",query)

        let options = {};
        const {
            page_at:page,
            row_count:limit,
            sort_by,
            order_by,
            ...params
        } = query;
        options[key] = value;
        let search = {
            where: {
                level: value,
            },
        };
        if(showAll){
            if(query.level){
                search = {
                    where: {
                        level: value,
                    },
                };
                if(query.keyword){
                    search = {
                        where: {
                            [Op.or]: [
                                {
                                    kanji: getLikeOp(query.keyword)
                                },
                                // {
                                //     stroke: getLikeOp(query.keyword)
                                // },
                                {
                                    romaji: getLikeOp(query.keyword)
                                },
                                // {
                                //     kunyomi: getLikeOp(query.keyword)
                                // },
                                // {
                                //     onyomi: getLikeOp(query.keyword)
                                // },
                                {
                                    meaning: getLikeOp(query.keyword)
                                }
                            ],
                            level:value
                        }
                    };

                }
            }
           
            let { count, rows } = await this.model.findAndCountAll(search);
            const pagination = {
                page_at: page,
                total_page: getTotalPage(count, limit),
                total_records_count: count,
                total_count_per_page: rows.length,
            }
            const { code, status, message } = apiResponseHeader(
                httpStatusCode.OK,
                messages.success,
                messages.retrieved
            );
            return {
                code,
                status,
                message,
                pagination,
                data: rows,
            };
        }else{
            return this.model.findOne(search);
        }
    }

   
}
const getTotalPage = (totalCount, limit) => {
    if (totalCount < limit) {
        return 1;
    }
    return Math.ceil(totalCount / limit);
}
const getLikeOp = (keyword) => {
    let obj = {
        [Op.like]: `%${keyword}%`,
    };
    return obj;
};

// const AWS = require("aws-sdk");



// findById(id, transaction) {
//     if (transaction === undefined) {
//         return this.model.findByPk(id);
//     } else {
//         return this.model.findByPk(id, { transaction });
//     }
// }

//     async findByCustomId(key, value, query, showAll = false) {
//     let options = {};
//     const { page_at: page, row_count: limit, sortBy, date, time, action } = query;
//     options[key] = value;
//     let search = { where: options };
//     if (showAll) {
//         switch (key) {
//             case "teams_id":
//                 search = {
//                     where: {
//                         [Op.or]: [{ home_team_id: value }, { away_team_id: value }],
//                     },
//                 };
//                 break;
//             case "team_id":
//                 search = {
//                     where: {
//                         team_id: value,
//                     },
//                 };
//             case "league_id":
//                 if (date && time) {
//                     search = {
//                         where: {
//                             league_id: value,
//                             date: date,
//                             time: time
//                         },
//                     };
//                 }
//                 else if (time) {
//                     search = {
//                         where: {
//                             league_id: value,
//                             time: time,
//                         }
//                     }
//                 }
//                 else if (date) {
//                     search = {
//                         where: {
//                             league_id: value,
//                             date: date,
//                         }
//                     }
//                 }
//                 break;
//             case "type":
//                 if (action) {
//                     search = {
//                         where: {
//                             type: value,
//                             action: action
//                         }
//                     }
//                 }
//                 break;
//         }
//         const result = await paginate(this.model, page, limit, sortBy, search);
//         return result;
//     } else {
//         return this.model.findOne(search);
//     }
// }




// //format response data


// //preparing to upload image
// prepareUpload(prefix, id, image) {
//     return new Promise((resolve, reject) => {
//         const s3 = new AWS.S3({
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//             region: process.env.AWS_REGION,
//         });
//         const uploadPath = getImageURL(prefix, id, image.name, true);
//         const params = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: uploadPath,
//             Body: image.data,
//             ContentType: image.mimetype,
//             ACL: "public-read",
//         };
//         s3.upload(params, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data);
//         });
//     });
// }

// //upload image to aws
// uploadImage(prefix, id, images) {
//     let uploadPromise = [];
//     Object.entries(images).forEach((image) => {
//         uploadPromise.push(this.prepareUpload(prefix, id, image[1]));
//     });

//     return Promise.all(uploadPromise);
// }

// //create new bucket
// createAWSBucket(name) {
//     const s3 = new AWS.S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: process.env.AWS_REGION,
//     });
//     const params = {
//         Bucket: name,
//     };
//     s3.createBucket(params, (err, data) => {
//         if (err) {
//             return false;
//         } else {
//             return true;
//         }
//     });
// }
// }
module.exports = Services;
