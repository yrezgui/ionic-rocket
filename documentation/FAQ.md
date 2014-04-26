#FAQ

I wrote these questions. If you have any other, create a issue there and I will answer it and add it here.

* **Why Ionic Rocket is the best solution ?**

Well it's the best to my eyes because it handles nearly everything when you want to build your HTML5 mobile app and it's easily customizable. You can change the styles, views or scripts languages by adding/modifying two files.

* **Ionic Rocket or Yeoman ?**

It depends on your need. Ionic Rocket is just a boilerplate for now. It doesn't provide a powerful CLI commands like Yeoman generators. If you have the same stack as Ionic Rocket and you don't want to lose time, it's perfect. Otherwise Yeoman can be considered as an alternative.

* **Why LESS while Ionic Framework is using SASS ?**

Even if I am on Mac, Ruby has bad performances on Windows and I didn't want to develop a boilerplate only for Unix users. You have to know that the difference between LESS and SASS isn't big. The cool thing with SASS is the Compass Framework. The equivalent for LESS is LESS HAT.

* **Why Jade instead of HTML ?**

When you work with big HTML pages, it's a pain to debug because it's too verbose. Jade fix that problem. But you can develop pages in HTML, the built system works with it too.

* **Why Ionic Framework instead of jQuery Mobile ?**

I wrote an [article](https://medium.com/mobile-html5-dev/b04aecbeadc3) about it and made a [talk](https://slid.es/yacinerezgui/ionic-framework-phonegap-london) at different meetups to explain that.

* **Why AngularJS instead of BackboneJS or EmberJS ?**

The choice is partly related to Ionic Framework which is only compatible with AngularJS for now. But I still think that AngularJS help you much more to make a web app than its competitors. BackboneJS is much more flexible but you have to code much more to have an equivalent of AngularJS. I didn't play enough with EmberJS to be able to compare.

* **Why Gulp instead of Grunt ?**

Grunt seems more inspired by configuration-oriented build systems. Because of that, people created a plugin for everything instead of coding 15 lines. Gulp is a simple environment, the rest is just code. So you can easily hack it as you want.

* **What is the need of Browserify ?**

The advantage of Browserify is the simplicity of your code. It will looks like a NodeJS structure. It's easier to share code between frontend and backend. Have a look to [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) to understand more about that. And don't be worry of the size of your main JS file, it's stored on the device. The CPU cycles for getting file from your phone memory is insignificant compared to distant network requests.

* **Why Cordova instead of Phonegap ?**

Well if you played a lot with Phonegap, you will see that it's based on Cordova and the last one is much more up to date than the Adobe fork (even if Adobe developers are commiting on both).

* **Is Bower really needed ?**

For now yes, but I'm thinking of having everything on NPM. Bower doesn't bring a lot of good things to make it so different from NPM. We have too much repositories manager, maybe it's time to fix that.
