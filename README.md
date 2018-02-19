This is a front end for NodeJS Pool based on Ionic and Angular 5 written in TypeScript. It is able to port to the browser, Android, and iOS.

I plan on making this very easy to set up with Docker scripts etc. I'm still developing it though and this'll likely one of the last features to be developed.

You can run it with the following:

Customize data in constants folder to your liking.

```
git clone https://github.com/TimeTravelersHackedMe/MoneroGives.git
cd MoneroGives
npm install -g ionic cordova
npm install
ionic serve // for testing, it'll connect to my Firebase for sample data
/////// or
ionic build --prod
/// www folder will have the servable files with index.html and such
```

Follow the steps here to compile the Android/iOS app:

https://ionicframework.com/docs/intro/deploying/

Sign up for Ionic Pro and you won't have to install Mac OS X or Android Studio/Java JDK.

It will have all the features of PoolUI. I'm open to adding new features (post an issue).

***DISCLAIMER*** This package uses Firebase as a front end database for NodeJS Pool. PoolUI makes way too many API calls so I sync the public API data to Firebase every 30 seconds which then gets relays to clients over websockets. Feel free to fork your own copy that doesn't use Firebase. I think it's worth it though --- I'll be using Firebase for push notifications. They scale and the front end doesn't look broken when the server has hiccups.

Demo front end: https://monero.gives

Demo login screen: https://monero.gives/#/login

# Check out the TODO.md if you can help
