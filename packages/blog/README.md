# beraliv.dev

Blog

Constructed with [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)

## GIF usage

If you plan to add `dog.gif` in the project, e.g. in `dog.md` file you have:

```md
![My beautiful dog](./dog.gif)
```

Follow the next steps:

1. Install `ffmpeg`:

```sh
brew install ffmpeg
which ffmpeg
```

2. Convert `dog.gif` to `dog.mp4`:

```sh
ffmpeg -i dog.gif -vf scale=640:-2 -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p -movflags +faststart dog.mp4
ls
```

3. And also convert `dog.gif` to `dog.webm`:

```sh
ffmpeg -i dog.gif -vf scale=640:-2 -c vp9 -b:v 0 -crf 41 dog.webm
ls -lh
```

4. In your `dog.md` file replace line with `dog.gif`:

```md
<video class="gatsby-video" autoplay loop muted playsinline>
  <source src="/dog.webm" type="video/webm">
  <source src="/dog.mp4" type="video/mp4">
</video>
```

Voilà 💫

Articles:

1. [Replace animated GIFs with video for faster page loads](https://web.dev/replace-gifs-with-videos/)
2. [Recommended upload encoding settings](https://support.google.com/youtube/answer/1722171)
