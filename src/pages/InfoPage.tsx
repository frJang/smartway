import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { useAppStore } from '../store/AppStore';

const InfoPage: React.FC = () => {
  const store = useAppStore();
  const { repoName } = useParams();

  useEffect(() => {
    if (repoName) {
      store.loadRepositoryDetails(repoName);
    }
  }, [repoName, store]);

  const repository = store.selectedRepository;
  
  if (!repository && repoName) {
    return <div>Загрузка данных...</div>;
  }

  if (!repository) {
    return <div>Репозиторий не найден</div>;
  }

  return (
    <div className="repository-info">
      <h1 className="repository-title">{repoName}</h1>
      <p>
        {repository}
      </p>
    </div>
  );
};


export default observer(InfoPage);

