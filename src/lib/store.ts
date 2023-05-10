type Session = {
  state?: string;
  codeVerifier?: string;
  accessToken?: string;
  data?: any;
};

const store = new Map<string, Session>();

export { store };
