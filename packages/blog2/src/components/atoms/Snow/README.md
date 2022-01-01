## Snow

Snow component ⚛️ styles 💅 are extracted from https://codepen.io/alvaromontoro/pen/GRNmdzB

I adapted them and used in the header

To be able to adapt it again, please use the algorithm below:

1. Get the script which is used now:

```scss
.snowflake {
  --size: 1vw;
  width: var(--size);
  height: var(--size);
  background: var(--snowflake-color);
  border-radius: 50%;
  position: absolute;
  top: -5px;
  pointer-events: none;
  z-index: 2;
}

@keyframes snowfall {
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }
  100% {
    transform: translate3d(var(--left-end), 90px, 0);
  }
}

@for $i from 1 through 50 {
  .snowflake:nth-child(#{$i}) {
    --size: #{random(50) * 0.01}rem;
    --left-ini: #{(random(20) - 10) * 1%};
    --left-end: #{(random(20) - 10) * 1%};
    left: #{random(100) * 1%};
    animation: snowfall #{5 + random(10)}s linear infinite;
    animation-delay: -#{random(10)}s;
  }
}

.snowflake:nth-child(6n) {
  filter: blur(1px);
}
```

2. Open https://jsonformatter.org/scss-to-css

3. Open `packages/blog2/src/components/atoms/Snow/index.module.css` and change styles for `.snowflake`
