import {
  Button,
  Heading,
  Stack,
  Text,
  Container,
  Box,
  Center,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BestSeller from "../Components/Home/BestSeller";
import Category from "../Components/Home/Category";
import { fetchProducts } from "../redux/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box overflow="hidden" w="100vw">
     
      <Box
        bgColor={"rgb(16,23,24)"}
        py={{ base: "40px", md: "80px" }}
        px={{ base: "20px", md: "80px" }}
        w="100%"
      >
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          spacing={10}
          align="center"
          justify="space-between"
          w="100%"
        >
        
          <Stack spacing={5} flex="1" maxW="500px">
            <Heading
              fontSize={{ base: "32px", md: "50px" }}
              color="rgb(139,206,178)"
              lineHeight="1.2"
            >
              Stay Ahead with Smarter Tech.
            </Heading>
            <Text fontSize="18px" color="rgb(139,206,178)">
              Our newest product is going to change your routine.
            </Text>
            <NavLink to="/shop">
              <Button
                fontSize="18px"
                rightIcon={<AiOutlineArrowRight />}
                h="45px"
                w={{ base: "100%", md: "220px" }}
                bgColor="rgb(0,18,51)"
                color="white"
              >
                Take A Look
              </Button>
            </NavLink>
          </Stack>

        
          <Box
            flexShrink={0}
            borderRadius="xl"
            bgImage="url('https://f.nooncdn.com/noon-cdn/s/app/com/noon-digest/prod/assets/best-mobile-phones-mobile-header-banner.jpg')"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
            w={{ base: "100%", md: "500px" }}
            h={{ base: "300px", md: "450px" }}
            mr={{ base: 0, md: "20px" }}
          />
        </Stack>
      </Box>

    
      <Box bgColor={"rgb(16,23,24)"} py="40px">
        <Center>
          <Category />
        </Center>
      </Box>

    
      <Heading
        pb="20px"
        pt="20px"
        pl={{ base: "0px", md: "60px" }}
        fontSize="30px"
        color="rgb(0,18,51)"
        textAlign={{ base: "center", md: "left" }}
      >
        Our Best Seller
      </Heading>
      <Center>
        <BestSeller />
      </Center>
    </Box>
  );
};

export default Home;
