import React from 'react'
import '../App.css'
import { useAppStore } from '../store/AppStore';
import { observer } from 'mobx-react';

const FavoritesList = () => {
  const store = useAppStore();

  return (
      <div className="repository-list">
      {store.favorites && store.favorites.length > 0 && (
        store.favorites.map((repo) => (
          <div key={repo.id} className='repository-card'>
            <div>
            <img src={repo.owner.avatar_url} alt={`${repo.owner.login}`} className='repository-img'/>
              <a href={repo.html_url} target="_blank" rel="noreferrer" className='repository-name'>
                {repo.full_name}
              </a>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Forks: {repo.forks_count}</p> 
            </div>
          </div>
        )))}
      </div>
  );
}

export default observer(FavoritesList)
