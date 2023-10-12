---
title: Tennis Tournaments PoC
date: "2023-07-25"
description: How did I start tennis tournaments
labels: []
keywords:
  - poc
  - tennis
image: /with-or-without-enums/image.png
---

## Prerequisite

In 2022 I moved to UK for work, the same year I’ve started playing tennis and only this year (i.e. 2023) I became interested in watching tennis matches.

In April, 2023, there were 2 tournaments that I’ve started watching first: [WTA Charleston Open](https://www.wtatennis.com/tournament/804/charleston) and [ATP Monte Carlo Masters](https://www.atptour.com/en/tournaments/monte-carlo/410/overview).

At this point, I just looked at the scores for players I followed.

In May, 2023, [Roland Garros](https://www.rolandgarros.com/en-us/results/SM?year=2023&round=7) started. As a Grand Slam tournament, it has a separate website.

By that time I’ve figured out 2 things that were important to me when I looked at the score:

1. I remember data better when it’s well structured visually, therefore draws as a tree view was perfect for me.
1. I was looking for great games, I didn’t focus on just one tennis player, therefore looking at current round in draws helped a lot.

Because of that, I’ve started using draws:

1. I really liked how they are displayed on different types of devices depending on the screen width (it shows 1 up to 3 rounds at the same time)

![Roland Garros, Desktop version](/tennis-tournaments-poc/roland-garros-desktop.png)
![Roland Garros, Tablet version](/tennis-tournaments-poc/roland-garros-tablet.png)
![Roland Garros, Mobile version](/tennis-tournaments-poc/roland-garros-mobile.png)

2. The list of rounds looks clear for me: when the tournament is live, initially selected round is current; when it’s finished, initially selected round is final. You can also change the current round if needed.

![Roland Garros, List of rounds](/tennis-tournaments-poc/roland-garros-list-of-rounds.png)

The match card had all required information for me: tennis player names, seeds, photos, countries, set scores (different colour for set winner) and match winner (tick icon).

![Roland Garros, Match card](/tennis-tournaments-poc/roland-garros-match-card.png)

## What

PoC includes the followings parts:

- Tournament cards
- Rounds navigation
- Tournament draws as a tree view (e.g. tournament round)
- Match cards including names, seeds, countries, images, scores and a winner (sets and match)

The rules I follow to improve visualisation:

- Font is visible on all types of devices, e.g. mobile, tablet and desktop
- Desktop uses click events and mobile/tablet uses touch events to interact with UI
- Images and icons make UI cleaner and easier for understanding

## Why

The main focus of PoC was to structure data in a clear way.

I’ve tried to improve current solutions and use best approach in current project.

Comparing with all competitors, **current achievements** and some **room for improvement** are:

| #                                                     | X                                                          | ATP                       | WTA            | AO                                | RG                                | W             | UO                          |
| ----------------------------------------------------- | ---------------------------------------------------------- | ------------------------- | -------------- | --------------------------------- | --------------------------------- | ------------- | --------------------------- |
| requests for a single tournament draw                 | 1                                                          | 1                         | 1              | 1                                 | Number of rounds                  | 1             | 1                           |
| Correct order of matches within draws                 | Y                                                          | Y                         | Y              | Y                                 | Y                                 | Y             | Y                           |
| Tennis player photo                                   | Y                                                          | N                         | N              | N                                 | Y                                 | N             | N                           |
| Number of visible rounds (mobile, tablet and desktop) | 1, 2, 3                                                    | Max number of rounds      | 1, 2, 3        | 1, 2, 3                           | 1, 2, 3                           | 1, 1-2*, 1-3* | 1, 1-2*, 1-3*               |
| Different themes depending on the court type          | Y                                                          | Y, but brand colours only | N              | N/A\*\*                           | N/A\*\*                           | N/A\*\*       | N/A\*\*                     |
| Bold font for winners                                 | Y, tennis player names and scores                          | N                         | Y, scores only | Y, tennis player names and scores | Y, tennis player names and scores | N             | Y, tennis player names only |
| Scores                                                | Y, by sets, but by games after interacting with match card | Y, by games               | Y, by games    | Y, by games                       | Y, by games                       | Y, by games   | Y, by games                 |
| Country flags                                         | N                                                          | Y                         | Y              | Y                                 | Y                                 | Y             | Y                           |
| Horizontal scroll for rounds navigation               | N                                                          | Y                         | Y              | Y                                 | N                                 | N             | N                           |
| Highlighted tennis player path                        | Y                                                          | N                         | Y              | N                                 | N                                 | Y             | Y                           |
| Total score                                           | 7.5                                                        | 6                         | 7              | 7.5                               | 7                                 | 6             | 6.5                         |

\* US Open and Wimbledon shows similarly but for semifinals only show 2 rounds and for final shows only 1 while both of them could do 3.

\*\* N/A – not applicable, because Grand Slam tournaments have only one court type

## How

Architecture contains only a frontend part which uses:

- **Solid.JS** to render HTML elements
- **CSS modules** for styles
- **Vite** as building/serving tool
- **TypeScript** as a strongly typed programming language that builds on JavaScript
- **GitHub Actions** for CI checks
- **Vercel** for CD and domain configuration
- **Cloudinary CDN** for hosting images

## Changelog

1. My first PR focused on match cards – https://github.com/Beraliv/beraliv.dev/pull/551

![Match card v1](/tennis-tournaments-poc/project-match-card-view-v1.png)

2. Then I moved player images to Cloudinary CDN – https://github.com/Beraliv/beraliv.dev/pull/552 but it contained few tennis players

3. Because match cards had duplicated logic, I’ve refactored it and split each player information into player match result – https://github.com/Beraliv/beraliv.dev/pull/555. It still looked exactly the same but looked better in the codebase.

4. The next important step was too display match cards in a tree view – https://github.com/Beraliv/beraliv.dev/pull/557

![Draws v1](/tennis-tournaments-poc/project-draws-v1.png)

5. Previously all the data was mocked so I finally set up RapidAPI for tennis and requested real-time data – https://github.com/Beraliv/beraliv.dev/pull/558. I needed to do 5 requests on a single page (seasons for a tournament, rounds for a season, 3 requests for visible rounds), therefore I’ve added rate limit for a single user (though it’s not enough). I’ve also fixed rounds visibility for mobile devices and tablets, excluded qualification rounds (because the structure was different for them), fixed compound names (e.g. de Minaur), etc

![Draws v2, added list of rounds](/tennis-tournaments-poc/project-draws-v2.png)

6. I also forgot to configure Vercel routes so deployed pages didn’t work for some time – https://github.com/Beraliv/beraliv.dev/pull/563

7. Initially I was testing on ATP tournaments, so I needed to extract images for men tennis players. I used ATP top 1000 players, analysed the page where I could extract images. I automatically loaded them to Cloudinary CDN using this Node.JS script with `cheerio` – https://gist.github.com/Beraliv/1e4ed49302866a4c578c7ac9dc09a018. It took several minutes to have 1000 tennis player photos. Given first and last names, I’ve loaded them – https://github.com/Beraliv/beraliv.dev/pull/564

![Draws v3, with tennis player photos](/tennis-tournaments-poc/project-draws-v3.png)

8. At this point I only have URLs with tournament ID but it’s not possible to guess which URL to use to load, e.g. Wimbledon. Previously I’ve checked WTA tournaments and was impressed with how the tournament cards look

![WTA, tournament cards](/tennis-tournaments-poc/wta-tournaments.png)

I used the similar layout, found shots of the balls with the shadow on the court, generated the larger image with Dall-e AI so the ball was centred on it – https://github.com/Beraliv/beraliv.dev/pull/565

![Tournament cards v1](/tennis-tournaments-poc/project-tournaments-v1.png)

This also allowed to change colours depending on court types, e.g. selecting rounds or winner colour – https://github.com/Beraliv/beraliv.dev/pull/572

9. When watching Wimbledon, I’ve also updated the statuses for live and finished matches so visible icons are correct – https://github.com/Beraliv/beraliv.dev/pull/568 and https://github.com/Beraliv/beraliv.dev/pull/570

![Match card v2, when live](/tennis-tournaments-poc/project-match-card-live-v1.png)
![Match card v2, when finished](/tennis-tournaments-poc/project-match-card-finished-v1.png)

10. The next challenge was the order of matches within rounds – https://github.com/Beraliv/beraliv.dev/pull/569, because the winner of previous matches should be displayed to the right in the next round. Compare 2 draws (before and after):

![Draws v3](/tennis-tournaments-poc/project-draws-before-v4.png)
![Draws v4](/tennis-tournaments-poc/project-draws-after-v4.png)

On the left side, Hurkacz won 3-0 but the second round displays other names which is confusing. On the right side, Alcaraz won first round 3-1, so the next round he plays with Berrettini (also a winner of first round 3-0). It simplifies the search of players.

It also reduced the number of requests from 5 (seasons for a tournament, rounds for a season, 3 requests for visible rounds) to 3 (seasons for a tournament, rounds for a season, 1 request for the whole tree), but I had to add behaviour on click to load the full score which to be honest is frustrating.

![Match card v3, when clicking](/tennis-tournaments-poc/project-match-card-on-click-v1.png)

11. As a user I need to switch between pages – https://github.com/Beraliv/beraliv.dev/pull/571. Now there is a button back to tournaments page

![Tournament page with navigation](/tennis-tournaments-poc/project-navigation-v1.png)

12. The last bit was to highlight one tennis player in draws to find out the path in a tournament – https://github.com/Beraliv/beraliv.dev/pull/573. It included some colour adjustments to meet contrast checker and removed shadows of match cards. Now the style is more or less aligned.

![Tournament page with navigation](/tennis-tournaments-poc/project-draws-player-navigation-v1.png)
