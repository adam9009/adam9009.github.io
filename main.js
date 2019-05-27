var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fQ_MfjL6ShE:APA91bHolt1fL8eDrxkCJufuhHQ10W_PFKZSnhjt2MrNfCDM3ROAX291PNrVPUEQuniOsEfnCS0QLkXNYh1YJe0U7QmCH71bNNLXOw9efIoJjgnwSxMQZDEkNS7pkpZYRcgMGD6JvtG2",
    "keys": {
        "p256dh": "BDQnY0jwqOZo441yEfB+VNChztd6W8UVrUXJkNurutUqwa0n7JqJrnG8+jDXimgoGBf6oYKC2K7HKCh2ERE2JlM=",
        "auth": "7uSi1pB2BUAUzySY2S5aNg=="
    }
};

var payload = 'Here is a payload!';

var options = {
    gcmAPIKey: 'AAAARPBE8VM:APA91bG2obxkp0QLGl7GKJTxZ1TBjmqY_fiUTg9AzEHF9FuMkRHQFz9sush7LFhkggjiAuyQfjgkLaaSBH-J_cZCjug5-KIo4wvVLeceyyd4YD9yTow_qbYcRB9wp8hRvtv6G7k_yMg0',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);