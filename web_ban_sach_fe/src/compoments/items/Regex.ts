const REGEX_USERNAME= /^[a-zA-Z0-9_-]{3,}$/
const REGEX_PASSWORD= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const REGEX_EMAIL= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export {REGEX_USERNAME, REGEX_PASSWORD, REGEX_EMAIL}