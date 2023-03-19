const express = require('express')
const axios = require('axios')
const routes = express.Router()
const API_KEY = "59ea342afe068afcac8a0852a71699a0";

routes.get('/news',async(req, res)=> {
    try {
        let number = 10;
        if (req && req.query && req.query.number) {
            let temp_number = parseInt(req.query.number);
            if (typeof temp_number == 'number') {
                number = temp_number
            } else {
                res.status(400).json({error: 'NOT_SUPPORTED_VALUE', message: 'Please pass valid value in param'});
            }
        }
        if (number > 100) {
            res.status(200).json({error: 'MAX_ARTICLE_LIMIT', message: 'Max 100 article'});
        }
        const url = `https://gnews.io/api/v4/top-headlines?category=general&max=${number}&apikey=${API_KEY}`;
        const articles = await axios.get(url);
        res.status(200).json(articles.data);
    } catch (error) {
        if (error.message) {
            res.status(500).send(error.message);
        }
    }
})

routes.get('/search',async(req, res)=> {
    try {
        let q;
        let field = 'title';
        if (req && req.query && req.query.q && req.query.q.trim()) {
            q = req.query.q;
        } else {
            res.status(400).json({error: 'NOT_SUPPORTED_VALUE', message: 'Please enter search'});
        }
        if (req && req.query && req.query.field && req.query.field.trim()) {
            field = req.query.field;
        }
        const url = `https://gnews.io/api/v4/search?q=${q}&in=${field}max=10&apikey=${API_KEY}`;
        const articles = await axios.get(url);
        res.status(200).json(articles.data);
    } catch (error) {
        if (error.message) {
            res.status(500).send(error.message);
        }
    }
})


module.exports=routes