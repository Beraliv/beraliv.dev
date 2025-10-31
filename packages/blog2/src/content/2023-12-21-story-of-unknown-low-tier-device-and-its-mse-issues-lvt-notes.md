---
title: A story of an unknown low-tier device and its MSE issues / London Video Tech 2023 notes
date: "2023-12-21"
description: To highlight specifics of working with low-tier devices, to demonstrate its MSE issues and to show how to mitigate them.
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
featured: true
---

⚠️ WARNING: The existing version is in its initial phase and will undergo enhancements and improvements.

![A slide about final approach to mitigate MSE issues on a low-tier device](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/image.png)

## Prerequisite

I've been working with a low-tier device at DAZN for quite a while. Because I had so many helpful materials I've decided to share them with people in outer video community. It took me only 2 weeks to prepare, including several runs at DAZN to collect the feedback, a refinement of the structure and slides updates.

The goal of the talk was:

- to highlight specifics of working with low-tier devices,
- to demonstrate its MSE issues,
- to show how to mitigate them.

Because I was a part of video community for some time, I knew there is [London Video Technology](https://www.meetup.com/London-Video-Technology/). I've been on LVT, [The Summer of Streaming S06E01](https://www.meetup.com/london-video-technology/events/286402769/) on summer 2022. But I never applied myself.

Luckily it's actually a small world, especially in video streaming. Nearly everyone knows everyone. With the help of [Ant Stansbridge](https://github.com/Stansbridge) who works with me at DAZN, I met [Phil Cluff](https://www.linkedin.com/in/philcluff/) and had a chance to present my talk.

On October 3, I went to BBC Broadcasting House where LVT, [Upping the Auntie - S07E03](https://www.meetup.com/london-video-technology/events/296212185/) took a place. It was a pleasure to meet [Phil Cluff](https://www.linkedin.com/in/philcluff/) and [Alan Robinson](https://www.linkedin.com/in/robinsonalan/) in person. I had people from DAZN supporting me: [Luke Belfield](https://www.linkedin.com/in/luke-b-60674a35/) (Engineering Manager), [Ash Byrom](https://www.linkedin.com/in/byrom/) (Staff Engineer) and [Ant Stansbridge](https://github.com/Stansbridge) (Principal Engineer). Thank you a lot for being there for me 🧡

It was my first talk in English and I am very very happy with the way it went. I can say that it went much easier than the one in Russian.

If you'd like to watch the entire talk in English, a recording is available on YouTube:

<YouTube href="https://www.youtube.com/embed/yb6cTNCEGDo" title="A story of an unknown low-tier device and its MSE issues - Alexey Berezin | October 2023" />

Let's walk through all materials that I have so far.

## Table of contents

- [What a low-tier device is 📺](#what-a-low-tier-device-is)
  - [Analysis of the common bits](#analysis-of-the-common-bits)
- [What MSE issues we can face 🤒](#what-mse-issues-we-can-face)
  - [What is MSE](#what-is-mse)
  - [Examples from Samsung, Panasonic, etc](#examples-from-samsung-panasonic-etc)
- [MSE issues of an unknown device 🧪](#mse-issues-of-an-unknown-device)
  - [Introduction to the problem](#introduction-to-the-problem)
  - [Effectiveness](#effectiveness)
  - [Definitions to diagrams](#definitions-to-diagrams)
  - [Problem 1. Previous segments are automatically removed](#problem-1-previous-segments-are-automatically-removed)
  - [Solution 1. Delay appending segments](#solution-1-delay-appending-segments)
  - [Problem 2. Not enough data to start playback](#problem-2-not-enough-data-to-start-playback)
  - [Solution 2.1. Device-specific threshold](#solution-21-device-specific-threshold)
  - [Solution 2.2. Waiting event and video element ready state](#solution-22-waiting-event-and-video-element-ready-state)
  - [Problem 3. No waiting event](#problem-3-no-waiting-event)
  - [Solution 3.1. Stalled event](#solution-31-stalled-event)
  - [Solution 3.2. Timeout after seeking or stalled if earlier](#solution-32-timeout-after-seeking-or-stalled-if-earlier)
  - [Solutions summary](#solutions-summary)
  - [Final solution](#final-solution)
- [Conclusion ⭐️](#conclusion)
- [Links 🔗](#links)

## What a low-tier device is 📺

For me it's a device with limited resources, e.g. low energy consumption, low-tier hardware, etc.

Low-tier devices include Smart TVs (e.g. Samsung TV with Tizen OS, LG TV with WebOS, Panasonic, etc), dongles (such as Chromecast) and different set top boxes, or STBs (there are many UK providers and almost each of them have at least one STB).

### Analysis of the common bits

#### Price

Low-tier devices are **cheap**. Although the price really depends on the type of the device, e.g. Smart TVs can be more expensive than STBs. The lower prices are mainly caused by low-tier hardware, e.g. weak processor, insufficient RAM, slow hard drive or even limited CPU.

#### Performance vs energy consumption

This low-tier hardware brings **low performance**. On the one hand, it can be beneficial for users when we're talking about **low energy consumption** as it may help people save their bills. On the other hand, users get **low video quality** (mostly SD or/and HD).

#### Maintainability

Developers have to work with **bespoke Web API**, meaning that even though Web API signatures are identical to, e.g. Web Browsers, but it doesn't work the same way which is a bit frustrating. So as a developer, you have to accept it as a risk and keep an eye on it.

## What MSE issues we can face 🤒

### What is MSE

First of all, let's define what MSE, or Media Source Extensions, is:

> Media Source Extensions, or MSE, is a set of APIs that allows player developers to playback audio and video content as well as showing text content to the viewer

I've also attached the diagram from MSE specification that shows what MSE includes: it is a `MediaSource` instance with 3 `SourceBuffer` instances for each type of media type (i.e. video, audio and text). Under the hood, there are video and audio decoders that are responsible for decoding audio and video information and play the content to end user.

![The diagram with MSE components from MSE specification](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/mse-components-from-spec.png)

### Examples from Samsung, Panasonic, etc

Here I'd like to mention 4 examples of MSE issues I've worked before.

#### The stalled event dispatched on HTMLVideoElement towards the end of buffered ranges

Many Living Room devices, such as old Samsung TVs, have [stalled event](https://html.spec.whatwg.org/multipage/media.html#event-media-stalled) dispatched near the end of buffered ranges. It can be easily mitigated by introducing a safe gap to the end of buffered ranges.

#### The SourceBuffer.remove call with small time range throws an error

Such [SourceBuffer's remove method](https://w3c.github.io/media-source/#dom-sourcebuffer-remove) behaviour could be observed on [shaka-player](https://github.com/shaka-project/shaka-player) for Samsung TVs. This could be mitigated by [introducing a threshold for small time ranges](https://github.com/shaka-project/shaka-player/commit/b7209f00f82eb8d533ebfc2cb41feba28bf7d2f4).

#### Simultaneous SourceBuffer.appendBuffer calls on audio and video SourceBuffer instances could complete to each other leading to unhealthy buffer

This issue depends on MSE/EME player implementation. When audio and video `SourceBuffer` instances are managed separately, some Living Room devices and STBs cannot cope with simultaneous [SourceBuffer's appendBuffer method](https://www.w3.org/TR/media-source-2/#dom-sourcebuffer-appendbuffer) calls correctly which leads to unhealthy buffer.

It can be mitigated by introducing some kind of "manager" which handles `SourceBuffer['appendBuffer']` calls in one place (such as [StreamingEngine](https://github.com/shaka-project/shaka-player/blob/025502a70c885216b9bbc063025ae80a72780fe6/lib/media/streaming_engine.js#L58) in `shaka-player`).

#### MediaSource.isTypeSupported calls return true for any given MIME type of the media

#### **[MediaSource['isTypeSupported']](https://www.w3.org/TR/media-source/#dom-mediasource-istypesupported) returns `true` for any given MIME type of the media**

This particularly happens on Samsung TVs 2.3 and 2.4. Although it's not a specification-compliant approach, `` `${mimeCodec};width=${width}` `` (where `width` is a representation width) can mitigate the issue when passed to [MediaSource['isTypeSupported']](https://www.w3.org/TR/media-source/#dom-mediasource-istypesupported) in place of `mimeCodec`.

## MSE issues of an unknown device 🧪

### Introduction to the problem

The issue that I've encountered was that the playback wouldn't start on this particular device and I couldn't understand why it doesn't work because playback successfully started for a couple of other devices.

### Effectiveness

Each issue can be solved differently. While one solution can be effective and another one can be not as effective as first one, effectiveness has to be measured to understand what solution to choose. I've decided to use pass rate of one functional test which was run 100 times.

The functional test had a particular structure:

1. Create player
1. Load content
1. Wait for start of playback
1. Assert that playback status is playing

When playback reaches playing status, it means the test passed. Otherwise, it failed.

### Definitions to diagrams

During my talk a lot of diagrams were used to better picture the problems and solutions.

![Definitions](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/definitions.png)

1. It will include video element **events** (such as `loadedmetadata`, `seeking`, `canplay` or others) as purple lines.
2. Blue long rectangles represent the **process of appending segments**, e.g. audio or video.
3. **Timeline** includes both audio and video source buffers with information when segments were appending.

To the bottom, you will also see **buffered ranges**, or the information of segments that are already appended to source buffers.

4. When you will see a green short rectangle, there is an **added segment** in source buffer. For example, first video segment was appended here.
5. When you will see a red short rectangle, there is a **removed segment** in source buffer. For example, first audio segment was removed here.

### Problem 1. Previous segments are automatically removed

Given the playback hasn’t started, I’ve decided to collect the logs and put them as a diagram. I’ve spotted that before the potential start of the playback, there were multiple audio appends (audio 1 and audio 2). And when I looked at the buffered ranges at the start and the end of append buffer process, I’ve seen the buffer of the first appended audio segment disappeared.

![Diagram with an automatically removed segment from source buffer](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-1-previous-segments-are-automatically-removed.png)

Because I’m somewhat familiar with `shaka-player`, I’ve compared it to the way shaka works and I’ve seen it has less frequent appends so I’ve decided to delay the second audio segment append. The main question here is for how long I want to delay appends.

### Solution 1. Delay appending segments

Given I have a functional test, I’ve run it several times and picked several events as candidates for a moment when I can continue appending segments. There were 3 of them. Effectiveness of `loadedmetadata` event has shown that it’s too early to continue appends as it would not let playback start. When we set start time, we have a `seeking` event dispatched on video element and it showed that it’s only 90% effective. `canplay` and `canplaythrough` events showed 100% effectiveness so I picked `canplay` as an earlier event.

![Diagram with segment appends delayed](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-1-delay-appending-segments.png)

### Problem 2. Not enough data to start playback

The second issue that I’ve seen was related to start time we set. For different types of content we do it differently.

On the picture below there are 2 scenarios.

For the first scenario, start time is set closer to the beginning of last appended segment so it has enough data to start the playback. In this case we will start a playback with the delaying approach and it will work consistently.

For the second scenario, the start time is set closer to the end of last appended segment so it doesn't have enough data to start playback.

![Diagrams showing how start of playback depends on position of start time in relation to buffered ranges](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-2-not-enough-data-to-start-playback-buffered-ranges.png)

As we’re currently delaying appending more than one segment, `stalled` event will be dispatched, and playback wouldn't start.

![Diagram with segment appends delayed when there is not enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-2-not-enough-data-to-start-playback-timeline.png)

### Solution 2.1. Device-specific threshold

One way to mitigate the issue is to introduce a device-specific threshold that defines what the enough data is. If the amount of buffer ahead is less than or equal to the threshold, it's treated as not enough data. Otherwise, there is enough data to start playback.

> You can use known limitations of the device and binary search to choose the optimal value.

Given the threshold was chosen, it is used when `seeking` event dispatched on video element. At this point, the decision has to be made whether to continue delaying segment appends or allow to append another audio/video segment.

![Diagram with device-specific threshold with not enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_1-device-specific-threshold-not-enough-data.png)

![Diagram with device-specific threshold with enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_1-device-specific-threshold-enough-data.png)

It showed that this approach didn't change the effectiveness when there is enough data and the effectiveness is still 100%. When there is not enough data, it is 92% effective. Can we make it better?

### Solution 2.2. Waiting event and video element ready state

Another way to mitigate the issue is to use [waiting event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event) and [video element ready state](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState#value). The `waiting` event dispatched when playback has stopped because of a temporary lack of data. The `readyState` indicates the readiness state of video.

In this solution `waiting` event would be a trigger to stop delaying segment appends in case `readyState` is less than `HAVE_FUTURE_DATA`. The `readyState` is used in an equation because some low-tier STBs may dispatch `waiting` events by accident so platform has to ignore these events.

![Diagrams with solution 2.2, case with enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_2-waiting-event-and-video-element-ready-state-enough-data.png)
![Diagrams with solution 2.2, case with not enough data](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-2_2-waiting-event-and-video-element-ready-state-not-enough-data.png)

Based on test runs, this approach demonstrated 100% effectiveness for both test cases: not enough data and enough data.

So that's it, that easy?

### Problem 3. No waiting event

All previous player changes were tested in isolation meaning that there are no UI changes, no analytics and no third-party scripts loaded that usually exist in full application. But when I started testing the changes at the environment closer to the full application, I've seen that previous solution still doesn't work.

After pulling some logs it was clear that there is no [waiting event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event) dispatched on the video element before [stalled event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event).

![Diagrams with problem 3](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/problem-3-no-waiting-event.png)

So I started thinking how I would mitigate this issue and what could be used instead of waiting event.

### Solution 3.1. Stalled event

There were a couple of available solutions and `stalled` event was one of them. Eventually this event was dispatched on video element so why not use it?

![Diagrams with solution 3.1](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-3_1-stalled-event.png)

Although it was a possible candidate, it was completely ineffective (0% in case of "not enough data") for our in-house video player so I decided to try another solution.

### Solution 3.2. Timeout after seeking or stalled if earlier

Another way to workaround this is using timeout. Isn't it always a solution to any problem? 😅

The challenge with timeout was that it has to be small enough and be effective at the same time.

I've defined it as a smallest observable time after start time is set (therefore `seeking` event dispatched on video element).

![Diagrams with solution 3.2](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/solution-3_2-timeout-after-seeking-or-stalled-if-earlier.png)

The best timeout candidate was 90% effective which wasn't too bad, but it wasn't the best solution so it wasn't chosen as a final solution.

### Solutions summary

The effectiveness for all solutions that I've mentioned in my talk is evident in this table:

<Comment text="The table is too wide, overflow: scroll should fix it, but it doesn't" />

| Solution                                         | Enough data | Not enough data |
| :----------------------------------------------- | :---------- | :-------------- |
| 1. Delay appending segments                      | 100%        | 0%              |
| **2.1. Device-specific threshold**               | **100%**    | **92%**         |
| 2.2. Waiting event and video element ready state | 100%        | 0%<sup>\*</sup> |
| 3.1. Stalled event                               | 100%        | 0%              |
| 3.2. Timeout after seeking or stalled if earlier | 100%        | 90%             |

Initially, the concept of using device-specific thresholds seemed unfavorable, but it turned out to be the most effective approach compared to all other suggestions.

The strategy involving the `waiting` event initially seemed highly promising but eventually posed a challenge as it became a limiting factor for the target, proving challenging to resolve.

### Final solution

So final solution looks as a following state machine:

![State machine with final solution](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/final-solution.png)

1. Before start of a playback, segments for both audio and video started appending
1. Once segment for either audio or video has appended, start delaying segment appends
1. When start time has set on video element, event listener is added for `seeking` event dispatch
1. When `seeking` event is dispatched, measurements of enough buffered data based on a device-specific threshold are made
1. If there is NOT enough data on video element, stop delaying appends and start again from step 2.
1. If there is enough data on video element, event listener is added for `canplay` event dispatch
1. When `canplay` event is dispatched, stop delaying appends
1. Playback has started 🟢

## Conclusion ⭐️

Lesson learnt:

1. Aggressive strategies (appending as many segments as possible) may not work on low-tier devices
1. Generic approach on low-tier devices may not necessarily be effective
1. End-to-end testing at early stages (full app) ⭐️

I'd like to stress that conducting functional testing in an environment closest to the end user is essential. It aids developers in detecting issues early on, thereby saving valuable time for the business.

## Links 🔗

1. Presentation in [Google slides](https://docs.google.com/presentation/d/1M99IYUyWb0I3OJDng3CppqksxkXCHyIeMVkE81lSNSI/edit?usp=sharing)
1. Diagrams in [tldraw](https://www.tldraw.com/r/k08aBuV4b_maWj1Xv3DX7?viewport=-575%2C92%2C1513%2C910&page=page%3AA5up7ZSQODMZj5XCdf7h8)
1. Media Source Extensions Spec in [W3C](https://www.w3.org/TR/media-source-2/)
1. [shaka-player](https://github.com/shaka-project/shaka-player) - MSE/EME OSS player
