import { PUBLIC_BACKEND_URL as BACKEND_URL } from '$env/static/public';
import { writable, get } from 'svelte/store';
import axios from 'axios';
import nookies from 'nookies';
import jwtDecode from 'jwt-decode';
import { goto } from '$app/navigation';

const getCookie = (name: string) => {
    let cookie = '';
    if (nookies.get) {
        cookie = nookies.get(null)[name] || '';
    }
    return cookie;
}

export interface Contract {
    id: number;
    name: string;
    min_money: number;
    max_money: number;
    term: number
    percent_for_day: number;
}

interface User {
    isAuthenticated: boolean;
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
    isUserLoaded: boolean;
}

interface BalanceOperation {
    cash_amount: number;
    current_balance: number;
    operation_date: string;
    operation_type: number;
    previous_balance: number;
    reason: string;
    status: number;
}
const initialUser: User = {
    isAuthenticated: false,
    accessToken: getCookie('access_token'),
    refreshToken: getCookie('refresh_token'),
    isLoading: false,
    user: null,
    wallets: '',
    operations: [],
    next_cashflow: '',
    isUserLoaded: false,
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
            nookies.destroy(null, 'access_token');
            nookies.destroy(null, 'refresh_token');
            set(initialUser);
            await goto('/auth/login')
            location.reload();
        },
        refreshToken: async () => {
            const { refreshToken, accessToken } = get(user);
            try {
                if (refreshToken && !isValidToken(accessToken)) {
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
                }
            } catch (e) {
                user.logout();
         
                console.log(e)
            }
        },
        getAccessToken: async () => {
            await user.refreshToken();
            const { accessToken } = get(user);
            return accessToken;
        },

        getUser: async () => {
            try {
                update(user => ({
                    ...user,
                }));
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
                console.log(e)
                user.logout();
            } finally {
                update(user => ({
                    ...user,
                    isUserLoaded: true,
                }));
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