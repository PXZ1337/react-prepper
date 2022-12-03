import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import MainLayout from './components/Layout/MainLayout';

function App() {
  return (
    <Fragment>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Fragment>
  );
}

export default App;
