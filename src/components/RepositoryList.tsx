import React from 'react';
import { observer } from 'mobx-react';
import { Repository } from '../types/Repository';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/AppStore';

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  const store = useAppStore()
  const navigate = useNavigate();

  const handleReadMore = (repo: Repository) => {
    const encodedName = encodeURIComponent(repo.full_name);
    navigate(`/repository/${encodedName}`);
    store.toggleFavorite(repo)
  };
  
  return (
    <div className="repository-list">
      {repositories && repositories.length > 0 ? (
        repositories.map((repo) => (
          <div key={repo.id} className='repository-card'>
            <div>
            <img src={repo.owner.avatar_url} alt={`${repo.owner.login}`} className='repository-img'/>
              <a href={repo.html_url} target="_blank" rel="noreferrer" className='repository-name'>
                {repo.full_name}
              </a>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Forks: {repo.forks_count}</p>
            </div>
            <button onClick={() => handleReadMore(repo)}>Read more...</button>
          </div>
        ))
      ) : (
        <div style={{margin: '10px', padding: '10px'}}>Нет репозиториев</div>
      )}
    </div>
  );
};

export default observer(RepositoryList);
