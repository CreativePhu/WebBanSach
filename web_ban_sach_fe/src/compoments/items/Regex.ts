const REGEX_USERNAME = /^[a-zA-Z0-9_-]{3,}$/
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


// FormUpdate payment
const REGEX_NAME = /[a-zA-Z]{2,}/
const REGEX_PHONENUMBER = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

export {REGEX_USERNAME, REGEX_PASSWORD, REGEX_EMAIL, REGEX_NAME, REGEX_PHONENUMBER}