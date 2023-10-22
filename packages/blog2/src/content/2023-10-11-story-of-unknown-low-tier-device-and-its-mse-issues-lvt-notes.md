---
title: A story of an unknown low-tier device and its MSE issues / London Video Tech 2023 notes
date: "2023-10-11"
description: The goal of the talk is to highlight specifics of working with low-tier devices, to demonstrate its MSE issues and to show how to mitigate them.
labels:
  - player
keywords:
  - video player
  - media source extensions
  - MSE
  - low-tier devices
  - LVT
  - London Video Technology
  - Upping the Auntie
  - S07E03
image: /story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/image.png
---

![I'm talking about the approach to mitigate all found MSE issues on a low-tier device](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/image.png)

## Prerequisite

I've been working with a low-tier device at DAZN for some time and because I had so many helpful materials I've decided to share them with people in outer video community. It took me around 2 weeks to prepare, including several runs at DAZN to collect the feedback, a refinement of the structure and updating slides.

On October, 3, I went to BBC Broadcasting House where I met [Phil](https://www.linkedin.com/in/philcluff/) and [Alan](https://www.linkedin.com/in/robinsonalan/) in person. With support of my [Engineering Manager Luke](https://www.linkedin.com/in/luke-b-60674a35/), [Staff Engineer Ash](https://www.linkedin.com/in/byrom/) and Principal Engineer Ant (he introduced me to Phil which I really appreciate 🧡), I've given the talk and I am very very happy with the way it went. Let's walk through all materials that I have so far.

## Table of contents

- [What a low-tier device is 📺](#what-a-low-tier-device-is-📺)
  - [Analysis of the common bits](#analysis-of-the-common-bits)
- [What MSE issues we can face 🤒](#what-mse-issues-we-can-face-🤒)
  - [What is MSE](#what-is-mse)
  - [Examples from Samsung, Panasonic, etc](#examples-from-samsung-panasonic-etc)
- [MSE issues of an unknown device 🧪](#mse-issues-of-an-unknown-device-🧪)
  - [Introduction to the problem](#introduction-to-the-problem)
  - [Effectiveness](#effectiveness)
  - [Definitions to diagrams](#definitions-to-diagrams)
  - [Problem 1. Previous segments are automatically removed](#problem-1-previous-segments-are-automatically-removed)
  - [Solution 1. Delay appending segments](#solution-1-delay-appending-segments)
  - [Problem 2: Not enough data to start playback](#problem-2-not-enough-data-to-start-playback)
  - [Solution 2.1: Device-specific threshold](#solution-21-device-specific-threshold)
  - [Solution 2.2: Waiting event and video element ready state](#solution-22-waiting-event-and-video-element-ready-state)
  - [Problem 3: No waiting event](#problem-3-no-waiting-event)
  - [Solution 3.1: Stalled event](#solution-31-stalled-event)
  - [Solution 3.2: Timeout after seeking or stalled if earlier](#solution-32-timeout-after-seeking-or-stalled-if-earlier)
  - [Solutions summary](#solutions-summary)
  - [Final solution](#final-solution)
- [Conclusion ⭐️](#conclusion-⭐️)
- [Links 🔗](#links-🔗)

The goal of the talk was:

- to highlight specifics of working with low-tier devices,
- to demonstrate its MSE issues,
- to show how to mitigate them.

## What a low-tier device is 📺

For me it's a device with limited resources, e.g. low energy consumption, low-tier hardware, etc.

Low-tier devices include Smart TVs (e.g. Samsung TV with Tizen OS, LG TV with WebOS, Panasonic, etc), dongles (such as Chromecast) and different set top boxes, or STBs (there are many UK providers and almost each of them have at least one STB)

### Analysis of the common bits

Low-tier devices are **cheap**. The price really depends on the type of the device, e.g. Smart TVs can be more expensive than STBs. The lower prices are mainly caused by low-tier hardware, e.g. weak processor, insufficient RAM, slow hard drive or even limited CPU. This low-tier hardware brings **low performance**. On the one hand, it can be beneficial for users when we're talking about **low energy consumption** as it may help people save their bills. On the other hand, users get **low video quality** (mostly SD or/and HD).

For developers, it means that we may face **bespoke Web API**, meaning that even though Web API looks exactly the same as for, e.g. Web Browsers, but it doesn't work the same way which is a bit frustrating. So you need to bear this in mind and keep an eye on it.

## What MSE issues we can face 🤒

### What is MSE

First of all, let's define what MSE, or Media Source Extensions, is:

> Media Source Extensions, or MSE, is a set of APIs which allow player developers to playback audio and video content as well as showing text content to the viewer

I've also attached the diagram from MSE specification which shows what MSE includes: it's `MediaSource` instance with 3 `SourceBuffer` instances for each type of media type (i.e. video, audio and text). Under the hood, there are video and audio decoders which are responsible for decoding audio and video information and plays the content to end user.

![The diagram with MSE components from MSE specification](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/mse-components-from-spec.png)

### Examples from Samsung, Panasonic, etc

Here I'd like to mention 4 examples of MSE issues I've worked before.

#### The stalled event dispatched on HTMLVideoElement towards the end of buffered ranges

Many Living Room devices, such as old Samsung TVs, have [`stalled` event](https://html.spec.whatwg.org/multipage/media.html#event-media-stalled) dispatched near the end of buffered ranges. It can be easily mitigated by introducing a safe gap to the end of buffered ranges.

#### The SourceBuffer.remove call with small time range throws an error

Such [`SourceBuffer['remove']`](https://w3c.github.io/media-source/#dom-sourcebuffer-remove) behaviour could be observed on [shaka-player](https://github.com/shaka-project/shaka-player) for Samsung TVs. This could be mitigated by [introducing a threshold for small time ranges](https://github.com/shaka-project/shaka-player/commit/b7209f00f82eb8d533ebfc2cb41feba28bf7d2f4).

#### Simultaneous SourceBuffer.appendBuffer calls on audio and video SourceBuffer instances could complete to each other leading to unhealthy buffer

This issue depends on how MSE/EME player is implemented. When `SourceBuffer` instances are handled separately, some Living Room devices cannot cope with simultaneous [`SourceBuffer['appendBuffer']`](https://www.w3.org/TR/media-source-2/#dom-sourcebuffer-appendbuffer) calls correctly which leads to unhealthy buffer.

It can be mitigated by introducing some kind of "manager" which handles `SourceBuffer['appendBuffer']` calls in one place (such as [StreamingEngine in `shaka-player`](https://github.com/shaka-project/shaka-player/blob/025502a70c885216b9bbc063025ae80a72780fe6/lib/media/streaming_engine.js#L58)).

#### MediaSource.isTypeSupported calls return true for any given MIME type of the media

#### **[MediaSource['isTypeSupported']](https://www.w3.org/TR/media-source/#dom-mediasource-istypesupported) returns `true` for any given MIME type of the media**

This particularly happens on Samsung TVs 2.3 and 2.4. Although it's not a specification-complaint approach, `` `${mimeCodec};width=${width}` `` (where `width` is a representation width) can mitigate the issue when passed to [MediaSource['isTypeSupported']](https://www.w3.org/TR/media-source/#dom-mediasource-istypesupported) in place of `mimeCodec`.

## MSE issues of an unknown device 🧪

### Introduction to the problem

TODO: text

I have encountered the issue where playback wouldn't start and couldn't understand why it doesn't work because playback successfully started for a couple of other devices. I will go through several problems and will show you how I worked around or resolved them.

### Effectiveness

TODO: text

To measure the effectiveness of my solutions I've decided to use a functional test pass rate after 100 runs.

The test has a following structure:

1. Create player
1. Load content
1. Wait for start of playback
1. Assert that playback status is playing

When it's true, it means the test passed. Otherwise, it failed.

### Definitions to diagrams

TODO: text

1. Video element events
1. Segment append process
1. Timeline
1. Appended first audio segment
1. Removed first video segment

### Problem 1. Previous segments are automatically removed

TODO: text

Given the playback hasn’t started, I’ve decided to collect the logs and put it as a diagram. I’ve spotted that before the potential start of the playback, there were multiple audio appends. And when I looked at the buffered ranges at the start and the end of append buffer process, I’ve seen the buffer of the first appended segment disappeared. Because I’m somewhat familiar with shaka, I’ve compared it to the way shaka works and I’ve seen it has less frequent appends so I’ve decided to delay the second audio segment append. The main question here is for how long i want to delay appends.

![Diagrams with problem 1](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-1-previous-segments-are-automatically-removed.png)

### Solution 1. Delay appending segments

TODO: text

Given I have a functional test, I’ve run it several times and picked several events as candidates for a moment when I can continue appending segments. There were 3 of them. Effectiveness of _loadedmetadata_ has shown that it’s too early to continue appends as it would not let playback start. When we set start time, we have a _seeking_ event dispatched on video element and it showed that it’s only 90% effective. Canplay and canplaythrough showed 100% effectiveness so I picked **canplay** as an earlier event.

![Diagrams with solution 1](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-1-delay-appending-segments.png)

### Problem 2: Not enough data to start playback

TODO: text

The second issue that I’ve seen was related to start time we set. For different types of content we do it differently. On the left side you see the picture with buffered ranges. On the top one start time is set closer to the beginning of last appended segment so it has enough data to start the playback. So for this scenario we will start a playback with the approach described on previous slides. On the bottom one the start time is set closer to the end of last appended segment so it doesn’t have enough data to start playback. And as we’re currently delaying appending more than one segment, this blocks us from start of the playback. In this scenario you will get stalled event and will not start a playback. To mitigate this, I’ve come up with 2 solutions.

![Diagrams with problem 2, buffered ranges](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-2-not-enough-data-to-start-playback-buffered-ranges.png)
![Diagrams with problem 2, timeline](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-2-not-enough-data-to-start-playback-timeline.png)

### Solution 2.1: Device-specific threshold

TODO: text

The first one uses threshold which is device-specific. Because we measure effectiveness for 2 scenarios now, I’ve measured each of them. For enough data nothing is changed and it’s still 100% effective. For not enough data the situation is improved as it’s 92% effective. Can we make it better?

![Diagrams with solution 2.1, case with enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_1-device-specific-threshold-enough-data.png)
![Diagrams with solution 2.1, case with not enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_1-device-specific-threshold-not-enough-data.png)

### Solution 2.2: Waiting event and video element ready state

TODO: text

100% (not enough data) and 100% (enough data) effective

![Diagrams with solution 2.2, case with enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_2-waiting-event-and-video-element-ready-state-enough-data.png)
![Diagrams with solution 2.2, case with not enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_2-waiting-event-and-video-element-ready-state-not-enough-data.png)

### Problem 3: No waiting event

TODO: text

What can be used instead of waiting event?

![Diagrams with problem 3](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-3-no-waiting-event.png)

### Solution 3.1: Stalled event

TODO: text

0% (not enough data) and 100% (enough data) effective

![Diagrams with solution 3.1](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-3_1-stalled-event.png)

### Solution 3.2: Timeout after seeking or stalled if earlier

TODO: text

90% (not enough data) and 100% (enough data) effective

![Diagrams with solution 3.2](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-3_2-timeout-after-seeking-or-stalled-if-earlier.png)

### Solutions summary

TODO: text

Effectiveness for all solutions:

| Solution                                         | Enough data | Not enough data |
| :----------------------------------------------- | :---------- | :-------------- |
| 1. Delay appending segments                      | 100%        | 0%              |
| **2.1. Device-specific threshold**               | **100%**    | **92%**         |
| 2.2. Waiting event and video element ready state | 100%        | 0%<sup>\*</sup> |
| 3.1. Stalled event                               | 100%        | 0%              |
| 3.2. Timeout after seeking or stalled if earlier | 100%        | 90%             |

### Final solution

TODO: text

TODO: theme looks good in light theme only

![State machine with final solution](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/final-solution.png)

## Conclusion ⭐️

Lesson learnt:

1. Aggressive strategies (appending as many segments as possible) may not work on low-tier devices
1. Generic approach on low-tier devices may not necessarily be effective enough
1. End-to-end testing at early stages (full app)

TODO: text

## Links 🔗

1. Google slides - https://docs.google.com/presentation/d/1M99IYUyWb0I3OJDng3CppqksxkXCHyIeMVkE81lSNSI/edit?usp=sharing
