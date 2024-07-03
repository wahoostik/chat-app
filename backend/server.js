const express = require('express');
const app = express();
const chalk = require('chalk');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.blue(`Serveur en ligne sur le port : ${port}`));
});