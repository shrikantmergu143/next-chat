export const registerValidator = (payload) => {
    let val = false;
    const error = {};

    if (!payload?.username || payload.username.trim() === "") {
        error.username = "Username field is required";
        val = true;
    }

    if (!payload?.password || payload.password.trim() === "") {
        error.password = "Password field is required";
        val = true;
    } else if (payload.password.length < 8) {
        error.password = "Password must be at least 8 characters long";
        val = true;
    } else if (!/[A-Z]/.test(payload.password)) {
        error.password = "Password must contain at least one uppercase letter";
        val = true;
    } else if (!/[a-z]/.test(payload.password)) {
        error.password = "Password must contain at least one lowercase letter";
        val = true;
    } else if (!/[0-9]/.test(payload.password)) {
        error.password = "Password must contain at least one number";
        val = true;
    } else if (!/[!@#$%^&*]/.test(payload.password)) {
        error.password = "Password must contain at least one special character";
        val = true;
    }

    if (!payload?.email || payload.email.trim() === "") {
        error.email = "Email field is required";
        val = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        error.email = "Email is not valid";
        val = true;
    }

    if (!payload?.first_name || payload.first_name.trim() === "") {
        error.first_name = "First name field is required";
        val = true;
    }

    if (!payload?.last_name || payload.last_name.trim() === "") {
        error.last_name = "Last name field is required";
        val = true;
    }

    if (val) {
        return error;
    }

    return val;
};
