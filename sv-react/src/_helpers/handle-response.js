import {
    authenticationService,
    accountService
} from '@/_services';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.detail == "Signature has expired") {
            authenticationService.refreshToken();
            accountService.userInfo()
            return "Token refreshed";
        }
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
