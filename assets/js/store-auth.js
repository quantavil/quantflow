document.addEventListener('alpine:init', () => {
    Alpine.store('auth', {
        API_BASE: '', // Set your API base here if needed
        isLoggedIn: false,
        token: localStorage.getItem('quantflow_token') || null,
        user: null,
        isSyncing: false,
        pendingSync: false,

        init() {
            if (this.token) {
                this.isLoggedIn = true;
                this.fetchUserInfo();
            }
            this.handleAuthCallback();
        },

        loginWithGitHub() {
            window.location.href = `${this.API_BASE}/api/auth/login`;
        },

        handleAuthCallback() {
            const url = new URL(window.location.href);
            let token = url.searchParams.get('token');
            if (!token && window.location.hash.includes('token=')) {
                try {
                    const hashParams = new URLSearchParams(window.location.hash.slice(1));
                    token = hashParams.get('token');
                } catch (e) { }
            }
            if (token) {
                this.token = token;
                localStorage.setItem('quantflow_token', token);
                window.history.replaceState({}, document.title, window.location.pathname);
                this.isLoggedIn = true;
                this.fetchUserInfo();
            }
        },

        async fetchUserInfo() {
            try {
                const res = await fetch(`${this.API_BASE}/api/user`, {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                if (res.ok) {
                    this.user = await res.json();
                } else {
                    this.logout();
                }
            } catch (e) { console.error('[AUTH] Verification failed'); }
        },

        logout() {
            this.isLoggedIn = false;
            this.token = null;
            this.user = null;
            localStorage.removeItem('quantflow_token');
        },

        async syncToCloud(payload) {
            if (!this.isLoggedIn) return;
            if (this.isSyncing) {
                this.pendingSync = true;
                return;
            }
            this.isSyncing = true;
            this.pendingSync = false;

            try {
                const res = await fetch(`${this.API_BASE}/api/data`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (e) { console.error('[AUTH] Sync failed'); }
            finally {
                this.isSyncing = false;
                if (this.pendingSync) this.syncToCloud(payload);
            }
        },

        async fetchCloudData() {
            if (!this.isLoggedIn) return null;
            try {
                const res = await fetch(`${this.API_BASE}/api/data`, {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                if (res.ok) {
                    return await res.json();
                }
            } catch (e) { console.error('[AUTH] Fetch failed'); }
            return null;
        }
    });
});
