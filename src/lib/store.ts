type Session = {
  state?: string;
  codeVerifier?: string;
  accessToken?: string;
  userInfo?: Record<string, string>;
  sgid?: string;
};

const store = new Map<string, Session>();

export { store };
