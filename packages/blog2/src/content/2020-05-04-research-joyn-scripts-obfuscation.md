---
title: Research Joyn scripts obfuscation
date: "2020-05-04"
description: Did you hear anything about code obfuscation? Let’s have a look at Joyn video player and how they use that in production.
labels:
  - player
  - javascript
keywords:
  - Joyn
  - obfuscation
categories:
image: /research-joyn-scripts-obfuscation/joyn-player-page.png
---

![Joyn player page for TV series](/research-joyn-scripts-obfuscation/joyn-player-page.png)

> [Joyn](https://www.joyn.de/) (previously 7TV) is German “Netflix” which has films, TV series and live TV

Did you hear anything about code obfuscation? Let’s have a look at Joyn video player and how they use that in production.

## Scripts and modules

Let’s open any TV series and see what scripts are in Network panel of DevTools. There are scripts which are loaded from `static.t1p-vod-playout-prod.aws.route71.net`:

![Joyn JS files in DevTools Network](/research-joyn-scripts-obfuscation/joyn-js-files-in-devtools-network.png)

- `ad-tracker.min.js` tracks ad events based on your advertising playback.
- `playback-source-fetcher.min.js` requests https://static.t1p-vod-playout-prod.aws.route71.net/playback-source-fetcher/config/psf.json with server config:

![Joyn psf.json response body](/research-joyn-scripts-obfuscation/psf-json-response-body.png)

- `player-heartbeat-producer.min.js` sends POST requests https://heartbeats.prd.data.s.joyn.de/beat every 10 watched seconds with important information about the playback:

![Joyn /beta request body](/research-joyn-scripts-obfuscation/beat-request-body.png)

- `player-toolkit-loader.min.js` – a simple loader which downloads players based on the player type (DASH, HLS, Tizen, WebOS and WebMAF), other scripts which are listed here (`ad-tracker`, `ad-source-fetcher`, `playback-monitoring` and `player-heartbeat-producer`), external scripts (e.g. `iam` from `ioam.de`), etc.
- `playback-monitoring.min.js`, similar to `player-heartbeat-producer.min.js`, sends POST request method `https://<hash>.cws.conviva.com/0/wsg` periodically with important information about the playback for Conviva video analytics:

![Joyn /wsg request body](/research-joyn-scripts-obfuscation/wsg-request-body.png)

## Obfuscation

I mentioned 5 files separately on purpose, as the structure of the files is different:

![Joyn JS file structure after obfuscation](/research-joyn-scripts-obfuscation/js-file-structure-after-obfuscation.png)

If you look for `{"name":` in `playback-source-fetcher.min.js`, [you will find the entire `package.json`](https://github.com/Beraliv/deconfusion/blob/master/examples/joyn/playback-source-fetcher/output.js#L7607-L7666) (caution: the file has almost 10K lines)

![The entire package.json in playback-source-fetcher.min.js](/research-joyn-scripts-obfuscation/entire-package-json-in-playback-source-fetcher.png)

In dev dependencies you will find [confusion](https://www.npmjs.com/package/confusion) — the library for code obfuscation. To analyse code better, I’ve written simple deobfuscation (opposite to obfuscation) library, which finds the array at the end of the file and places every string where it’s used. The source code is available at [deconfusion](https://github.com/Beraliv/deconfusion)

For instance, there are [2 small files in comparison after and before obfuscation](https://gist.github.com/Beraliv/cfa8f46fa6a71b35923bd9185b9f0f08/revisions?diff=split):

![2 small files in comparison after and before obfuscation](/research-joyn-scripts-obfuscation/comparison-before-and-after-obfuscation.png)

So it really helps for:

1. **Code readability** (better understanding)
2. **Easy debugging** (you can use [Charles](https://www.charlesproxy.com/), replace scripts and get better stack trace of loading and errors)
