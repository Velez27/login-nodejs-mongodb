const moongose = require('mongoose');

moongose.connect('mongodb://localhost/usuarios', {useNewUrlParser: true});

const db = moongose.connection;

db.addListener('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB is connected');
});

