import clienteAxios from "./axios";

const tokenAuth = token => {
    if (token){
        clienteAxios.defaults.headers['Authorization'] = 'Bearer ' + token
    } else {
        delete clienteAxios.defaults.headers['Authorization']
    }
}
export default tokenAuth