const https = require('https');

const express = require('express');
const app = require('express')();
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path =  require('path'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000


const publicVapidKey='BDWedh8dCCWap1gQawGp2xuMHhvJZ3KcqtKT8-zEhBMyfA8Stf-pERFmOAVZAkMAfNeS8tKwIuQmnvugCl3OTi8'
const privateVapidKey='cxhz0mHpK7jWb5NxP4SiTj-PhJRj7B3FanSSUI8Atpg'

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey , privateVapidKey)

app.post('/subscribe', (req, res) => {
    const subscription = req.body
    res.status(201).json({});

    const playload = JSON.stringify({title: 'push test'})
    webpush.sendNotification(subscription, playload).then(data=> console.log(data)).catch(err=> console.error(err))
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});