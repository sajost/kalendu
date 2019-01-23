const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');
const fbadmin = require('firebase-admin');

const tunnel = require('tunnel2')
    // Create your Proxy Agent 
    // Please choose your tunneling method accordingly, my case
    // is httpsoverHttp, yours might be httpsoverHttps
    // const proxyAgent = tunnel.httpsOverHttp({
    //     proxy: {
    //         host: 'pro-int.brz.fiducia.de',
    //         port: '8080',
    //         proxyAuth: 'yc0p401:windaDa4Me20821' // Optional, required only if your proxy require authentication
    //     }
    // });

var fbsa = require("./hide/sport4u-df275-firebase-adminsdk-0gdvx-d39e5f6c7f.json");

const VAPID_PUBLIC = 'BJcgsnnv4yYC_UeZ1cYhvFndCHa2s0fJYU-lnO_HKpki3g0RwGHZo3mTO0FkUuJPO2FtsLnPwdbiRyZpN7WRN9c';
const VAPID_PRIVATE = 'KNAWy9q9qx-6EZOD9_FSs0gJvKs5mqmEoXsX3QDgCG0';

fbadmin.initializeApp({
    credential: fbadmin.credential.cert(fbsa),
    databaseURL: "https://sport4u-df275.firebaseio.com",
    databaseAuthVariableOverride: null,
});
// Get a reference to the database service
var fs = fbadmin.firestore();

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:quizpiggy@gmail.com', VAPID_PUBLIC, VAPID_PRIVATE);


const fakeDatabase = [];
app.post('/subscription', (req, res) => {
    // console.log('------req------');
    // console.log(res);
    const subscription = req.body;
    console.log('param=' + req.param('group'));
    console.log('------body------');
    // fakeDatabase.push(subscription);
    // const group_id = req.param('id');
    var sub_group = {
        'group_id': req.param('group'),
        'subscription': subscription
    }
    var setDoc = fs.collection('notifications').doc().set(sub_group);

    console.log(sub_group);
    res.status(200).json({
        message: "Subscription added successfully."
    });
});

app.post('/sendnotifications', (req, res) => {
    const notificationPayload = {
        notification: {
            title: 'New Notification',
            body: 'This is the body of the notification',
        }
    };
    console.log(notificationPayload.notification);
    const promises = [];
    fakeDatabase.forEach(subscription => {
        promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
    });
    Promise.all(promises)
        .then(() =>
            res.status(200).json({
                message: 'Newsletter sent successfully.'
            })
        )
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
});

app.get('/games', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    // res.send('uhra');
    // const v = ref.once('value').then(snap => snap.val())
    // res.send(v);
    // console.log(starCountRef);
    const r = [];
    fs.collection('notifications')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.data());
                // console.log(doc.id, '=>', doc.data());
                // res.send(doc.data());
                r.push(doc.data());
            });
            console.log(r);
            res.status(200).json(r);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});