const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-fZ0qJTaLx1ckn7b3ejc7tzqb",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();


// create a simple express api that calls the function above

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080
app.post('/', async(req, res) => {
    const {message, currentModel} = req.body;
    //console.log(message, "message");
    const response = await openai.createCompletion({
        model:  `${currentModel}`, //"text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      //console.log();
      res.json({
        //data: response.data
        message: response.data.choices[0].text 
      })
})

app.get('/models', async(req, res) => {
    //openai.listModels
    const response = await openai.listEngines()
    //console.log(response)
    //console.log(await response.data.data);
    
      res.json({
        models: response.data.data
      })
})
app.listen(port, () => {
    console.log(`Example app listening to http://localhost.${port}`)
});