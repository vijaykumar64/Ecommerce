import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box bgColor="rgb(0,18,51)" color="rgb(239,224,202)" py="40px" px="20px" w="100%">
      <Container maxW="6xl" centerContent>
        <Stack spacing="20px" textAlign="center">
          <Heading fontSize="30px">Finest Mobiles</Heading>
          <Text fontSize="18px">
            We disrupted the mobile industry by offering cutting-edge smartphones and accessories
            at unbeatable prices, delivered right to your doorstep. Since then, we’ve been listening
            to our customers’ needs—bringing you the latest in mobile technology, fast delivery,
            and top-notch service. Whether you're upgrading your phone or grabbing a new charger,
            we’re here to keep you connected and ahead of the curve.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
