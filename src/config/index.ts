interface Config {
  apiUrl: string;
  environment: string;
  apiVersion: string;
  debug: boolean;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  environment: import.meta.env.MODE,
  apiVersion: 'v1',
  debug: import.meta.env.MODE === 'development',
};

export default config;