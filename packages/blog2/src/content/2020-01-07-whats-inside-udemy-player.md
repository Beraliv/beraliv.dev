---
title: Video player in Udemy
date: "2020-01-07"
description: Subtitles with WebVTT, statistics and DRM
labels:
  - player
keywords:
  - Udemy
  - video player
  - WebVTT
  - statistics
  - DRM
image: /whats-inside-udemy-player/udemy-player-page.png
---

![Udemy player page](/whats-inside-udemy-player/udemy-player-page.png)

I’ve discovered Udemy as a service around 5–6 years ago. Below you can read what I found interesting having a look at the player during several hours.

## WebVTT

The Web Video Text Tracks Format, or WebVTT, is a [specification](https://www.w3.org/TR/webvtt1/) to mark up external text track resources and put them to `<track>` elements.

There is an implementation for Node.js and browsers which is called vtt.js (versions by [VideoJS](https://github.com/videojs/vtt.js) and [Mozilla](https://github.com/mozilla/vtt.js)).

It turns out Udemy uses VideoJS [version 0.12.4](https://vjs.zencdn.net/vttjs/0.12.4/vtt.min.js) (28 Apr 2017) as a [fallback value](https://gist.github.com/Beraliv/92a80cd531cd8e0535f7fabd05fda88d#file-vendor-videojs-js-L2517). The version for me was [0.12.6](https://www.udemy.com/staticx/udemy/js/node_modules/videojs-vtt.js/dist/vtt.min.js?v=328c99057dda7916bc39228043cb195e1cf8acef) (13 Feb 2018).

VTT-files look like that:

![VTT subtitles file structure](/whats-inside-udemy-player/subtitles-vtt-file-structure.png)

<video autoplay loop muted playsinline>
  <source src="https://res.cloudinary.com/beraliv/video/upload/v1626469589/blog_beraliv_dev/whats-inside-udemy-player/udemy-subtitle-update-based-on-vtt_wgc5a5.webm" type="video/webm"></source>
  <source src="https://res.cloudinary.com/beraliv/video/upload/v1626469589/blog_beraliv_dev/whats-inside-udemy-player/udemy-subtitle-update-based-on-vtt.mp4" type="video/mp4"></source>
</video>

Udemy also uses WebVTT to show a popover using thumbnail sprites:

![VTT thumbnail sprites file structure](/whats-inside-udemy-player/thumbnail-sprites-vtt-file-structure.png)

[VideoJS sneakpeek](https://gist.github.com/Beraliv/92a80cd531cd8e0535f7fabd05fda88d#file-vendor-videojs-js-L12507) is used to parse VTT sprites. Find more at [`videojs-sneakpeek`](https://github.com/udemy/videojs-sneakpeek)

<video autoplay loop muted playsinline>
  <source src="https://res.cloudinary.com/beraliv/video/upload/v1626469589/blog_beraliv_dev/whats-inside-udemy-player/udemy-thumbnail-update-based-on-vtt.webm" type="video/webm"></source>
  <source src="https://res.cloudinary.com/beraliv/video/upload/v1626469588/blog_beraliv_dev/whats-inside-udemy-player/udemy-thumbnail-update-based-on-vtt_sz0jnj.mp4" type="video/mp4"></source>
</video>

## Statistics

Video player development isn’t obvious: it includes browser-specific features (e.g. [Fullscreen API](https://caniuse.com/fullscreen), [Promise](https://caniuse.com/?search=Promise), [JavaScript modules via script tag](https://caniuse.com/?search=JavaScript%20modules%20via%20script%20tag), etc), depends on the other libraries which are used (e.g. [`hls.js`](https://github.com/video-dev/hls.js/#compatibility), [`shaka-player`](https://github.com/google/shaka-player#platform-and-browser-support-matrix), [`videojs`](https://videojs.com/html5-video-support/) and so on). This is why it’s a general approach to send player events and to analyse data later.

Udemy uses `XMLHttpRequest` in [`_sendBeaconQueue`](https://gist.github.com/Beraliv/92a80cd531cd8e0535f7fabd05fda88d#file-vendor-videojs-js-L11123) for synchronous and [`sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) in [`_clearBeaconQueue`](https://gist.github.com/Beraliv/92a80cd531cd8e0535f7fabd05fda88d#file-vendor-videojs-js-L11099) for asynchronous requests. The data is sent as a sequence of events.

![Statistics synchronous event example](/whats-inside-udemy-player/statistics-sync-event-example.png)

The full `XMLHttpRequest` example is available [here](https://gist.github.com/Beraliv/fe146fdaf7b87c141ddaf5da10779fda). You can see UTC timestamp as `uti`, event name as `e`, video id as `vid`, etc. The events are send to `https://<ake>.litix.io` where `<ake>` is user id. The `beaconUrl` is `https://vfq2nsli1v76fglgdl9puq0cd.litix.io`.

![Statistics asynchronous event example](/whats-inside-udemy-player/statistics-async-event-example.png)

The full `sendBeacon` example is available [here](https://gist.github.com/Beraliv/2b5e7383bf339e04cd004d99096cf81f). You can see more data about browser, OS, libraries, content, course and so on and so forth. The `beaconUrl` here is https://vfq2nsli1v76fglgdl9puq0cd.litix.io as well.

## DRM

All my old courses’ videos (and even the one I purchased now) are MP4. I didn’t find anything that includes [DRM](https://developer.mozilla.org/en-US/docs/Plugins/Flash_to_HTML5/Video/DRM_and_authentication). However, the url to the stream includes 2 GET-parameters to have access to it: `nva` and `token`, otherwise access is forbidden.

Video tag element contains the source to the stream and plays it just fine. If you try to put src without those parameters, you will get the error:

![Udemy player MEDIA_ERR_SRC_NOT_SUPPORTED error](/whats-inside-udemy-player/MEDIA_ERR_SRC_NOT_SUPPORTED.png)
