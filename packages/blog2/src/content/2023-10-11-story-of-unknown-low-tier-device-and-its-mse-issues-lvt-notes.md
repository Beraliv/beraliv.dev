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

![I'm talking about the approach to mitigate all MSE issues on a low-tier device](/story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes/image.png)

## Prerequisite

I've been working with one low-tier device at DAZN for some time and because I had so many helpful materials I've decided to share them to people in outer video community. It took me around 2 week to prepare, including several runs at DAZN to collect the feedback, a refinement of the structure and updating slides.

On October, 3, I went to BBC Broadcasting House where I met [Phil](https://www.linkedin.com/in/philcluff/) and [Alan](https://www.linkedin.com/in/robinsonalan/) in person. With support of my [Engineering Manager Luke](https://www.linkedin.com/in/luke-b-60674a35/), [Staff Engineer Ash](https://www.linkedin.com/in/byrom/) and Principal Engineer Ant (who contacted me with Phil), I've given the talk and I am very very happy about the way it went. Let's sum it up.

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

The goal of the talk is:

- to highlight specifics of working with low-tier devices,
- to demonstrate its MSE issues,
- to show how to mitigate them.

## What a low-tier device is 📺

It’s device with limited resources, e.g. low energy consumption, low-tier hardware, etc.

It includes different types of devices:

- Smart TVs (e.g. Samsung, LG, Panasonic, etc)
- Dongles
- Set top boxes

### Analysis of the common bits

Advantages:

- Cheap (but the price depends on the type of the device)
- Low energy consumption (which can help you save bills)

Disadvantages:

- Low performance because of low-tier hardware
  - Weak processor
  - Insufficient RAM
  - Slow hard disk drive
  - Limited CPU
- Low video quality (only SD and HD)
- **Bespoke Web API on top of old Chromium engine**

For developers, it means that we may face bespoke Web API, meaning that even it looks exactly the same as for, e.g. Web Browsers, it doesn't mean it works the same way which is a bit sad. So you need to bear this in mind and keep an eye on it.

## What MSE issues we can face 🤒

### What is MSE

> Media Source Extensions, or MSE, is a set of APIs which allow player developers to playback audio and video content as well as showing text content to the viewer

![The diagram with MSE components from MSE specification](https://www.w3.org/TR/media-source/pipeline_model.svg)

### Examples from Samsung, Panasonic, etc

- [stalled](https://html.spec.whatwg.org/multipage/media.html#event-media-stalled) event towards the end of buffered ranges (it can be mitigated with safe gap to the end of buffered ranges)
- small time range [remove](https://w3c.github.io/media-source/#dom-sourcebuffer-remove) throws error (it can be mitigated with threshold - [fix in shaka](https://github.com/shaka-project/shaka-player/commit/b7209f00f82eb8d533ebfc2cb41feba28bf7d2f4))
- audio and video [appendBuffer](https://www.w3.org/TR/media-source-2/#dom-sourcebuffer-appendbuffer) competes to each other if the order isn’t predicted (it can be mitigated with scheduler for both audio and video, e.g. [StreamingEngine in shaka](https://github.com/shaka-project/shaka-player/blob/025502a70c885216b9bbc063025ae80a72780fe6/lib/media/streaming_engine.js#L58))
- [isTypeSupported](https://www.w3.org/TR/media-source/#dom-mediasource-istypesupported) returns `true` for any given input

## MSE issues of an unknown device 🧪

### Introduction to the problem

I have encountered the issue where playback wouldn't start and couldn't understand why it doesn't work because playback successfully started for a couple of other devices. I will go through several problems and will show you how I worked around or resolved them.

### Effectiveness

To measure the effectiveness of my solutions I've decided to use a functional test pass rate after 100 runs.

The test has a following structure:

1. Create player
1. Load content
1. Wait for start of playback
1. Assert that playback status is playing

When it's true, it means the test passed. Otherwise, it failed.

### Definitions to diagrams

1. Video element events
1. Segment append process
1. Timeline
1. Appended first audio segment
1. Removed first video segment

### Problem 1. Previous segments are automatically removed

### Solution 1. Delay appending segments

### Problem 2: Not enough data to start playback

### Solution 2.1: Device-specific threshold

### Solution 2.2: Waiting event and video element ready state

### Problem 3: No waiting event

### Solution 3.1: Stalled event

### Solution 3.2: Timeout after seeking or stalled if earlier

### Solutions summary

### Final solution

## Conclusion ⭐️

Lesson learnt:

1. Aggressive strategies (appending as many segments as possible) may not work on low-tier devices
1. Generic approach on low-tier devices may not necessarily be effective enough
1. End-to-end testing at early stages (full app)
