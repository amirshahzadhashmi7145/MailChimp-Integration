const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.post('/api/subscribe',async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).send({error : 'email is required'});
    }

    const {MAILCHIMP_SERVER_PREFIX,MAILCHIMP_AUDIENCE_ID} = process.env;

    try{
        const response = await axios.post(`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
            {
                email_address: email,
                status: 'subscribed'
            },
            {
                headers: {
                    Authorization: `apiKey ${process.env.MAILCHIMP_API_KEY}`,
                    'content-type': 'application/json',
                }
            }
        );

        return res.status(200).json({message: 'successfully subscribed',data: response.data});
    } catch (error) {
    return res.status(500).json({ error: 'Failed to subscribe', details: error.response.data });
}
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}...`);
});