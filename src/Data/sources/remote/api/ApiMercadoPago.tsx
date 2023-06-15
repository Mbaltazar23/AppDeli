import axios from "axios"

const ApiMercadoPago = axios.create({
    baseURL: 'https://api.mercadopago.com/v1/',
    headers :{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TEST-4345948724789304-061301-03ec356bb8a7809a0f52fbadb30cec53-138199846 ' 
    }
})

export { ApiMercadoPago }