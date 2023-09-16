import { user } from 'stores/user';
import { browser } from '$app/environment';
/** @type {import('./$types').PageLoad} */
export function load() {
  if (browser) {
    user.getUser();
  }

  return {};
}