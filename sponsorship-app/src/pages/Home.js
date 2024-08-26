
import React from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <main>
        <h2>Home Page</h2>
        <p>Welcome to the dashboard. Navigate to different pages using the links below.</p>
      </main>
    </div>
  );
};

export default Home;
