import React from "react";
import { Route, Switch } from "react-router-dom";
import SettingsPage from "../components/pages/Settings/SettingsPage";
import Login from "../components/pages/Login/Login";
import Calendar from "../components/pages/Calendar/Calendar";
import NotFound from "../components/pages/NotFound";
import { ThemeContext } from "../context/ThemeContext";
import { ActiveHoursContext } from "../context/ActiveHoursContext";
import CookieManager from "../helpers/CookieManager";
import "../tailwind-generated.css";
import PrivateRoute from "../helpers/PrivateRoute";
import DotoService from "../helpers/DotoService";

/**
 * When the user is redirected after they are logged in to their google account
 * We take the current url and extract the Email and JWT Token from the query parameters
 *
 * There was also a weird issue where the JWT token with emails ending with "gmail.com" had a
 * "#" character at the end but the emails ending with "aucklanduni.ac.nz" did not have this issue
 * and that is why we are doing a hacky check to see if the email domain starts with "a".
 */
const extractEmailAndJwt = url => {
    const [endPoint, queryParams] = url.split("/")[3].split("?");
    if (endPoint !== "calendar" || !queryParams) return;
    const [base64Email, jwt] = queryParams.split("&").map(param => param.split("=")[1]);
    const email = atob(base64Email);

    const isUoAEmail = email.split("@")[1].substring(0, 1) === "a";
    return [email, isUoAEmail ? jwt : jwt.substring(0, jwt.length - 1)];
};

// Saving the email and jwt cookies to the current session
const saveToCookies = params => {
    if (!params) return;
    const [email, jwt] = params;
    CookieManager.set("email", email);
    CookieManager.set("jwt", jwt);
};

// Boilerplate from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
const urlBase64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const setupReminders = async params => {
    if (!params) return;
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.active) {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY),
        });
        DotoService.subscribeToReminders(subscription);
    }
};

// Sets the routing to the appropriate pages, passing in the colour theme based on user setting
const Routes = () => {
    const [theme, setTheme] = React.useState(true);
    const [activeHourStartTime, setActiveHourStartTime] = React.useState(new Date());
    const [activeHourEndTime, setActiveHourEndTime] = React.useState(new Date());
    // Only when backend returns JWT and email then we save
    const params = extractEmailAndJwt(window.location.href);
    saveToCookies(params);
    setupReminders(params);
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <ThemeContext.Provider value={[theme, setTheme]}>
                <ActiveHoursContext.Provider
                    value={{
                        activeHoursStart: [activeHourStartTime, setActiveHourStartTime],
                        activeHoursEnd: [activeHourEndTime, setActiveHourEndTime],
                    }}
                >
                    <PrivateRoute path="/calendar" exact component={Calendar} />
                    <PrivateRoute path="/settings" exact component={SettingsPage} />
                    <Route component={NotFound} />
                </ActiveHoursContext.Provider>
            </ThemeContext.Provider>
        </Switch>
    );
};

export default Routes;
