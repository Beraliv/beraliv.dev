import type { IDefinition } from "./Definition";

const unsortedDefinitions = [
  {
    title: "ABR",
    summary: "Adaptive Bitrate",
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
    title: "MPEG-DASH",
    summary: "Dynamic Adaptive Streaming over HTTP",
    description:
      "An adaptive bitrate streaming technique that enables high-quality streaming of media content over the internet",
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
    title: "X264",
    summary: "",
    description:
      "A free software library and application for encoding video streams into the H.264/MPEG-4 AVC format",
    link: {
      text: "VideoLAN",
      url: "https://www.videolan.org/developers/x264.html",
    },
  },
  {
    title: "X265",
    summary: "",
    description:
      "A free software library and application for encoding video streams into the H.265/HEVC format",
    link: {
      text: "VideoLAN",
      url: "https://www.videolan.org/developers/x265.html",
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
  // {
  //   title: "VP8",
  //   summary: "",
  //   description: "",
  //   link: {
  //     text: "Google",
  //     url: "https://www.webmproject.org/vp8/",
  //   },
  // },
  // {
  //   title: "VP9",
  //   summary: "",
  //   description: "",
  //   link: {
  //     text: "Google",
  //     url: "https://www.webmproject.org/vp9/",
  //   },
  // },
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
