const express = require('express');
const wishList = require('./wishList');
const app = express();
const port = process.env.PORT || 3090;
const countryNames = wishList.map((country) => `${country.name}`).join(",");



app.get('/', (req, res) => {
    res.send(`List of Countries:\n${countryNames}`);
});

app.post('/api/countries', (req, res) => {
    const newCountry = req.body;
    wishList.push(newCountry);
    res.status(201).send(`Country added: ${newCountry.name}`);
});

app.get('/api/countries/:code', (req, res) => {
    const countryCode = req.params.code;
    const foundCountry = wishList.find((country) => country.alpha2Code === countryCode || country.alpha3Code === countryCode);

    if (foundCountry) {
        res.send(`${foundCountry}`);
    } else {
        res.status(404).send(`Country not found`);
    }
});

app.listen(port, () => console.log(`Example listening on port http://localhost:${port}`));
