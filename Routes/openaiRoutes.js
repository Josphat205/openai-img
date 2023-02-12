const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.post('/generate', async(req, res) => {

    const { prompt, size } = req.body;

    const imgSize  = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    try {
       const response = await openai.createImage({
        prompt,
        n: 1,
        size: imgSize,
       })
       const imageUri = response.data.data[0].url;
         res.status(200).json({
            message: 'Image generated successfully',
            response: imageUri
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(500).json({
            error: error
        });
    }
});
// Path: Routes\openaiRoutes.js
// Compare this snippet from index.js:
module.exports = router;