---
title: Video player in Amazon
date: "2019-12-17"
description: From video tag to the implementation, state machine, the way bundle is loaded, bundle names
labels:
  - player
keywords:
  - Amazon Prime
  - video player
image: /amazon-prime-video-player-investigation/amazon-prime-page.png
---

![Amazon Prime page](/amazon-prime-video-player-investigation/amazon-prime-page.png)

Today I had an hour of my free time to learn how Amazon Prime Video Player is working. I’ll show you my small investigation of what I found.

## Where is the main script

Playing and pausing is the core functionality of the player. Therefore it’s easy to get where the main script is situated by doing the following:

1. Pause the player

![Paused Amazon Prime Video player](/amazon-prime-video-player-investigation/paused-amazon-player.png)

2. Find `<video>` tag in `DevTools > Elements`. It could be 2 video elements, you need the one which is both 100% width and height

![Video element in DevTools](/amazon-prime-video-player-investigation/video-element-in-devtools.png)

3. You need `DevTools > Console` to mock standard play method having current video:

```javascript
$0.play = () => {
  debugger;
};
```

4. Then you try to play video using player controls

5. Having `Call Stack` you can go to the file, which initiated a method `play`

6. You now know the main script name, which Amazon Prime pointed at the moment of the debugging to `blob:https://www.amazon.com/1a511ffb-e998-43b9-be96-51b11a55ab37`, you can see it in `Sources > Page`

![Start debugging Amazon Prime Video player](/amazon-prime-video-player-investigation/start-debugging.png)

## What can you find interesting inside the script

### Private properties

In comparison to Google and [Closure Compiler](https://developers.google.com/closure/compiler), Amazon Player developers do NOT minify private properties, which is why everybody can read most of the script code without problem, even if you don’t have [Source Maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).

### State Machine

You can also find `this.stateMachine`, this means that all the states and transitions between them are declared inside, not all transitions are allowed though. Anyway it’s better for controlling, testing and debugging (at least better than having a lot of flags with names like `isPlaying`, `isPause` etc.)

![State machine inside Amazon Prime Video player](/amazon-prime-video-player-investigation/state-machine.png)

Key is the **current state**, values are **the states which are available** for the current state **to have a transition to**.

### Loading a bundle

If you reload the page several times, you can see that a bundle `blob:https://www.amazon.com/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` has different names. It means there is a loader where you can find a way to load the script with different names. In `DevTools > Network` you can see `Initiator` and go from file to file:

- [ATVWebPlayer.js](https://js-assets.aiv-cdn.net/playback/web_player/ATVWebPlayer/1.0.200751.0/js/ATVWebPlayer.js)
- [WebLoader.js](https://js-assets.aiv-cdn.net/playback/web_player/WebLoader.js)
- Inlined script which is added with type `application/json` and has an id — `av-wconf-dv-web-player-cfg`, which has a link to a loader

In `WebLoader` there is hardcoded `AppLoaderConfig`. After reloading several times I couldn’t find a difference. Looks like config of stable version of modules which are used for different purposes. The config looks like that:

![WebLoader configuration object](/amazon-prime-video-player-investigation/amazon-prime-video-player-config.png)

A bundle which we had a look into was loaded from `ATVWebPlayer.js` as a string of `6MB` size!!! The string is taken from [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). The object after completed transaction is the following:

![Main bundle as a string](/amazon-prime-video-player-investigation/main-bundle-string.png)

From the given string we can create a `Blob`, create object url as a script:

![Script from the main bundle string](/amazon-prime-video-player-investigation/script-from-main-bundle-string.png)

And we come back to the script which code initiated `play` when we debugged it in the first section. The name of the module is `ATVWebCascadesPlayer`
