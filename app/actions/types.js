// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Home Student API Requests ---------------------------------------------------

export const STUDENT_NEWS_FEED_REQUEST = 'STUDENT_NEWS_FEED_REQUEST';
export const STUDENT_NEWS_FEED_SUCCESS = 'STUDENT_NEWS_FEED_SUCCESS';
export const STUDENT_NEWS_FEED_FAILURE = 'STUDENT_NEWS_FEED_FAILURE';

export const STUDENT_EVENTS_REQUEST = 'STUDENT_EVENTS_REQUEST';
export const STUDENT_EVENTS_SUCCESS = 'STUDENT_EVENTS_SUCCESS';
export const STUDENT_EVENTS_FAILURE = 'STUDENT_EVENTS_FAILURE';

export const STUDENT_ASSOCIATIONS_REQUEST = 'STUDENT_ASSOCIATIONS_REQUEST';
export const STUDENT_ASSOCIATIONS_SUCCESS = 'STUDENT_ASSOCIATIONS_SUCCESS';
export const STUDENT_ASSOCIATIONS_FAILURE = 'STUDENT_ASSOCIATIONS_FAILURE';

// Home Association API Requests -----------------------------------------------

export const ASSOCIATION_EVENTS_REQUEST = 'ASSOCIATION_EVENTS_REQUEST';
export const ASSOCIATION_EVENTS_SUCCESS = 'ASSOCIATION_EVENTS_SUCCESS';
export const ASSOCIATION_EVENTS_FAILURE = 'ASSOCIATION_EVENTS_FAILURE';

export const ASSOCIATION_NEWS_FEED_REQUEST = 'ASSOCIATION_NEWS_FEED_REQUEST';
export const ASSOCIATION_NEWS_FEED_SUCCESS = 'ASSOCIATION_NEWS_FEED_SUCCESS';
export const ASSOCIATION_NEWS_FEED_FAILURE = 'ASSOCIATION_NEWS_FEED_FAILURE';

// Profile  API Requests -------------------------------------------------------

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// Create Forms API Requests --------------------------------------------------

export const FORM_REQUEST = 'FORM_REQUEST';
export const FORM_SUCCESS = 'FORM_SUCCESS';
export const FORM_FAILURE = 'FORM_FAILURE';

// Options

export const OPTIONS_REQUEST = 'OPTIONS_REQUEST';
export const OPTIONS_SUCCESS = 'OPTIONS_SUCCESS';
export const OPTIONS_FAILURE = 'OPTIONS_FAILURE';
