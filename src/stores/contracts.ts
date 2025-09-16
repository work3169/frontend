import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';
import axios from 'axios';
import { user } from 'stores/user';

export interface Contract {
  id: number;  // уникальный id контракта

  contract: {
    name: string;
    type?: string;
  };

  current_profit: number;                     // текущая прибыль
  days_from_start: number;                    // сколько дней работает контракт
  complete_percent: number;                   // прогресс в %
  deposit_amount: number;                     // сумма депозита
  creation_date: string | Date;               // дата создания

  status: boolean;                            // статус
  current_reinvests_session_profit: number;   // профит по текущей реинвестиции
  total_reinvests_profit: number;             // профит по всем реинвестам
  active_reinvestment: {
    id: number;
    type: number;
    start_date: string;  // ISO строка
    end_day: string;     // ISO строка
    base_amount: number;
    collected_profit: number;
    expected_total_profit: number;
    days_passed: number;
    days_total: number;
  };              // есть ли активная реинвестиция
  finished_reinvestments: number;             // количество завершённых реинвестов
  can_reinvest: boolean;                      // можно ли включить реинвест
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