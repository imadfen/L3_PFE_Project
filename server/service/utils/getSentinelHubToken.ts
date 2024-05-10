export default async function getToken(clientId: string, clientSecret: string): Promise<string> {
    const url = "https://services.sentinel-hub.com/oauth/token";
    const payload = new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: payload
    });
  
    const data = await response.json();
    return data.access_token;
  }
  