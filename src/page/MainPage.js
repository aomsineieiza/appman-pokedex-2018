import React, { Component, useState } from "react";
import DeckPopUp from '../components/DeckPopup';
import styled from "styled-components";
import Card from "../components/Card";

const MainPage = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [cardSelectList, setCardSelectList] = useState([]);

    const handleOpenDeck = () => {
        setIsOpenPopup(true);
    }

    const handleRemoveCard = async (card) => {
        let results = [];
        cardSelectList.map((cardSelect) => {
            if (cardSelect.id !== card.id) {
                results.push(cardSelect);
            }
        });
        setCardSelectList(results);
    }

    return (
        <SContainer>
            <STitleContainer>
                <h1 style={{ textAlign: "center", margin: "0px", padding: "16px 0px" }}>MY Pokedex</h1>
            </STitleContainer>
            <SCardSelectedContainer>
                {cardSelectList && cardSelectList.map((card, i) => {
                    return <SCardContainer key={card.id}>
                        <Card key={i} cardDetail={card} handleCard={handleRemoveCard} isStateAdd={false}></Card>
                    </SCardContainer>;
                })}
            </SCardSelectedContainer>
            <SAddTabContainer>
                <SAddButton onClick={() => handleOpenDeck()}>
                    <SAddIcon>+</SAddIcon>
                </SAddButton>
            </SAddTabContainer>

            {isOpenPopup && <DeckPopUp setIsOpenPopup={setIsOpenPopup} cardSelectList={cardSelectList} setCardSelectList={setCardSelectList} />}
        </SContainer>
    );
}

export default MainPage

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const STitleContainer = styled.div`
    width: 100%;
`;

const SCardSelectedContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    padding-bottom: 60px;
`;

const SCardContainer = styled.div`
    width: 50%;
`;

const SAddTabContainer = styled.div`
    width: 100%;
    height: 60px;
    background: ${(props) => props.theme.colors.bottomBarBackground} ;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    bottom: 0; 

`;

const SAddButton = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.colors.bottomBarBackground};
    cursor: pointer;
`;

const SAddIcon = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 70px;
    justify-content: center;
    &:hover{
        font-size: 80px;
        transition: all 0.1s ease-in-out;
    }

`;