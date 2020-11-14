const router = require("express").Router();
const axios = require("axios")

const service = axios.create({
    baseURL: 'https://newsapi.org/v2',
});

router.get("/", async (req, res) => {
  try {
    const coronaNews = await service.get(
      `/everything?q=Covid&apiKey=${process.env.NEWS_API_KEY}`
    );
    res.json(coronaNews.data)
    //return coronaNews.data;
  } catch (error) {
    console.log(error)
    res.status(500).json({errorMessage: error.message})
  }
});


module.exports = router