import { makeObservable, observable, action } from 'mobx';
import { Repository } from '../types/Repository';

class AppStore {
  repositories: Repository[] = [];
  favorites: Repository[] = [];
  selectedRepository: string | null = null;

  constructor() {
    makeObservable(this, {
      repositories: observable,
      favorites: observable,
      selectedRepository: observable,
      setRepositories: action,
      setFavorites: action,
      setSelectedRepository: action,
      loadRepositories: action,
    });
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
  }

  setFavorites(favorites: Repository[]) {
    this.favorites = favorites;
  }

  setSelectedRepository(repository: string | null) {
    this.selectedRepository = repository;
  }


  async loadRepositories(query: string, abortConRef: React.MutableRefObject<AbortController>) {
    try {
      const token = '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';
      if(abortConRef.current){
        abortConRef.current.abort()
      }
      abortConRef.current = new AbortController()
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
        headers: {
          Authorization: `${token}`,
        },
        signal: abortConRef.current.signal
      });

      const data = await response.json();
      this.setRepositories(data.items);
    } catch (error) {
      console.error('Error loading repositories', error);
    }
  }

  async loadRepositoryDetails(repoName: string) {
    try {
      const token = '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';
      const response = await fetch(`https://api.github.com/repos/${repoName}/readme`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const readmeBase64 = data.content;
        const readmeText = atob(readmeBase64);
        
        this.setSelectedRepository(readmeText);
      } else {
        console.error(`Failed to fetch repository details: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error loading repository details', error);
    }
  }

  toggleFavorite(repository: Repository) {
      this.setFavorites([...this.favorites, repository]);
  }
}

export const appStore = new AppStore();

export const useAppStore = () => appStore;
