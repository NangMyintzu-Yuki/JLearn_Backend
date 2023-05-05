const logger = require("../logs/logger");
const db = require('../models');
const ASSOCIATION = require('./association');
const { apiResponseHeader, messages, httpStatusCode} = require('./constant');

const paginate = async(model,pageSize,pageLimit,sortBy="updated_at",orderBy="desc",params)=>{
    try {
        const limit = pageLimit ? Number(pageLimit) : 10;
        const page = pageSize ? Number(pageSize) :1;
        let item;
        let order = "DESC";
        let sortingParams;
            item = sortBy;
            order = orderBy;
            sortingParams = [[`${item}`, `${order}`]];

            let options = {
                offset :getOffset(page,limit),
                limit:limit,
                order:sortingParams,
            }
            const {relationshipModel,searchQuery} = ASSOCIATION.get(model,params);
            options["include"] = relationshipModel;
            search = searchQuery;
            if(Object.keys(search).length){
                options = {...options,...search}
            }

            let {count,rows} = await model.findAndCountAll(options);
            const pagination = {
                page_at:page,
                total_page:getTotalPage(count,limit),
                total_records_count:count,
                total_count_per_page:rows.length,
            }
            const {code,status,message} = apiResponseHeader(
                httpStatusCode.OK,
                messages.success,
                messages.retrieved
            );
            return {
                code,
                status,
                message,
                pagination,
                data:rows,
            };
    } catch (error) {
        console.log("error",error);
        logger.error(`${error.message}`);   
    }
}

const getOffset = (page,limit)=>{
    return page * limit - limit;
}
const getTotalPage = (totalCount,limit) =>{
    if(totalCount < limit){
        return 1;
    }
    return Math.ceil(totalCount/limit);
}
module.exports = paginate;

