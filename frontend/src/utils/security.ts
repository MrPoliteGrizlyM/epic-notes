const JWT_TOKEN = "YOUR_EPIC_JWT_TOKEN"
const localStorage = window.localStorage

const setJWTToken = () => {
    localStorage.setItem("token", JWT_TOKEN)
}

const isLogin = () => {
    let token = localStorage.getItem("token")
    console.log(token)
    return JWT_TOKEN === token;
}

export {isLogin, setJWTToken}