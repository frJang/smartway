import React, { useRef } from 'react'
import { observer } from 'mobx-react';

import { useAppStore } from '../store/AppStore';

import SearchInput from '../components/SearchInput'
import RepositoryList from '../components/RepositoryList';
import FavoritesList from '../components/FavoritesList';
import { throttle } from 'lodash';

const MainPage = observer(() => {
  const store = useAppStore()
  const abortConRef = useRef(new AbortController())

  const handleSearch = useRef(throttle((query: string) => {
    store.loadRepositories(query, abortConRef);
  }, 2000));
  
  return (
    <div>
      <SearchInput onSearch={handleSearch}/>
      <div className='container'>
        <RepositoryList repositories={store.repositories}/>
        <FavoritesList/>
      </div>
    </div>
  )
})

export default MainPage
