
const AuthenticationService = {
    adminLogin: async (credentials) => {
        //==========================
        //===Admin login API =======
        //==========================
        return fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    },

    patientLogin: async (credentials) => {
        //==========================
        //==Patient login API ======
        //==========================
        return fetch('/api/patient/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    },
};

export default AuthenticationService;
