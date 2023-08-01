import styled from 'styled-components'
 
const Quantity = styled.span`
width: 24px;
text-align: center;
`
const Item = styled.div`
width: 33%;
margin-bottom:20px;
&:nth-child(odd) {
  order: 1;
}
`
const Title = styled.h3`
text-align: center;
`;
const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const CourseCardTitle = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 45%;
border-radius: 40px;
cursor: pointer;
margin: 10px;
`;

const SubCardContainer = styled.div`
padding:5px;
border:5px solid black;
border-radius:40px;
`
const CourseContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 45%;
    cursor: pointer;
    margin: auto;
    padding: 10px;
    text-align: center;
`

const CourseSubContainer = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 80%;
margin-top: 20px;
cursor: pointer;
margin: auto;
padding: 10px;

margin-top: 20px;
margin-bottom: 20px;

`
const ImageContainer = styled.img`
width:100%;
height:250px;
border-radius: 5px 5px 0 0;
`;

const TextContainer = styled.div`
display: flex;
    flex-direction: column;
padding: 2px 16px;
`

const MainNav = styled.div`
margin-left: 240px;
display: flex;
flex-wrap: wrap;
width:800px;
`


export {MainNav,TextContainer,Item,ImageContainer,CourseSubContainer,CourseContainer,SubCardContainer,CourseCardTitle,ButtonContainer,Title,Quantity}