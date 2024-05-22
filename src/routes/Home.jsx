import React from 'react';
import { Helmet } from 'react-helmet';
import '../static/css/content.css';


const Home = () => {
  return (
    <div class="block m-6 more-margin" >
      <Helmet>
        <title>Andrei Anicescu</title>
        <meta name="description" content="Home page of my portfolio." />
      </Helmet>
      <div class="block mb-6">
        <h1 class="is-size-1">
          Welcome
        </h1>
      </div>
      <div class="container ">
        <div class="box has-text-left is-size-5 mb-6">
          <p class="mb-5">
            Working on adding something nice here...
            <br />
            Last updated on 5/21/24
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home