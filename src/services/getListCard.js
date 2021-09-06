const axios = require('axios')
const getListCard = (query) => 
    axios.get(`http://localhost:3030/api/cards?name=${query.name}`,).then((res) => { return res.data; })


export default getListCard