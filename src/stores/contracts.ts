import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';
import axios from 'axios';
import { user } from 'stores/user';

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

export interface CommonContractItem {
  contract_creator: string
  amount: string | number
  contract_name: string,
  created_at: string,
  end_date: string,
  dividends: number
  is_active: boolean
  contract_id: string | number
}

export interface CommonContracts {
  created_contracts: CommonContractItem[],
  invited_accepted_contracts: CommonContractItem[],
  invited_rejected_contracts: CommonContractItem[],
  new_invitations: CommonContractItem[]
}

const initialContracts: Array<Contract> = [];
const initialCommonContracts: CommonContracts = {
  created_contracts: [],
  invited_accepted_contracts: [],
  invited_rejected_contracts: [],
  new_invitations: []
};


function createContractsStore() {
  const { subscribe, update } = writable(initialContracts);
  const commonContracts = writable(initialCommonContracts);

  return {
    subscribe,
    commonContracts: {
      subscribe: commonContracts.subscribe,
    },
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
        console.log('error happened', e);
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
        update(() => response.data);
      } catch (e) {
        console.log('error happened', e);
      }
    },
    getCommonContracts: async () => {
      try {
        const accessToken = await user.getAccessToken();
        const response = await axios.get(`${BACKEND_URL}/api/v1/contracts/common_contracts/user_contracts/`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': window.location.origin,
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        commonContracts.update(() => response.data);
      } catch (e) {
        console.log('error happened', e);
      }
    },
  };
}

export const contracts = createContractsStore();