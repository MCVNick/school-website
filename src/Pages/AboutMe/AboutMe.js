import React from "react";
import { useNavigate } from "react-router-dom";

import Me from "../../Utils/Assets/AboutMe/Me.webp";

import "./AboutMe.scss";

const AboutMe = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/about/philosophy");
  };

  return (
    <div className="about">
      <div className="about-header">
        <h1>About Me</h1>
      </div>
      <div className="about-main">
        <div className="about-page-content">
          <div className="left-col">
            <img src={Me} alt="Me in a suit." />
            <h1>Favorite Websites and YouTube Videos</h1>
            <p>
              If the video appears unusual, it's likely because it's in 360
              degrees, and your device may not fully support 360-degree video
              playback.
            </p>
            <h2>
              <a href="https://www.youtube.com/channel/UCValB9rrklzk4Hgv9MKjiPA">
                YouTube (MCVNick)
              </a>
            </h2>
            <p>
              I have my own YouTube channel that I use to record on. It's filled
              with great tutorials and lots of fun videos. I've played many
              different video games and find that this is an easy way to bond
              with kids. While some believe that video games are bad, I believe
              that they can provide a fun social activity for friends, peers,
              and family. The video I have displayed is myself creating a
              fantasy landscape I dreamed of while sleeping one night. Also, if
              the video looks funny, it is because it is in 360 degrees, and
              your device may not support 360-degree videos.
            </p>
            <div className="iframe-wrapper">
              <iframe
                src="https://www.youtube.com/embed/ZBnvl7jlXXc"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="My YouTube Video"
              />
            </div>
            <h2>
              {/* <a href="https://thewafulup.com">The Wafulup</a> */}
              The Wafulup
            </h2>
            <p>
              The Wafulup is a creative website concept that my brother and I
              developed some time ago. The idea is simple yet engaging: hidden
              links are placed over a seemingly bland website, each leading to
              fascinating and carefully curated destinations on the web. Every
              link is handpicked by me, ensuring only the most interesting
              content makes the cut. With each refresh of the page, the links
              are randomized, offering a new experience every time. However,
              it's been a while since I last updated the links, so you might
              come across a few 404 pages.
            </p>
          </div>
          <div className="right-container">
            <h2>Introduction</h2>
            <p>
              My name is Nick McQueen, and I am proud to be an educator, though
              it wasn't the path I initially imagined for myself. I began my
              journey in college pursuing computer science, drawn by the promise
              of innovation and a lucrative career. However, along the way, I
              discovered a deep-seated passion for working with children. The
              joy and fulfillment I found in teaching quickly overshadowed my
              interest in computers, leading me to a profound realization: my
              true calling was in education. Shifting my focus was one of the
              best decisions I've ever made, and I haven't looked back since.
            </p>
            <p>
              Beyond the classroom, I spend my summers as a canoe instructor at
              a sports camp, where I guide young campers in exploring the great
              outdoors. This role allows me to blend my love for nature with my
              commitment to fostering growth and resilience in children. Whether
              on the water or in the classroom, I strive to create environments
              where kids feel empowered to discover their strengths, learn new
              skills, and build lasting confidence.
            </p>
            <p>
              My approach to education is rooted in the belief that every child
              has unique potential, and it's my privilege to help unlock it. I
              invite you to learn more about my educational philosophy and how I
              approach teaching by clicking the{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleNavigation}
              >
                "Philosophy"
              </span>{" "}
              hyperlink.
            </p>
            <h2>Education</h2>
            <h3>Westminster College</h3>
            <p>
              I am a proud graduate of Westminster College, where I earned a BA
              in Elementary Education with a minor in TESOL (Teaching English to
              Speakers of Other Languages), all while maintaining a 4.0 GPA. My
              journey through Westminster was made possible by the generous
              support of scholarships and my dedication to academic excellence.
              Throughout my studies, I worked full-time as a substitute teacher,
              allowing me to bring the theories and strategies I learned in my
              courses directly into the classroom. This hands-on experience
              enriched my understanding of education and solidified my
              commitment to teaching.
            </p>
            <h3>DevMountain</h3>
            <p>
              DevMountain was an intensive, fast-paced program where I immersed
              myself in coding from 9 to 5 each day, honing my skills by working
              on various websites. The rigorous training and connections I built
              there ultimately led to an internship at Podium, where I was
              deeply impressed by the company's commitment to its employees. I
              highly recommend Podium to anyone pursuing a career in computer
              science or web development. However, as much as I enjoyed the
              experience, my true passion remained in teaching.
            </p>
            <h3>Utah Valley University</h3>
            <p>
              I began my academic journey at UVU, pursuing a degree in Computer
              Science. To cover the costs of my college books, I worked as a
              babysitter and nanny, which unexpectedly sparked my interest in
              working with children. After earning my Associate's degree in
              General Education, I transitioned from UVU to DevMountain to
              further develop my coding skills. While at UVU, I maintained a
              high GPA, often taking 17-18 credit hours per semester. I am
              grateful that UVU seamlessly transferred all my general education
              credits to Westminster College, allowing me to continue my
              educational journey without interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
