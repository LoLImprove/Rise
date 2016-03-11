import React from 'react';

const Layout = ({content = () => null }) => (
  <div>
  	<h1>Mantraplate</h1>
  	{content()}
  </div>
);

export default Layout;
