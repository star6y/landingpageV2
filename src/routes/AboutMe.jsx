import React from 'react';
import { Helmet } from 'react-helmet';
import '../static/css/content.css';

const AboutMe = () => {
  return (
    <div class="block m-6 more-margin" >
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="This page talks about me." />
      </Helmet>
      <div class="block mb-6">
        <h1 class="is-size-1">
          About Me
        </h1>
      </div>
      <div class="container ">
        <div class="box has-text-left is-size-5 mb-6">
          <p class="mb-5">
            My current focus is to gain more experience in software engineering. Utilizing both the Waterfall
            and Agile methodologies in school and personal projects with friends has deepened my appreciation
            for the software engineering process. I have come to appreciate the effort required in the project
            specification and design phase. These experiences have given me a better understanding of software
            mechanics, and it has helped me produce cleaner and more readable code. Despite this progress, there
            is still much to learn. I am eager to acquire more hands-on experience by collaborating on larger-scale
            projects with a team.
          </p>
          <p class="mb-5">
            Recently, I enrolled in an Internet programming class that taught me how to construct a website from
            scratch. The course was so engaging that I decided to become a teaching assistant to help students
            discover their passion for full stack development. My interest primarily lies in backend development,
            where I enjoy designing and building servers and databases.
          </p>

          Feel free to look through my projects or to connect with me.
          <ul>
            <li>Connect with me on <a href="https://www.linkedin.com/in/andrei-anicescu-309190152/">LinkedIn</a></li>
            <li>Check out my <a href="https://github.com/star6y">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutMe