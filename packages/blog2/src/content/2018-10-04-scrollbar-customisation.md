---
title: Scrollbar customisation
date: "2018-10-04"
description: CSS support in different browser engines, hacks and tricks, JS libraries
labels:
  - css
  - javascript
keywords:
  - scrollbar
  - customisation
  - javascript
  - css
image: /scrollbar-customisation/macos-scrollbar.png
---

One day some designers provide you with beautiful mock-ups 🌠 and … custom macOS-like scrollbars which look like:

![MacOS-like scrollbar](/scrollbar-customisation/macos-scrollbar.png)

But maybe on the left, smaller or bigger, with different indents dependent on whether it’s mobile 📱, desktop 🖥️ or TV screen 📺 Asking more?
But the reality is… a customisation of scrollbars remains same since the end of 90s. If my dad was programming, he would make fun of me all day while I found the solution to make everything universal and stable. [It’s 2020 and it’s still a PITA](https://stackoverflow.com/questions/6165472/custom-css-scrollbar-for-firefox/6165489#6165489).

## Native support

### ✅ Webkit and Blink

```css title=WebKIT Pseudo-elements for scrollbar
::-webkit-scrollbar {
  /** */
}
::-webkit-scrollbar-button {
  /** */
}
::-webkit-scrollbar-track {
  /** */
}
::-webkit-scrollbar-track-piece {
  /** */
}
::-webkit-scrollbar-thumb {
  /** */
}
::-webkit-scrollbar-corner {
  /** */
}
::-webkit-resizer {
  /** */
}
```

It means at least it’s working on Chrome, Safari, Opera, [Edgium](https://www.windowscentral.com/faq-edge-chromium) (Edge based on WebKit for iOS and Blink for Android, Windows and MacOS) and and less known such as Vivaldi and [others](https://en.wikipedia.org/wiki/List_of_web_browsers#Blink-based).

### ✅ Gecko

Since [Firefox 64](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/64#css) was released, scrollbar customisation is now available.

I remind you, that [original bug](https://bugzilla.mozilla.org/show_bug.cgi?id=77790) was reported 18 years ago, only [less than 1 year ago implementation of CSS Scrollbars Module Level 1](https://bugzilla.mozilla.org/show_bug.cgi?id=1460109) was considered 😔.

Yet it’s not working for me when you try this chunk of CSS:

```css title=Gecko CSS properties for scrollbar color and width
.container {
  scrollbar-color: rebeccapurple green;
  scrollbar-width: 5px;
}
```

Check it in your FF, mine is not working with this.

Example: https://jsfiddle.net/beraliv/4yd7bg2r/14/

However, if you [try this](https://jsfiddle.net/beraliv/4yd7bg2r/15/), it works perfect:

```css title=Gecko CSS property for thin scrollbar
.container {
  scrollbar-width: thin;
}
```

**Mac**. On the **left** — original size. On the **right** — **thin**. Now you see the difference:

![Mac, original size.](/scrollbar-customisation/mac-ff-before-changes.png)
![Mac, thin](/scrollbar-customisation/mac-ff-after-changes.png)

Same for **Windows**:

![Windows, original size.](/scrollbar-customisation/win-ff-before-changes.png)
![Windows, thin](/scrollbar-customisation/win-ff-after-changes.png)

More information you can find on MDN: [scrollbar-width](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width) and [scrollbar-color](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color).

### ❌ Trident-related

If you are not familiar with it, probably forget about it. It’s IE11. Such a pain everywhere. Maybe not supporting it at all?

However, even it has CSS properties which might help:

![Trident, only colour customisation](/scrollbar-customisation/trident-colour-customisation.png)

Only colours 🔴🍏📘 ughhh…

If you still need to customise colours, you can check [the generator](http://www.spectrum-research.com/V2/projects_scrollbar_generator.asp):

![Trident, generator](/scrollbar-customisation/trident-scrolbar-generator.png)

And also [autohiding scrollbar](https://css-tricks.com/snippets/css/hide-scrollbar-in-edge-ie-1011/) property!!! Thanks 🙏⚡

Another one is EdgeHTML which is a fork of Trident and used in old Edge. It had only [enhancement](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/9081910-add-support-for-scrollbar-styling) (which is currently unavailable) in its backlog with medium priority to add support for scrollbar styling. But since Edgium release you can use Webkit / Blink pseudo elements 🎉.

## CSS Hacks and tricks

Slowly but surely we achieve what we want.

### Scrollbar on the left

`transform`: https://jsfiddle.net/4yd7bg2r/5/ with [great support](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#browser_compatibility)

`direction`: https://jsfiddle.net/4yd7bg2r/6/ with [great support](https://developer.mozilla.org/en-US/docs/Web/CSS/direction#browser_compatibility)

### Hiding scrollbar

`overflow`, `margin` and `padding`

- horizontal: https://jsfiddle.net/4yd7bg2r/8/
- vertical: https://jsfiddle.net/4yd7bg2r/7/

## Turn scrollbar on with JS

Accepting the fact FF, Edge and IE do not support scrollbar customisation, JS library might be not bad solution for them.

### Library-independent

Unfortunately some of libraries are plugins for jQuery: [jScrollPane](https://www.npmjs.com/package/jscrollpane), [nanoScroller](https://www.npmjs.com/package/nanoscroller). And this is not what can be a fit.

### Bundle size

A size of scrollbar JS bundle should be worth it. However it’s not what it’s expected.

| lib                                                                                  | minified (KB) | minified + gzipped (KB) |
| :----------------------------------------------------------------------------------- | ------------: | ----------------------: |
| 🕳️ size of black hole                                                                |             ∞ |                       ∞ |
| [nanoscroller@0.8.7](https://bundlephobia.com/result?p=nanoscroller@0.8.7)           |          94.2 |                    32.4 |
| [simplebar@5.3.0](https://bundlephobia.com/result?p=simplebar@5.3.0)                 |          63.5 |                      19 |
| [iscroll@5.2.0](https://bundlephobia.com/result?p=iscroll@5.2.0)                     |          32.1 |                     8.3 |
| [perfect-scrollbar@1.5.0](https://bundlephobia.com/result?p=perfect-scrollbar@1.5.0) |          18.2 |                     5.3 |
| 🤘 light enough                                                                      |               |                         |
| [slim-scroll@1.3.18](https://bundlephobia.com/result?p=slim-scroll@1.3.18)           |           4.2 |                     1.8 |
| 🔥 too good to be true                                                               |               |                         |
| [simple-scrollbar@0.4.0](https://bundlephobia.com/result?p=simple-scrollbar@0.4.0)   |           2.3 |                     0.9 |

[Bundlephobia](https://bundlephobia.com/) helps evaluating sizes of bundles.

Of course, good options are lightweight vanilla libraries.

### Mobile support

Some of choices like [simple-scrollbar](https://www.npmjs.com/package/simple-scrollbar) provide scrollbars unfriendly for mobile devices. It is required to add a lot of functionality and therefore not production-ready.

### Platform-oriented

[slim-scroll](https://github.com/kamlekar/slim-scroll) is created by a stack overflow user and is aimed to improve design on Windows. That’s good as macOS scrollbar looks good everywhere. However, native customisation is only available on WebKit and Blink.

## Your implementation

Probably you want to customise you own scrollbar. First have a look at [scrollbar mechanics](http://csdgn.org/article/scrollbar).

## Links

1. ⭐⭐️ Google Developers: [CSS Deep-Dive: matrix3d() For a Frame-Perfect Custom Scrollbar](https://developers.google.com/web/updates/2017/03/custom-scrollbar)
2. ⭐⭐️️ CSDGN: [Scrollbar Mechanics](http://csdgn.org/article/scrollbar)
3. ⭐️ CSS Tricks: [Custom Scrollbars in WebKit](https://css-tricks.com/custom-scrollbars-in-webkit/)
4. 📄 MDN: [CSS scrollbars](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars)
5. 📄 W3School: [How To Create Custom Scrollbars](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp)
6. 📄 Stack Overflow: [Hide scroll bar, but while still being able to scroll](https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll)
7. 📄 Stack Overflow: [Custom CSS Scrollbar for Firefox](https://stackoverflow.com/questions/6165472/custom-css-scrollbar-for-firefox)
8. 📄 Stack Overflow: [CSS customized scroll bar in div](https://stackoverflow.com/questions/9251354/css-customized-scroll-bar-in-div)

## Conclusion

My last choice: to try [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar) or [simplebar](https://github.com/Grsmto/simplebar).

Have a productive week 💪
