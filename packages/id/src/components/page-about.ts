import { header } from "./header";
import { footer } from "./footer";
import { link } from "./link";
import { yearsSince } from "../utils/yearsSince";
import { image } from "./image";

const mainContent = `
	<main>
    <header>
      <div class="head">
        <div class="headText">
          <h1>Hey, I'm Alexey.</h1>
          <h3>UK-based, Video Software Engineer</h3>
        </div>
        <div>
          ${image({ name: "me.png", alt: "My photo", className: "meImage" })}
        </div>
      </div>
      <p>
        Join me on a quick story about my software engineer path, from learning Pascal at school to enhancing the user experience in video streaming companies.
      </p>
    </header>

    <br />
    
    <div class="main">
      <h2>My first steps into programming</h2>
      <p>
        Back in school, programming was mostly a mystery to me. Our informatics classes didn't touch on programming languages, but my two classmates, Mikhail and Vsevolod, and I decided to take matters into our own hands and learn Pascal. We started from scratch, and while I wasn't writing complex programs yet, the experience was both challenging and rewarding. This early self-driven learning laid the foundation for my journey, since I could relocate to St. Petersburg to study Computer Science.
      </p>
      <p>
        During my time in university, I worked on a wide range of impressive projects that fueled my enthusiasm for problem-solving. I developed various applications, including a tower defense game using Unity and Blender, a messenger app in C#, an optimisation system for public transport written in Java, and even designed a custom programming language with Deterministic Finite Automaton (DFA). These projects helped me discover my passion for tackling complex challenges, though I still hadn't figured it out on a specific direction.
      </p>

      <h2>My career direction</h2>
      <p>
        Soon after completing my bachelor's degree, I stepped into the world of front-end development at EPAM Systems. From day one, I was impressed with JavaScript's flexibility and the nearly-instant feedback that front-end development offered. That was nothing quite like it, and I quickly grew to love the dynamic nature of building web applications.
      </p>
      <p>
        After completing my master's degree, I relocated to Moscow to begin my journey at Yandex, where I was introduced to the fascinating world of video streaming and advertising. While my work with the video and advertising teams was focused solely on web browsers, which offered just a glimpse of the broader landscape, I quickly recognised the complexity, the range of challenges the industry faces, and the immense potential for growth. It was clear to me that this field had the depth and opportunity to become a long-term career path.
      </p>
      <p>
        After leaving Yandex, I relocated twice - first to Germany in 2020 and then to the UK in 2022. These moves exposed me to different cultures, making me adaptable and effective in global teams with diverse backgrounds. I've become comfortable working in various setups, whether remote, hybrid or in the office. The experience of hybrid environments also sparked fresh ideas, leading to many innovative solutions along the way.
      </p>

      <h2>Personal insights</h2>
      <p>
        I can't picture my life without my four-legged companion, Sheldon, a miniature Schnauzer - undoubtedly my best 'pet project' yet. He's a daily reminder that taking a step back from even the toughest problems can provide the clarity needed to return with a fresh perspective and find the right solution.
      </p>
      <p>
        To stay active, I play doubles tennis weekly, learn German with my Bavarian teacher, and practice new piano pieces to entertain my wife. I also enjoy gaming, especially strategy games like StarCraft and Hearthstone, as well as online adventures like World of WarCraft, where I team up with friends for fun dungeon explorations.
      </p>
      <p>
        As an Assertive Architect (${link({
          href: "https://www.16personalities.com/intj-personality",
          text: "INTJ-A",
          external: true,
        })}), my personality reflects my natural introversion, vivid imagination and open-mindedness. I prioritise objectivity and rational thinking, favour structured planning over spontaneity, and remain calm under pressure.
      </p>

      <h2>Professional work and experience</h2>
      <p>
        I've spent over ${yearsSince({
          year: 2018,
          month: 7,
          day: 28,
        })} years in the video streaming industry across 3 countries, building cloud-based products and designing reliable HTML5 video players for both Web and Connected devices.
      </p>
      <p>
        I primarily work with TypeScript, JavaScript, Web APIs (such as Media Source Extensions, or MSE, and Encrypted Media Extensions, or EME). Occasionally, I also dive into HTML and CSS.
      </p>

      <h2>DAZN</h2>
      <p>
        Currently, I work at ${link({
          href: "https://help.dazn.com/hc/en-gb/articles/16173719210909-About-DAZN",
          text: "DAZN",
          external: true,
        })} as a Senior Software Engineer.
      </p>
      <p>
        I began my journey on the Player Core team, working on an in-house functional framework, called FABRiC. This tool enables the creation of automated tests for video playback across multiple devices, whether locally or remotely. Through the experience, I deepened my understanding of building reliable cloud-based products.
      </p>
      <p>
        After my first year at DAZN, I transitioned to focusing on Mercury, the in-house HTML5 player. I delved deeply into MSE while onboarding various platforms. One of R&D projects I worked on had valuable, which I later shared with my team and the broader industry during ${link(
          {
            href: "https://blog.beraliv.dev/2023-12-21-story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes",
            text: "a presentation at London Video Tech",
            external: true,
          }
        )}, held at the BBC office.
      </p>
      <figure>
        ${image({
          name: "dazn-crew.jpg",
          alt: "My DAZN crew image",
          className: "image",
        })}
        <figcaption>
          Mercury's hard work and achievements have been recognised by our CTO Sandeep Tiku with the presentation of the "Chief Technology Officer's Tech Innovation Award" to the team.
        </figcaption>
      </figure>
      <p>
        In 2024, I led several key projects. One of the most rewarding was the R&D initiative focused on reducing latency in live playback. Our team faced numerous challenges, including close collaboration with the Google Chrome Dev Team to resolve ${link(
          {
            href: "https://issues.chromium.org/issues/40190553",
            text: "a video/audio de-sync issue",
            external: true,
          }
        )}. Another major effort involved optimising closed captions, where I took the lead in designing, planning and implementing a solution that significantly reduced the bundle size and improved the overall UX across various devices.
      </p>

      <h2>Joyn</h2>
      <p>
        Previously, I worked at ${link({
          href: "https://www.joyn.de/ueber-joyn",
          text: "Joyn",
          external: true,
        })} as Senior Software Engineer. I played a key role in bridging the gap between the Player and Connected Devices teams.
      </p>
      <figure>
        ${image({
          name: "joyn-crew.jpg",
          alt: "My Joyn crew image",
          className: "image",
        })}
        <figcaption>
          Workshop with a hike around Eibsee with my ex-colleagues from Joyn
        </figcaption>
      </figure>
      <p>
        I worked on many exciting projects, such as enhancing UX in the player on Samsung TVs, improving the trailer player across Connected Devices and onboarding PS5. These initiatives taught me a great deal about quirks of various devices.
      </p>
      <p>
        I'm proud of driving a knowledge sharing sessions both in and beyond the team. At work, I organised daily sessions that significantly improved TypeScript expertise in Connected Devices team. These sessions also led to enhancements in the codebase, making the code more stable, predictable and readable. Outside of work, I shared my TypeScript findings on my blog and gave a talk on ${link(
          {
            href: "https://blog.beraliv.dev/2021-12-10-advanced-types-holyjs-notes",
            text: "Advanced types in TypeScript at HolyJS",
            external: true,
          }
        )}
      </p>

      <h2>Yandex</h2>
      <p>
        Between 2018 and 2020, I worked at ${link({
          href: "https://yandex.com/dev/",
          text: "Yandex Technologies",
          external: true,
        })} as Senior Frontend Developer.
      </p>
      <p>
        At Yandex, I discovered what it truly means to be an engineer: I took the responsibility for the entire process, from system design to deployment and monitoring, focussed on the bigger picture rather than just individual product features and prioritised long-term quality and maintainability over short-term outcomes. During this time, I also learned the fundamentals of building reliable video and advertising players on Web. I became familiar with industry libraries (such as shaka-player, hls.js and dash.js), gaining a solid understanding of video standards (like DASH and HLS) as well as advertising specifications (such as VMAP, VAST and VPAID).
      </p>
      <p>
        I was very lucky to work on multiple projects, including enhancing the video player with highlights, optimising network performance in video and advertising players, reducing ad fatigue for users and redesigning the advertising player UI. 
      </p>
      <p>
        As a side initiative, I volunteered as a tutor to over 110 students at ${link(
          {
            href: "https://yandex.ru/yaintern/schools/frontend",
            text: "Yandex Interface Development School",
            external: true,
          }
        )} from 2018 and 2020. Additionally, my colleague and I designed a problem for ${link(
  {
    href: "https://contest.yandex.ru/",
    text: "Frontend Contest",
    external: true,
  }
)}, organised by Yandex in 2019. This experience significantly broadened my expertise in participating in such events.
      </p>
      <p>
        Around that time, TypeScript began gaining popularity as a common dependency in many web projects. Faced with various challenges in TypeScript, I eventually stumbled upon the ${link(
          {
            href: "https://github.com/type-challenges/type-challenges",
            text: "type-challenges",
            external: true,
          }
        )} project. I spent a considerable amount of time figuring out how these challenges worked, and after several years, I started sharing TypeScript insights with my colleagues. I highly recommend exploring type challenges yourself!
      </p>
    </div>

    <br />

    <p>
      Feel free to connect with me on ${link({
        href: "https://www.linkedin.com/in/beraliv/",
        text: "LinkedIn",
        external: true,
      })} to explore my work experience further, or check out ${link({
  href: "https://blog.beraliv.dev/",
  text: "my blog",
  external: true,
})} to see what I've been working on.
    </p>
  </main>
`;

export const aboutPage = `
	<div class="layout">
		${header}
		${mainContent}
		${footer}
	</div>
`;
