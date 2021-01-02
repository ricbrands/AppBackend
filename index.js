const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: 'Teste'
    });
});

app.listen(3333);