export default async function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    const response = await fetch("/api/auth/checkauth", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.ok;
}