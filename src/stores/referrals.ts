import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';
import axios from 'axios';
import { user } from 'stores/user'

export interface Referrals {
  [key: string]: any
}

const initialReferrals: Referrals = [];

function createReferralsStore() {
  const { subscribe, update } = writable(initialReferrals);
  return {
    subscribe,
    getReferrals: async () => {
      try {
        const accessToken = await user.getAccessToken();
        const response = await axios.get(`${BACKEND_URL}/user/referrals/`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': window.location.origin,
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        update(() => response.data);
      } catch (e) {
        console.log('error happened', e)
      }
    },
  }
}

export const referralsStore = createReferralsStore();