export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('authUser'));
    
    if (token) {
        return { 'Authorization': `Bearer  ${token}` };
    } else {
        return {};
    }
}