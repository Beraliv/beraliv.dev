import type { IDefinition } from "./Definition";

const unsortedDefinitions = [
  {
    title: "ABR",
    summary: "Adaptive Bitrate",
    description:
      "Dynamically adjusting the quality of video stream based on network conditions",
    link: "https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming",
  },
  {
    title: "Conviva",
    summary: "",
    description: "Video performance monitoring and analytics platform",
    link: "https://www.conviva.com",
  },
  {
    title: "DRM",
    summary: "Digital Rights Management",
    description:
      "Technologies used to protect copyrighted content from unauthorized access",
    link: "https://en.wikipedia.org/wiki/Digital_rights_management",
  },
  {
    title: "FPS",
    summary: "FairPlay Streaming",
    description:
      "Apple's DRM technology for protecting video content on iOS and macOS devices",
    link: "https://developer.apple.com/streaming/fps",
  },
  {
    title: "Widevine",
    summary: "",
    description:
      "Google's DRM technology for protecting video content on Android and web platforms",
    link: "https://www.widevine.com",
  },
  {
    title: "PlayReady",
    summary: "",
    description:
      "Microsoft DRM technology for protecting video content on Windows and Xbox platforms",
    link: "https://www.microsoft.com/playready",
  },
  {
    title: "HLS",
    summary: "HTTP Live Streaming",
    description:
      "Apple's HTTP-based adaptive streaming protocol for delivering audio and video content",
    link: "https://developer.apple.com/streaming",
  },
  {
    title: "MPEG-DASH",
    summary: "Dynamic Adaptive Streaming over HTTP",
    description:
      "An adaptive bitrate streaming technique that enables high-quality streaming of media content over the internet",
    link: "https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP",
  },
  {
    title: "RTMP",
    summary: "Real-Time Messaging Protocol",
    description:
      "A protocol for streaming audio, video, and data over the internet",
    link: "https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol",
  },
  {
    title: "SRT",
    summary: "Secure Reliable Transport",
    description: "A protocol for low-latency video streaming over the internet",
    link: "https://github.com/Haivision/srt",
  },
  {
    title: "WebRTC",
    summary: "Web Real-Time Communication",
    description:
      "A free, open-source project that provides web browsers and mobile applications with real-time communication via APIs",
    link: "https://webrtc.org",
  },
  {
    title: "WebVTT",
    summary: "Web Video Text Tracks",
    description:
      "A web standard for displaying timed text tracks, such as subtitles, captions, descriptions, chapters, etc.",
    link: "https://www.w3.org/TR/webvtt1/",
  },
  {
    title: "X264",
    summary: "",
    description:
      "A free software library and application for encoding video streams into the H.264/MPEG-4 AVC format",
    link: "https://www.videolan.org/developers/x264.html",
  },
  {
    title: "X265",
    summary: "",
    description:
      "A free software library and application for encoding video streams into the H.265/HEVC format",
    link: "https://x265.readthedocs.io/en/default/",
  },
  {
    title: "AV1",
    summary: "AOMedia Video 1",
    description:
      "An open, royalty-free video coding format designed for high-quality video streaming",
    link: "https://aomedia.org/specifications/av1",
  },
  // {
  //   title: "VP8",
  //   summary: "",
  //   description: "",
  //   link: "",
  // },
  // {
  //   title: "VP9",
  //   summary: "",
  //   description: "",
  //   link: "",
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
