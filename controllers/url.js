const shortId =require("shortid");

const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortid = shortId();

    await URL.create({
        shortId:shortid,
        redirectURL:body.url,
        visited:[]

    })
    return res.json( {id:shortid})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    })
}
module.exports= {
    handleGenerateNewShortURL,
    handleGetAnalytics
}