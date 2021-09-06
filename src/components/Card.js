import React, { Component, useState } from "react";
import styled from "styled-components";
import happiness from '../cute.png'

const Card = ({ cardDetail, handleCard, isStateAdd }) => {
    const [onHoverCard, setOnHoverCard] = useState(false);
    const hpCal = (hp) => {
        if (!hp || isNaN(Number(hp))) {
            return 0;
        }
        return Number(hp);
    };

    const strengthCal = (attacks) => {
        if (!attacks) {
            return 0;
        }
        return cardDetail?.attacks?.length > 1 ? 100 : cardDetail.attacks.length * 50;
    };

    const weaknessCal = (weaknesses) => {
        if (!weaknesses) {
            return 0;
        }
        return cardDetail?.weaknesses?.length > 0 ? 100 : 0;
    };

    const damageCal = (attacks) => {
        if (!attacks) {
            return 0;
        }
        let results = 0;
        attacks.map((attack) => {
            results += attack.damage === "" ? 0 : Number(attack.damage.match(/\d+/g)[0]);
        });
        return results;
    }

    const output = {
        hp: hpCal(cardDetail?.hp),
        strength: strengthCal(cardDetail?.attacks),
        weakness: weaknessCal(cardDetail?.weaknesses),
        damage: damageCal(cardDetail?.attacks),
    };

    output.happiness = Number((((output.hp / 10) + (output.damage / 10) + 10 - (output.weakness / 100)) / 5).toFixed());

    const rows = [];
    for (let i = 0; i < output.happiness; i++) {
        rows.push(<SHappiness key={cardDetail.id + i} src={happiness}></SHappiness>);
    }

    const levelTubeValueList = [
        {
            title: 'HP',
            width: output.hp > 100 ? 100 : output.hp,
        },
        {
            title: 'STR',
            width: output.strength,
        },
        {
            title: 'WEAK',
            width: output.weakness,
        },
    ];

    return (
        <SCardContainer className={onHoverCard ? 'display' : ''} onMouseOver={() => setOnHoverCard(true)} onMouseOut={() => setOnHoverCard(false)}>
            <SImageContainer>
                {cardDetail?.imageUrl && <SCard src={cardDetail?.imageUrl ? cardDetail.imageUrl : ''} alt="Error Image Path"></SCard>}
            </SImageContainer>
            <SCardDetialContainer>
                <SPokemonName>{cardDetail.name}</SPokemonName>
                {levelTubeValueList.map((levelTube) => {
                    return <SRowContainer key={levelTube.title} isStateAdd={isStateAdd}>
                        <STitle>{levelTube.title}</STitle>
                        <SLevelTubeContianer>
                            <SLevelTubeValue width={`${levelTube.width}%`}></SLevelTubeValue>
                            <SLevelTube></SLevelTube>
                        </SLevelTubeContianer>
                    </SRowContainer>;
                })}
                <SRowContainer>
                    {rows}
                </SRowContainer>
            </SCardDetialContainer>
            <SAddButton onClick={() => onHoverCard ? handleCard(cardDetail) : {}}>
                {isStateAdd ? 'Add' : 'X'}
            </SAddButton>
        </SCardContainer>
    );
}

export default Card

const SCardContainer = styled.div`
    display: flex;
    margin: 16px;
    background: ${(props) => props.theme.colors.cardBackground};
    height: fit-content;
    border-radius: 5px;
    box-shadow: 0px 1px 3px ${(props) => props.theme.colors.cardBoxShadow};
    &.display{
        box-shadow: 2px 2px 3px ${(props) => props.theme.colors.cardBoxShadowHover};
        & > div ~ div ~ div{
            opacity: 1;
        }
    }
`;

const SImageContainer = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
`;

const SCard = styled.img`
    width: 100%;
`;

const SCardDetialContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    width: 100%;
`;

const SPokemonName = styled.div`
    font-family: 'Gaegu',cursive;
    font-size: 32px;
    text-transform: uppercase;
`;

const SRowContainer = styled.div`
    display: flex;
    padding: 6px 0px;
`;

const STitle = styled.div`
    width: ${(props) => props.isStateAdd ? "20%" : "30%"};
    font-size: 20px;
`;

const SLevelTubeContianer = styled.div`
    width: ${(props) => props.isStateAdd ? "50%" : "100%"};
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

const SLevelTube = styled.div`
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.levelTubeBackground};
    border-radius: 24px;
    display: flex;
    position: relative;
`;

const SLevelTubeValue = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    background: ${(props) => props.theme.colors.levelTubeValueBackground};
    border-radius: 24px;
    position: absolute;
    z-index: ${(props) => props.isStateAdd ? 3 : 1};
`;

const SHappiness = styled.img`
    height: 40px;
    width: 40px;
    padding-right: 4px;
`;

const SAddButton = styled.div`
    height: fit-content;
    opacity: 0;
    font-size: 24px;
    margin-top: 10px;
    margin-right: 10px;
    color: ${(props) => props.theme.colors.colorAddButton};
    cursor: pointer;
    &:hover{
        color: #CF4A4A;
    }
`;

