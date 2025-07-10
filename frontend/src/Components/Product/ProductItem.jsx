import {
  Button,
  Stack,
  Heading,
  Text,
  Image,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";

const ProductItem = (props) => {
  const { title, img, cost, category, id, description } = props;
  const dispatch = useDispatch();
  const toast = useToast();
  const [status, setStatus] = useState(false);

  const handleCart = () => {
    dispatch(addItem(id, toast, setStatus));
  };

  return (
    <Stack
      gap="10px"
      maxW="300px"
      p="10px"
      spacing="0px"
      direction={"column"}
      justifyContent={"flex-start"}
      textAlign="left"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      bg={"white"}
    >
      <Box
        minW="250px"
        minH="250px"
        maxW="250px"
        maxH="250px"
        bgColor={"rgb(240,224,199)"}
        m="auto"
      >
        <Image
          minW="250px"
          minH="250px"
          maxW="250px"
          maxH="250px"
          src={img}
          bg={'white'}
          objectFit="cover"
        />
      </Box>

      <Heading pt="10px" fontSize="16px">
        {title}
      </Heading>

      <Text fontSize="14px" color="gray.600">
        {category || "Category"}
      </Text>

      {description && (
        <Text fontSize="13px" color="gray.500">
          {description}
        </Text>
      )}

      <Heading fontSize="16px" color="rgb(0,18,51)">
        ₹ {cost}
      </Heading>

      <Button
        _hover={{ color: "rgb(240,224,199)" }}
        maxW="60%"
        borderRadius="0px"
        color="rgb(240,224,199)"
        bgColor="rgb(0,18,51)"
        m="auto"
        onClick={status ? () => {} : handleCart}
      >
        {status ? "Added" : "Add"}
      </Button>
    </Stack>
  );
};

export default ProductItem;
