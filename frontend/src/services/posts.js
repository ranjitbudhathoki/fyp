import { makeRequest } from './makeRequest';

export function getPosts() {
  return makeRequest('/api/help-posts/');
}

export function getPost(id) {
  return makeRequest(`api/help-posts/${id}`);
}
