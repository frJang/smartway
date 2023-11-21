export type Repository = {
  id: number;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
  html_url: string;
  content: string;
}
