import { jwtDecode } from "jwt-decode"

export function getDecodedJWT(token)
{
    const decoded = jwtDecode(token)

    const user = {
        "name": decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        "email": decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        "role": decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        "aud": decoded.aud,
        "exp": decoded.exp,
        "iss": decoded.iss
    }

    return user
}
