import React, { createContext, useEffect, useState } from "react";
import getListCard from '../services/getListCard'

const DEFAULT_QUERY = {
    name: '',   
    type: ''
}

export const CardContext = createContext({
    cardList: [],
    setCardList: () => { },
    query: {},
    setQuery: () => { },
})

const CardContextProvider = ({children}) => {
    const [cardList, setCardList] = useState([])
    const [query, setQuery] = useState(DEFAULT_QUERY)

    const getDeck = async () => {
        const result = await getListCard(query)
        setCardList(result.cards)
    }
    useEffect(() => {
        getDeck();
    }, [query])

    return <CardContext.Provider value={{ cardList, setCardList, query, setQuery }}>
        {children}
    </CardContext.Provider>;
}

export default CardContextProvider