var u = Object.defineProperty;
var l = (a, t, s) => t in a ? u(a, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[t] = s;
var o = (a, t, s) => (l(a, typeof t != "symbol" ? t + "" : t, s), s);
async function n(a, t, s, r, c, i) {
  console.log(`${s} ${t}`, i || "");
  const e = await fetch(a + t, {
    method: s,
    body: i,
    headers: { ...c, "Content-Type": "application/json" },
    credentials: "include"
  });
  if (e.status !== 200 && e.status !== 201 && e.status !== 202 && e.status !== 204)
    throw { status: e.status, error: !0, response: e };
  switch (r) {
    case "json":
      return { data: await e.json(), status: e.status, error: !1, response: e };
    case "text":
      return { data: await e.text(), status: e.status, error: !1, response: e };
    case "bytes":
    case "uint8":
      return { data: await e.bytes(), status: e.status, error: !1, response: e };
  }
}
class h {
  constructor() {
    o(this, "baseUrl");
    return this.baseUrl = "", localStorage.getItem("instance_url") !== void 0 && localStorage.getItem("instance_url") !== "" && this.__internal_connectTo(localStorage.getItem("instance_url")), this;
  }
  __internal_connectTo(t) {
    return this.baseUrl = t, this;
  }
  async get(t, s, r) {
    return await n(this.baseUrl, t, "GET", s);
  }
  async post(t, s, r, c) {
    return await n(this.baseUrl, t, "POST", r, {}, JSON.stringify(s));
  }
  async put(t, s, r, c) {
    return await n(this.baseUrl, t, "PUT", r, {}, s);
  }
  async delete(t, s, r) {
    return await n(this.baseUrl, t, "DELETE", s, {});
  }
}
const f = new h();
export {
  f as default
};
