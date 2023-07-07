import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';
import axios from 'axios';
import { user } from 'stores/user'

export interface Contract {
  contract: {
    name: string,
  },
  current_profit: number,
  days_from_start: number,
  complete_percent: number,
  deposit_amount: number,
  creation_date: string | Date,
}

const initialContracts: Array<Contract> = [];

function createContractsStore() {
  const { subscribe, update } = writable(initialContracts);
  return {
    subscribe,
    getContracts: async () => {
      try {
        const accessToken = await user.getAccessToken();
        const response = await axios.get(`${BACKEND_URL}/user/contracts/`, {
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
    getPublicContracts: async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/contracts/`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': window.location.origin,
          },
        });
        console.log(response.data)
        update(() => response.data);
      } catch (e) {
        console.log('error happened', e)
      }
    },
  }
}

export const contracts = createContractsStore();