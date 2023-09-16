import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { writable, get } from 'svelte/store';
import axios from 'axios';
import nookies from 'nookies';
import jwtDecode from 'jwt-decode';
import { goto } from '$app/navigation';

export interface Contract {
    id: number;
    name: string;
    min_money: number;
    max_money: number;
    term: number
    percent_for_day: number;
}

interface User {
    accessToken: string;
    refreshToken: string;
    isLoading: boolean;
    user: {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        userprofile: {
            account_balance: number;
            registration_uuid: string;
            showing_contracts: Contract[];
            ref_link: string;
        }
    } | null;
    wallets: any;
    operations: BalanceOperation[];
    next_cashflow: string;
}

interface BalanceOperation {
    amount: number;
    current_balance: number;
    operation_date: string;
    operation_type: number;
    previous_balance: number;
    reason: string;
    status: number;
}
const initialUser: User = {
    accessToken: '',
    refreshToken: '',
    isLoading: false,
    user: null,
    wallets: '',
    operations: [],
    next_cashflow: '',
};

const isValidToken = (token: string) => {
    if (token) {
        const decodedToken = jwtDecode(token) as { name: string, exp: number };
        return decodedToken.exp * 1000 > Date.now();
    }
    return false;
}

function createUserStore() {
    const { subscribe, set, update } = writable(initialUser);
    return {
        subscribe,
        logout: async () => {
            // Remove tokens from cookies
            await goto('/auth/login');
            nookies.destroy(null, 'access_token');
            nookies.destroy(null, 'refresh_token');
            set(initialUser);
        },
        login: async (formSubmit: FormData) => {
            const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/token/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  'Access-Control-Allow-Origin': window.location.origin,
                },
                data: formSubmit,
            })
            nookies.set(null, "access_token", res.data.access, {
                maxAge: 300 * 24 * 60 * 60,
                path: "/",
            })
            nookies.set(null, "refresh_token", res.data.refresh, {
                maxAge: 300 * 24 * 60 * 60,
                path: "/",
            })
            update(user => ({
                ...user,
                accessToken: res.data.access,
                refreshToken: res.data.refresh,
            }));
            goto(`/profile`);
        },    
        refreshToken: async () => {
            let { refreshToken, accessToken } = get(user);
            if (!refreshToken) {
                refreshToken = nookies.get(null).refresh_token;
                if (!refreshToken) {
                    return;
                }
            }
            if (!accessToken) {
                accessToken = nookies.get(null).access_token;
            }
            if (isValidToken(accessToken)) {
                update(user => ({
                    ...user,
                    accessToken,
                    refreshToken,
                }));
                return;
            }
            try {
                const { data } = await axios(`${BACKEND_URL}/api/v1/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': window.location.origin,
                    },
                    data: { refresh: refreshToken },
                });

                if (data.access) {
                    nookies.set(null, 'access_token', data.access, { path: '/' });

                    update(user => ({
                        ...user,
                        accessToken: data.access,
                    }));
                }
            } catch (e) {
                nookies.destroy(null, 'access_token');
                nookies.destroy(null, 'refresh_token');
                set(initialUser);
            }
        },
        getAccessToken: async () => {
            await user.refreshToken();
            const { accessToken } = get(user);
            return accessToken;
        },

        getUser: async () => {
            try {
                const accessToken = await user.getAccessToken();
                const { data } = await axios(`${BACKEND_URL}/api/v1/user/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': window.location.origin,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                update(user => ({
                    ...user,
                    user: data,
                }));
                return get(user);
            } catch (e) {
                console.log(e);
            }
        },
        getContracts: async () => {
            const accessToken = await user.getAccessToken();
            const { data } = await axios(`${BACKEND_URL}/api/v1/user/contracts/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': window.location.origin,
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            update(user => ({
                ...user,
                contracts: data,
            }));
        },
        getCashflow: async () => {
            try {
                update(user => ({
                    ...user,
                    isLoading: true,
                }));
                const accessToken = await user.getAccessToken();
                const { data } = await axios(`${BACKEND_URL}/api/v1/user/cash_flow/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': window.location.origin,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                update(user => ({
                    ...user,
                    operations: data.results,
                    next_cashflow: data.next,
                }));
            } catch (e) {
                console.log(e)
            } finally {
                update(user => ({
                    ...user,
                    isLoading: false,
                }));
            }
        },
        getNextCashflow: async () => {
            try {
                update(user => ({
                    ...user,
                    isLoading: true,
                }));
                const accessToken = await user.getAccessToken();
                const { data } = await axios(get(user).next_cashflow, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': window.location.origin,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                update(user => ({
                    ...user,
                    operations: [...user.operations, ...data.results],
                    next_cashflow: data.next,
                }));
            } catch (e) {
                console.log(e)
            } finally {
                update(user => ({
                    ...user,
                    isLoading: false,
                }));
            }
        },
    }
}

export const user = createUserStore();