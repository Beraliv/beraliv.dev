import type { IDefinition } from "./Definition";

const unsortedDefinitions = [
  {
    title: "ABR",
    summary: "Adaptive BitRate",
    description:
      "Dynamically adjusting the quality of video stream based on network conditions",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming",
    },
  },
  {
    title: "Conviva",
    summary: "",
    description: "Video performance monitoring and analytics platform",
    link: {
      text: "Conviva",
      url: "https://www.conviva.com",
    },
  },
  {
    title: "DRM",
    summary: "Digital Rights Management",
    description:
      "Technologies used to protect copyrighted content from unauthorized access",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Digital_rights_management",
    },
  },
  {
    title: "FPS",
    summary: "FairPlay Streaming",
    description:
      "Apple's DRM technology for protecting video content on iOS and macOS devices",
    link: {
      text: "Apple",
      url: "https://developer.apple.com/streaming/fps/",
    },
  },
  {
    title: "Widevine",
    summary: "",
    description:
      "Google's DRM technology for protecting video content on Android and web platforms",
    link: {
      text: "Widevine",
      url: "https://www.widevine.com",
    },
  },
  {
    title: "PlayReady",
    summary: "",
    description:
      "Microsoft DRM technology for protecting video content on Windows and Xbox platforms",
    link: {
      text: "PlayReady",
      url: "https://www.microsoft.com/playready",
    },
  },
  {
    title: "HLS",
    summary: "HTTP Live Streaming",
    description:
      "Apple's HTTP-based adaptive streaming protocol for delivering audio and video content",
    link: {
      text: "Apple Developer",
      url: "https://developer.apple.com/streaming",
    },
  },
  {
    title: "DASH",
    summary: "Dynamic Adaptive Streaming over HTTP",
    description:
      "Standardised adaptive bitrate streaming protocol, developed by MPEG",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP",
    },
  },
  {
    title: "RTMP",
    summary: "Real-Time Messaging Protocol",
    description:
      "A protocol for streaming audio, video, and data over the internet",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol",
    },
  },
  {
    title: "SRT",
    summary: "Secure Reliable Transport",
    description: "A protocol for low-latency video streaming over the internet",
    link: {
      text: "GitHub",
      url: "https://github.com/Haivision/srt",
    },
  },
  {
    title: "WebRTC",
    summary: "Web Real-Time Communication",
    description:
      "A free, open-source project that provides web browsers and mobile applications with real-time communication via APIs",
    link: {
      text: "WebRTC",
      url: "https://webrtc.org/",
    },
  },
  {
    title: "WebVTT",
    summary: "Web Video Text Tracks",
    description:
      "A web standard for displaying timed text tracks, such as subtitles, captions, descriptions, chapters, etc.",
    link: {
      text: "W3C",
      url: "https://www.w3.org/TR/webvtt1/",
    },
  },
  {
    title: "AV1",
    summary: "AOMedia Video 1",
    description:
      "An open, royalty-free video coding format designed for high-quality video streaming",
    link: {
      text: "AOMedia",
      url: "https://aomedia.org/av1/",
    },
  },
  {
    title: "MSE",
    summary: "Media Source Extensions",
    description:
      "A W3C specification that extends HTML5 video and audio elements to allow JavaScript to generate media streams for playback",
    link: {
      text: "W3C",
      url: "https://www.w3.org/TR/media-source/",
    },
  },
  {
    title: "EME",
    summary: "Encrypted Media Extensions",
    description:
      "A W3C specification that provides APIs to control playback of encrypted content",
    link: {
      text: "W3C",
      url: "https://www.w3.org/TR/encrypted-media/",
    },
  },
  {
    title: "CENC",
    summary: "Common ENCryption",
    description:
      "A Common Encryption protection scheme for encrypting media content, allowing it to be played back on different devices using EME",
    link: {
      text: "W3C",
      url: "https://www.w3.org/TR/encrypted-media/#cenc",
    },
  },
  {
    title: "Codec",
    summary: "enCOder & DECoder",
    description:
      "Hardware or software component that encodes (to reduce size) and decodes audio or/and video data stream.",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Codec",
    },
  },
  {
    title: "Ghosting",
    summary: "",
    description:
      "A visual artifact that occurs when a moving object leaves a trail or shadow behind it, often due to the video processing",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ghosting_(television)",
    },
  },
  {
    title: "Glass-to-Glass Latency",
    summary: "",
    description:
      "The time it takes for a video signal to travel from the source (camera) to the display (TV or monitor), including all processing and transmission delays",
    link: {
      text: "Amazon",
      url: "https://aws.amazon.com/media/tech/video-latency-in-live-streaming/",
    },
  },
  {
    title: "WGT",
    summary: "",
    description:
      "A package format for web applications that can be installed and run on Samsung TVs",
    link: {
      text: "Samsung",
      url: "https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-simulator.html",
    },
  },
  {
    title: "IPK",
    summary: "",
    description:
      "A package format for web applications that can be installed and run on LG TVs",
    link: {
      text: "LG",
      url: "https://webostv.developer.lge.com/develop/tools/ide-useful-tips#exporting-ipk",
    },
  },
  {
    title: "Linear channel",
    summary: "",
    description:
      "A traditional TV channel that broadcasts content in a scheduled manner, similar to how cable or satellite TV works",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Broadcast_programming",
    },
  },
  {
    title: "LRD",
    summary: "Living Room Device",
    description:
      "A device that is typically used in a living room setting, such as a Smart TV, set-top box, game consoles, etc.",
    link: {
      text: "YouTube",
      url: "https://developers.google.com/youtube/devices/living-room#:~:text=in%20this%20document.-,Living%20Room%20Devices,and%20Set%2DTop%2DBoxes.",
    },
  },
  {
    title: "OTT",
    summary: "Over-The-Top",
    description:
      "Streaming services that deliver content directly to viewers over the internet, bypassing traditional cable or satellite TV",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Over-the-top_media_service",
    },
  },
  {
    title: "MSS",
    summary: "Microsoft Smooth Streaming",
    description: "Microsoft proprietary adaptive streaming protocol",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming_(MSS)",
    },
  },
  {
    title: "VoD",
    summary: "Video on Demand",
    description:
      "Usually referred to a type of content, with defined start and end, that can be watched by a user whenever they choose, rather than at a scheduled broadcast time",
    link: {
      text: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Video_on_demand",
    },
  },
  // TODO: catch-up content
  // TODO: CDM, as Content Decryption Module
  // TODO: Rebuffering - https://www.mux.com/blog/the-four-elements-of-video-performance
  // TODO: Fidelity
  // TODO: QoE, as Quality of Experience
  // TODO: shaka-player
  // TODO: hls.js
  // TODO: EWMA
  // TODO: PSSH
  // TODO: DVR Window
  // TODO: Key Session
  // TODO: CMAF
  // TODO: NTSC
  // TODO: GOP
  // TODO: SCTE Markers
  // TODO: WebKit
  // TODO: Chromium
  // TODO: Persistent License
  // TODO: AVPlay
  // TODO: Luna
  // TODO: WebMAF
  // TODO: Live Edge
  // TODO: Closed Captions
  // TODO: CIRR
  // TODO: HasPlayer - https://github.com/Orange-OpenSource/hasplayer.js/
  // TODO: ExoPlayer - https://github.com/google/ExoPlayer
] satisfies IDefinition[];

export const definitions = unsortedDefinitions.sort((a, b) => {
  const aName = a.title.toLowerCase();
  const bName = b.title.toLowerCase();

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
});
