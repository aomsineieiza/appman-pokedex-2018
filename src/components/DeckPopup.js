import React, { Component, useContext, useState } from "react";
import styled from "styled-components";
import { CardContext } from '../context/CardContext'
import Card from "./Card";
import SearchIcon from '../search.png'

const DeckPopUp = (props) => {
    const { cardList, setQuery } = useContext(CardContext)
    const [search, setSearch] = useState('');

    const handleAddCard = (card) => {
        props.setCardSelectList([...props.cardSelectList, card]);
    }

    const cardListSelectedFilter = () => {
        return cardList.filter((card) => !props.cardSelectList.map(select => select.id).includes(card.id));
    }

    const onChangeSearch = (event) => {
        setSearch(event);
        setQuery({ name: event });
    }

    return (
        <SPopupContainer onClick={() => props.setIsOpenPopup(false)}>
            <SPopupDetailContainer onClick={(e) => e.stopPropagation()}>
                <SSearchContainer>
                    <SInputContainer>
                        <SSearchInput type="text" placeholder="Find pokemon" value={search} onChange={(event) => onChangeSearch(event.target.value)}></SSearchInput>
                        <SSearchIcon src={SearchIcon}></SSearchIcon>
                    </SInputContainer>
                </SSearchContainer>   
                <SDeckContainer>
                    {cardListSelectedFilter().map((card) => {
                        return <Card key={card.id} cardDetail={card} handleCard={handleAddCard} isStateAdd={true}></Card>;
                    })}
                </SDeckContainer>
            </SPopupDetailContainer >
        </SPopupContainer >
    );
}

export default DeckPopUp;

const SPopupContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.modalOutside};
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const SPopupDetailContainer = styled.div`
    width: 90%;
    height: 95%;
    background: ${(props) => props.theme.colors.modalContentBackground};
    box-shadow: 1px 1px 2px ${(props) => props.theme.colors.modalContentBoxShadow};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
`;

const SSearchContainer = styled.div`
    margin: 10px 20px;
`;

const SInputContainer = styled.div`
    width: 100%;
    display: flex;
    border: 0.2px solid ${(props) => props.theme.colors.searchBoxBorder};
    box-shadow: 1px 1px 2px #c4c4c4;
    align-items: center;
    &:hover{
        box-shadow: 0px 0px 5px #6CC4FF;
    }
    &:focus-within {
        box-shadow: 0px 0px 5px #6CC4FF;
}
    
`;

const SSearchInput = styled.input`
    font-family: 'Gaegu', cursive;
    width: 100%;
    font-size: 32px;
    border: none;
    padding: 8px 2px;
    &:focus{
        outline: none !important;
    }
    
`;

const SSearchIcon = styled.img`
    width: 40px;
    height: 40px;
`;

const SDeckContainer = styled.div`
    overflow: scroll;
`;