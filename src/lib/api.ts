const API_URL = '/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('swan_token');
        if (token) {
            (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

export function setToken(token: string) {
    localStorage.setItem('swan_token', token);
}

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('swan_token');
}

export function removeToken() {
    localStorage.removeItem('swan_token');
}

export function setUser(user: Record<string, unknown>) {
    localStorage.setItem('swan_user', JSON.stringify(user));
}

export function getUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('swan_user');
    return user ? JSON.parse(user) : null;
}

export function removeUser() {
    localStorage.removeItem('swan_user');
}
