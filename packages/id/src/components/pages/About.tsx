import { DropCap } from "../DropCap";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { DaznIcon } from "../icons/DaznIcon";
import { JoynIcon } from "../icons/JoynIcon";
import { Image } from "../Image";
import { Link } from "../Link";
import { RedText } from "../RedText";

const MainContent = () => (
  <main>
    <header>
      <div className="head">
        <div className="headText">
          <h1>Hey, I'm Alexey.</h1>
          <h3>Senior Software Engineer, UK Global Talent 🇬🇧</h3>
        </div>
        <div>
          <Image
            name="profile_v2.png"
            alt="The portrait photo of me"
            className="meImage"
            width={250}
            mediaQueries={false}
          />
        </div>
      </div>
      <p>
        Join me on a quick story about my software engineer path, from learning
        Pascal at school to upscaling four businesses in video streaming and
        finance industries in three countries.
      </p>
    </header>

    <br />

    <div className="main">
      <h2 id="my-first-steps-into-programming">
        My first steps into programming
      </h2>
      <p>
        <DropCap>B</DropCap>ack in school, programming was mostly a mystery to
        me. Our informatics classes didn't touch on programming languages. In
        2011, my two classmates, Mikhail and Vsevolod, and I decided to take
        matters into our own hands and learn Pascal. We started from scratch,
        and while I wasn't writing complex programs yet, the experience was both
        challenging and rewarding. This early self-driven learning laid the
        foundation for my journey, since I could relocate to St. Petersburg to
        study Computer Science.
      </p>
      <p>
        During my time in university, I worked on a wide range of impressive
        projects that fueled my enthusiasm for problem-solving. I developed
        various applications, including a tower defense game using Unity and
        Blender, a messenger app in C#, an optimisation system for public
        transport written in Java, and even designed a custom programming
        language with Deterministic Finite Automaton (DFA). These projects
        helped me discover my passion for tackling complex challenges, though I
        still hadn't figured it out on a specific direction.
      </p>

      <h2 id="my-career-direction">My career direction</h2>
      <p>
        <DropCap>S</DropCap>oon after completing my bachelor's degree, I stepped
        into the world of front-end development at EPAM Systems. From day one, I
        was impressed with JavaScript's flexibility and the nearly-instant
        feedback that front-end development offered. That was nothing quite like
        it, and I quickly grew to love the dynamic nature of building web
        applications.
      </p>
      <p>
        After completing my master's degree, I moved to Moscow to join Yandex,
        where I was introduced to the fascinating world of video streaming and
        advertising. My work was focused primarily on web browsers, offering
        just a glimpse into the broader streaming ecosystem. Still, I quickly
        recognised the complexity of the domain, the unique technical challenges
        it presented, and its potential as a long-term career path.
      </p>
      <p>
        Although I shifted my focus to the finance industry in 2025, I continue
        contributing to Open Source in the video streaming space, and sharing
        knowledge I hope will remain valuable to others.
      </p>
      <p>
        Since leaving Yandex, I relocated twice – first to Germany in 2020, and
        then to the UK in 2022. These moves exposed me to different cultures,
        making me adaptable and effective in global teams with diverse
        backgrounds. I've become comfortable working in various setups, whether
        remote, hybrid or in the office. The experience of hybrid environments
        also sparked fresh ideas, leading to many innovative solutions along the
        way.
      </p>
      <p>
        In 2025, I was awarded the UK Global Talent visa under the Exceptional
        Talent route, a recognition of my contributions and a reflection of my
        long-term commitment to the UK's tech industry.{" "}
        <Link
          href="https://blog.beraliv.dev/2025-04-23-how-i-earned-uk-global-talent-visa"
          text="How I earned the UK Global Talent visa"
          external
        />
      </p>

      <h2 id="personal-insights">Personal insights</h2>
      <p>
        <DropCap>I</DropCap> can't picture my life without my four-legged
        companion, Sheldon, a miniature Schnauzer - undoubtedly my best 'pet
        project' yet. He's a daily reminder that taking a step back from even
        the toughest problems can provide the clarity needed to return with a
        fresh perspective and find the right solution.
      </p>
      <p>
        To stay active, I play doubles tennis weekly, learn German with my
        Bavarian teacher, and practice new piano pieces to entertain my wife. I
        also enjoy gaming, especially strategy games like StarCraft and
        Hearthstone, as well as online adventures like World of WarCraft, where
        I team up with friends for fun dungeon explorations.
      </p>
      <p>
        As an Assertive Architect (
        <Link
          href="https://www.16personalities.com/intj-personality"
          text="INTJ-A"
          external
        />
        ), my personality reflects my natural introversion, vivid imagination
        and open-mindedness. I prioritise objectivity and rational thinking,
        favour structured planning over spontaneity, and remain calm under
        pressure.
      </p>

      <h2 id="professional-work-and-experience">
        Professional work and experience
      </h2>
      <p>
        <DropCap>B</DropCap>etween 2018 and 2025, I've worked in the video
        streaming industry across 3 countries, building cloud-based products and
        designing reliable HTML5 video players for both Web and Connected
        devices. In 2025, I transitioned to the finance industry, where I
        continue to apply my expertise in building robust and scalable web
        applications.
      </p>
      <p>
        I primarily work with TypeScript, JavaScript, Web APIs. Occasionally, I
        also dive into HTML and CSS.
      </p>

      <h2 className="bloomberg" id="bloomberg">
        Bloomberg
      </h2>
      <p>
        <DropCap>C</DropCap>urrently, I work at{" "}
        <Link
          href="https://www.bloomberg.com/company/"
          text="Bloomberg"
          external
        />{" "}
        as a Senior Fullstack Engineer, where I focus on building{" "}
        <Link
          href="https://www.bloomberg.com/professional/products/bloomberg-terminal/collaboration-tools/instant-bloomberg"
          text="Instant
        Bloomberg"
          external
        />
        , a real-time messaging platform that connects professionals in the
        financial industry.
      </p>

      <h2 className="dazn" id="dazn">
        <DaznIcon /> DAZN
      </h2>
      <p>
        <DropCap>B</DropCap>etween 2022 and 2025, I worked at{" "}
        <Link
          href="https://help.dazn.com/hc/en-gb/articles/16173719210909-About-DAZN"
          text="DAZN"
          external
        />{" "}
        as a Senior Software Engineer. I was a part of Player Core team and
        worked on improving user experience of the video players across HTML5
        devices.
      </p>
      <p>
        I began my journey on the Player Core team, working on an in-house
        functional framework, called FABRiC. This tool enables the creation of
        automated tests for video playback across multiple devices, whether
        locally or remotely. Through the experience, I deepened my understanding
        of building reliable cloud-based products.
      </p>
      <p>
        After my first year at DAZN, I transitioned to focusing on Mercury, the
        in-house HTML5 player. I delved deeply into Media Source Extensions
        while onboarding various platforms. One of R&D projects I worked on had
        valuable, which I later shared with my team and the broader industry
        during{" "}
        <Link
          href="https://blog.beraliv.dev/2023-12-21-story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes"
          text="a presentation at London Video Tech"
          external
        />
        , held at the BBC office.
      </p>
      <figure>
        <Image
          name="dazn-crew.jpg"
          alt="The photo of my DAZN crew. From left to right: George, Rich, Patrick, Mike and I"
          className="image"
        />
        <figcaption>
          Mercury's hard work and achievements have been recognised by our CTO
          Sandeep Tiku with the presentation of the "Chief Technology Officer's
          Tech Innovation Award" to the team.
        </figcaption>
      </figure>
      <p>
        In 2024, I led several key projects. One of the most rewarding was the
        R&D initiative focused on reducing latency in live playback. Our team
        faced numerous challenges, including close collaboration with the Google
        Chrome Dev Team to resolve{" "}
        <Link
          href="https://issues.chromium.org/issues/40190553"
          text="a video/audio de-sync issue"
          external
        />
        . Another major effort involved optimising closed captions, where I took
        the lead in designing, planning and implementing a solution that
        significantly reduced the bundle size and improved the overall UX across
        various devices.
      </p>

      <h2 className="joyn" id="joyn">
        <JoynIcon />
      </h2>
      <p>
        <DropCap>B</DropCap>etween 2020 and 2022, I worked at{" "}
        <Link href="https://www.joyn.de/ueber-joyn" text="Joyn" external /> as
        Senior Software Engineer. I played a key role in bridging the gap
        between the Player and Connected Devices teams.
      </p>
      <figure>
        <Image
          name="joyn-crew.jpg"
          alt="The photo of my Joyn crew. From left to right: Jait, Mikhail, Oleks, Alex, I, Fabio, Dimi, Moti and Gabriel"
          className="image"
        />
        <figcaption>
          Workshop with a hike around Eibsee with my ex-colleagues from Joyn
        </figcaption>
      </figure>
      <p>
        I worked on many exciting projects, such as enhancing UX in the player
        on Samsung TVs, improving the trailer player across Connected Devices
        and onboarding PS5. These initiatives taught me a great deal about
        quirks of various devices.
      </p>
      <p>
        I'm proud of driving a knowledge sharing sessions both in and beyond the
        team. At work, I organised daily sessions that significantly improved
        TypeScript expertise in Connected Devices team. These sessions also led
        to enhancements in the codebase, making the code more stable,
        predictable and readable. Outside of work, I shared my TypeScript
        findings on my blog and gave a talk on{" "}
        <Link
          href="https://blog.beraliv.dev/2021-12-10-advanced-types-holyjs-notes"
          text="Advanced types in TypeScript at HolyJS"
          external
        />
      </p>

      <h2 id="yandex">
        <RedText>Y</RedText>andex
      </h2>
      <p>
        <DropCap>B</DropCap>etween 2018 and 2020, I worked at{" "}
        <Link
          href="https://yandex.com/dev/"
          text={
            <span>
              <RedText>Y</RedText>andex Technologies
            </span>
          }
          external
        />{" "}
        as Senior Frontend Developer on the Video and Advertising teams,
        improving video and advertising players used across <RedText>Y</RedText>
        andex services and partner platforms.
      </p>
      <p>
        At <RedText>Y</RedText>andex, I discovered what it truly means to be an
        engineer: I took the responsibility for the entire process, from system
        design to deployment and monitoring, focused on the bigger picture
        rather than just individual product features and prioritised long-term
        quality and maintainability over short-term outcomes. During this time,
        I also learned the fundamentals of building reliable video and
        advertising players on Web. I became familiar with industry libraries
        (such as shaka-player, hls.js and dash.js), gaining a solid
        understanding of video standards (like{" "}
        <Link
          href="https://video-glossary.beraliv.com/?query=DASH"
          text="DASH"
          external
        />{" "}
        and{" "}
        <Link
          href="https://video-glossary.beraliv.com/?query=HLS"
          text="HLS"
          external
        />
        ) as well as advertising specifications (such as VMAP, VAST and VPAID).
      </p>
      <p>
        I was very lucky to work on multiple projects, including enhancing the
        video player with highlights, optimising network performance in video
        and advertising players, reducing ad fatigue for users and redesigning
        the advertising player UI.
      </p>
      <p>
        As a side initiative, I volunteered as a tutor to over 110 students at{" "}
        <Link
          href="https://yandex.ru/yaintern/schools/frontend"
          text={
            <span>
              <RedText>Y</RedText>andex Interface Development School
            </span>
          }
          external
        />{" "}
        from 2018 and 2020. Additionally, my colleague and I designed a problem
        for{" "}
        <Link
          href="https://contest.yandex.ru/"
          text="Frontend Contest"
          external
        />
        , organised by <RedText>Y</RedText>andex in 2019. This experience
        significantly broadened my expertise in participating in such events.
      </p>
      <p>
        Around that time, TypeScript began gaining popularity as a common
        dependency in many web projects. Faced with various challenges in
        TypeScript, I eventually stumbled upon the{" "}
        <Link
          href="https://github.com/type-challenges/type-challenges"
          text="type-challenges"
          external
        />{" "}
        project. I spent a considerable amount of time figuring out how these
        challenges worked, and after several years, I started sharing TypeScript
        insights with my colleagues. I highly recommend exploring type
        challenges yourself!
      </p>

      <br />

      <p>
        Feel free to connect with me on{" "}
        <Link
          href="https://www.linkedin.com/in/beraliv/"
          text="LinkedIn"
          external
        />{" "}
        to explore my work experience further, or check out{" "}
        <Link href="/blog" text="my blog" /> to see what I've been working on.
      </p>
    </div>
  </main>
);

export const About = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);
