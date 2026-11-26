// MUND.info <-> TheBase Client
const THEBASE_URL = "https://thebase-api.appiahjohn242.workers.dev";
const DEFAULT_ANON_KEY = "tb_anon_43023556ce3dc0b35ebcfd55";
const KEY_STORAGE_ANON = "mundinfo_thebase_anon_key";
const KEY_STORAGE_SERVICE = "mundinfo_thebase_service_key";
const SESSION_KEY = "thebase_session_token";

function getAnonKey() {
  const saved = localStorage.getItem(KEY_STORAGE_ANON) || "";
  if (saved) return saved;
  return (DEFAULT_ANON_KEY && !DEFAULT_ANON_KEY.includes("YOUR_ANON_KEY_HERE")) ? DEFAULT_ANON_KEY : "";
}
function getServiceKey() {
  return localStorage.getItem(KEY_STORAGE_SERVICE) || "";
}
function saveKeys({ anonKey, serviceKey }) {
  if (typeof anonKey === "string") localStorage.setItem(KEY_STORAGE_ANON, anonKey.trim());
  if (typeof serviceKey === "string") localStorage.setItem(KEY_STORAGE_SERVICE, serviceKey.trim());
}

function createBase(url, apiKey) {
  const baseUrl = url.replace(/\/$/, "");
  async function request(endpoint, options = {}) {
    if (!apiKey) return { data: null, error: "Missing TheBase API key" };
    try {
      const token = localStorage.getItem(SESSION_KEY);
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      };
      const res = await fetch(`${baseUrl}${endpoint}`, { ...options, headers });
      const json = await res.json();
      if (!res.ok) return { data: null, error: json.error || "Request failed" };
      return { data: json, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  }

  const auth = {
    async signUp({ email, password, metadata }) {
      const res = await request("/api/_auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, metadata })
      });
      if (res.data?.token) localStorage.setItem(SESSION_KEY, res.data.token);
      return res;
    },
    async signIn({ email, password }) {
      const res = await request("/api/_auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (res.data?.token) localStorage.setItem(SESSION_KEY, res.data.token);
      return res;
    },
    async getUser() {
      const token = localStorage.getItem(SESSION_KEY);
      if (!token) return { data: null, error: "No active session" };
      return request("/api/_auth/user");
    },
    signOut() {
      localStorage.removeItem(SESSION_KEY);
      return { error: null };
    }
  };

  function from(table) {
    const filters = [];
    const buildQuery = () =>
      filters.length ? "?" + filters.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&") : "";
    return {
      eq(col, val) { filters.push([col, val]); return this; },
      neq(col, val) { filters.push([col + "__neq", val]); return this; },
      order(col, opts = {}) { filters.push(["_order", `${col}:${opts.ascending === false ? "desc" : "asc"}`]); return this; },
      limit(n) { filters.push(["_limit", n]); return this; },
      select() { return request(`/api/${table}${buildQuery()}`); },
      insert(payload) { return request(`/api/${table}`, { method: "POST", body: JSON.stringify(payload) }); },
      update(payload) { return request(`/api/${table}${buildQuery()}`, { method: "PATCH", body: JSON.stringify(payload) }); },
      delete() { return request(`/api/${table}${buildQuery()}`, { method: "DELETE" }); }
    };
  }

  return { auth, from, request };
}

function getPublicClient() {
  return createBase(THEBASE_URL, getAnonKey());
}
function getAdminClient() {
  return createBase(THEBASE_URL, getServiceKey());
}
