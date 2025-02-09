import { env } from '@/env';

export const getServerSideURL = () => {
  let url = env.NEXT_PUBLIC_URL;

  if (!url) {
    url = 'http://localhost:3000';
  }

  return url;
};

export const getClientSideURL = () => {
  if (!!(typeof window !== 'undefined' && window.document && window.document.createElement)) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ''}`;
  }

  return env.NEXT_PUBLIC_URL || '';
};
