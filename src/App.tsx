import React from 'react';
import { observer } from 'mobx-react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MainPage from './pages/MainPage';
import InfoPage from './pages/InfoPage';

const App: React.FC = () => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path={`/repository/:repoName`} element={<InfoPage />} />
        </Routes>
    </Router>
  );
};

export default observer(App);

