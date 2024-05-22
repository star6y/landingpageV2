import React from 'react';
import '../static/css/projects.css';
import novelNotes from '../static/images/novelNotes.png';
import sim from '../static/images/sim.png';
import momento from '../static/images/momento.png';
import todo from '../static/images/todo.png';
import votingSystem from '../static/images/votingSystem.png';

const Projects = () => {
  return (
    <div class="block m-6 more-margin">
      <div class="block m-6">
        <h1 class="is-size-1">
          Projects
        </h1>
      </div>
      <div class="container">


        <div class="box has-text-left is-size-5  mb-6 project">
          <div className="project-link">
            <a href="https://gray-forest-019e4ac0f.5.azurestaticapps.net/" target="_blank" rel="noopener noreferrer">
              <img src={momento} alt="" class="project-image " />
            </a>
          </div>

          <div class="project-info">
            <div class="title-date">
              <h2>Momento</h2>
              <span class="project-date mb-5"> May 2024</span>
            </div>
            <p class="mb-5">
              Momento is a journaling web app that allows users to record their mood, write reflections,
              or record audio reflections. After completing the daily questionnaire, users receive an
              AI-generated summary of their scores, along with tips to improve their physical and mental
              health. The insights page displays a graph of monthly scores, helping users track stress
              and mood progress. The calendar page provides a glance at daily moods, with detailed
              summaries and options to revisit journal entries or overall mood summaries.
            </p>
            <p >
              For this project, we used React for the front end and a serverless architecture for the
              back end, deploying it to Microsoft Azure. I led the development of the journal page,
              designing both the front-end and back-end API connecting to our database. To handle
              audio recordings, I integrated Azure's Blob Storage for secure file management and
              scalable app performance.
            </p>
          </div>
        </div>


        <div class="box has-text-left is-size-5  mb-6 project">
          <div className="project-link">
            <a href="https://github.com/star6y/VotingSystem/tree/main" target="_blank" rel="noopener noreferrer">
              <img src={votingSystem} alt="" class="project-image " />
            </a>
          </div>

          <div class="project-info">
            <div class="title-date">
              <h2>Election Voting Software</h2>
              <span class="project-date mb-5"> Apr 2024</span>
            </div>
            <p class="mb-5">
              Worked alongside a team to design and develop an election voting system software.
              The software reads files sent from different voting centers, tallies and counts
              the votes, assigns seats to either the party or candidate, and handles any ties that occur.
            </p>
            <p class="mb-5">
              This project was written in C++, utilizing software development lifecycle (SDLC)
              methodologies. I collaborated closely with the team to draft and refine the Software
              Requirements Specification (SRS) and the Software Design Document (SDD).
            </p>
            <p class="mb-5">
              I managed the design of the software's architecture, structure, and class hierarchy
              using a UML class diagram. Significant thought and effort went into this design
              phase to ensure our project would be easily extendable, accommodating new election
              types and other customer requirements. This careful design process proved extremely
              valuable when we later extended the project, requiring minimal refactoring and allowing
              for extensive code reuse with only minor adjustments.
            </p>
            <p class="mb-5">
              Transitioning to an Agile workflow increased our team's development speed by 20%.
            </p>
          </div>
        </div>



        <div class="box has-text-left is-size-5  mb-6 project">
          <div className="project-link">
            <a href="https://white-forest-086ea6910.5.azurestaticapps.net/todos" target="_blank" rel="noopener noreferrer">
              <img src={todo} alt="" class="project-image " />
            </a>
          </div>

          <div class="project-info">
            <div class="title-date">
              <h2>To-Do app</h2>
              <span class="project-date mb-5"> Mar 2024</span>
            </div>
            <p class="mb-5">
              The To-Do app helps you keep track of your tasks, allowing you to categorize 
              tasks or create new categories to stay organized. Its simple and fun interface 
              makes it easy to get accustomed to the app quickly.
            </p>
            <p class="mb-5">
              This web app was built using React for the front end. The back end utilizes Microsoft
              Azure's serverless architecture, and the data is stored on Azure using MongoDB.
            </p>
          </div>
        </div>


        <div class="box has-text-left is-size-5  mb-6 project">
          <div className="project-link">
            <a href="https://project-1-ice-water.onrender.com/" target="_blank" rel="noopener noreferrer">
              <img src={novelNotes} alt="" class="project-image " />
            </a>
          </div>

          <div class="project-info">
            <div class="title-date">
              <h2>NovelNotes</h2>
              <span class="project-date mb-5"> Feb 2024</span>
            </div>
            <p class="mb-5">
              NovelNotes allows users to look up any book available on Google, read descriptions,
              and see reviews from others. By creating an account, users can leave reviews, interact
              with others' reviews through comments, and see what books their friends or other users
              have read. Our AI-powered book recommendations are based on users' review history.
            </p>
            <p >
              Our tech stack includes Flask (Python), PostgreSQL, JavaScript, Jinja2, and PureCSS.
              We integrated several APIs to enhance user experience, such as the Google Books API,
              OpenAI (ChatGPT) API, and Gravatar API for user profiles. My work focused on building
              the user profile experience, including backend services, front-end interfaces, and
              database interactions.
            </p>
          </div>
        </div>


        <div class="box has-text-left is-size-5  mb-6 project">
          <a href="https://package-delivery-simulation.onrender.com" class="project-link" target="_blank" rel="noopener noreferrer">
            <img src={sim} alt="" class="project-image" />
          </a>
          <div class="project-info">
            <div class="title-date">
              <h2>Package Delivery Simulation</h2>
              <span class="project-date"> Dec 2023</span>
            </div>
            <p class="mb-5">
              In this project, we developed a package delivery simulation using a simulated map of
              the University of Minnesota - Twin Cities campus. Users can schedule deliveries on
              the <a href="https://package-delivery-simulation.onrender.com/schedule.html" alt="delivery scheduling page">schedule page</a>,
              and we render various predetermined entities on the browser. We implemented different
              path-finding strategies for drone deliveries. During the extension phase, I was
              responsible for implementing the drone's battery management and charging station
              logic, ensuring drones return to the nearest charging station when low on battery.
            </p>
            <div class="content-section">
              <p>How to use the website:</p>
              <ul class="ul-list">
                <li>The website may take up to 50 seconds to load (free hosting issues)</li>
                <li>Use left/right mouse buttons to move and rotate the camera, scroll wheel to zoom</li>
                <li>Select the entity you want to view in the top right corner</li>
                <li>Stop the simulation before exiting or refreshing the page</li>
                <li><b>If the website or battery percentage is glitching, press the "Stop Simulation" button, then refresh the page</b></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Projects