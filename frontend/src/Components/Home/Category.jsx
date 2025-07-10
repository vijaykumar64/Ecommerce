import { SimpleGrid, VStack,Image,Heading, Button} from "@chakra-ui/react";
import React from "react";
import skicare from "../../assets/skincare.jpg"
import shave from "../../assets/shave.jpg"
import blade from "../../assets/blade.jpg"
import starterkits from "../../assets/starterkits.jpg"
import { NavLink } from "react-router-dom";
const Category=()=>{
    return (<SimpleGrid p="10px" spacing={"20px"} columns={{base:2,md:4}}>
            <VStack  bgColor="rgb(255,255,255)"
>
                <Image minH={{base:"",md:"240px"}} maxH={{base:"",md:"240px"}} minW={{base:"",md:"220px"}} maxW={{base:"",md:"240px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG42Jlh__tbgzQit1vTWRrXtWCrk8N5oL-4Q&s"}/>
                <NavLink to={"/shop"}>  <Button  fontSize={"19px"}  bgColor={"rgb(139,206,178)"} color="rgb(16,23,24)" minW={{base:"200",md:"280px"}} maxW={{base:"",md:"240px"}}>🎮 Best Gaming Mobile</Button></NavLink>
            </VStack>
            <VStack bgColor="rgb(255,255,255)"
>
                <Image minH={{base:"",md:"240px"}} maxH={{base:"",md:"240px"}} minW={{base:"",md:"220px"}} maxW={{base:"",md:"240px"}} src={"https://s.alicdn.com/@sc04/kf/H875edeffba0e48c790ed9fc4115b38c5K.png"}/>
                <NavLink to={"/shop"}>   <Button fontSize={"19px"}  bgColor={"rgb(139,206,178)"} color="rgb(16,23,24)"  minW={{base:"200",md:"280px"}} maxW={{base:"",md:"240px"}}>📸 Best Camera Mobile</Button></NavLink>
            </VStack>
            <VStack  bgColor="rgb(255,255,255)"
>
                <Image minH={{base:"",md:"240px"}} maxH={{base:"",md:"240px"}} minW={{base:"",md:"220px"}} maxW={{base:"",md:"240px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWJeTY0jUzIncFX733ZZKc7DDPJ_gpTszqg&s"}/>
                <NavLink to={"/shop"}>     <Button fontSize={"19px"} bgColor={"rgb(139,206,178)"} color="rgb(16,23,24)"  minW={{base:"200",md:"280px"}} maxW={{base:"",md:"240px"}}>🚀 Best Flagship Processor</Button></NavLink>
            </VStack>
            <VStack  bgColor="rgb(255,255,255)"
>
                <Image minH={{base:"",md:"240px"}} maxH={{base:"",md:"240px"}} minW={{base:"",md:"220px"}} maxW={{base:"",md:"240px"}} src={"https://www.themobileindian.com/wp-content/uploads/2025/03/Pixel-9a-porcelain-specs-600x600.jpg"}/>
                <NavLink to={"/shop"}>    <Button fontSize={"19px"} bgColor={"rgb(139,206,178)"} color="rgb(16,23,24)" minW={{base:"200",md:"280px"}} maxW={{base:"240px",md:"240px"}}>💸 Best Value for Money</Button></NavLink>
            </VStack>
    </SimpleGrid>)
}

export default Category