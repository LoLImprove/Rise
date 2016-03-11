import React from 'react';

const Home = ({content = () => null }) => (
  <div>
  	<p>Welcome to Mantraplate</p>
  	{content()}
  </div>
);

export default Home;
