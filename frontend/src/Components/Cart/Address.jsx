import {
  Stack,
  Heading,
  HStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddAddress, GetAddress, UpdateAddress } from "../../redux/cartSlice";

const Address = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addressData = useSelector((state) => state.cart.address);
  const state = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    fullname: "",
    landmark: "",
    mobile: "",
    state: "",
    city: "",
    street: "Street",
    zipcode: "",
  });

  useEffect(() => {
    dispatch(GetAddress());
  }, []);

  useEffect(() => {
    setAddress({ ...address, ...addressData });
  }, [addressData]);

  const HandleAddress = () => {
    dispatch(AddAddress(address, toast));
    onClose();
  };

  const HandleUpdate = () => {
    dispatch(UpdateAddress(address, toast));
    onClose();
  };

  const isUpdate = addressData && addressData.fullname && addressData.fullname.length > 5;

  return (
    <Stack hidden={state.length === 0} direction="column" bgColor="rgb(249,243,234)" p="20px">
      <Heading color="rgb(0,18,51)" fontSize="22px">
        Deliver to
      </Heading>

      <Stack direction="column">
        <HStack minW="full" justifyContent="space-between">
          <Text>Name</Text>
          <Text>{addressData && addressData.fullname ? addressData.fullname : "Your Name"}</Text>
        </HStack>
        <HStack minW="full" justifyContent="space-between">
          <Text>Mobile No</Text>
          <Text>{addressData && addressData.mobile ? addressData.mobile : "+91"}</Text>
        </HStack>
        <HStack minW="full" justifyContent="space-between">
          <Text>City</Text>
          <Text>{addressData && addressData.city ? addressData.city : "Your City"}</Text>
        </HStack>
        <HStack minW="full" justifyContent="space-between">
          <Text>State</Text>
          <Text>{addressData && addressData.state ? addressData.state : "Your State"}</Text>
        </HStack>
        <HStack minW="full" justifyContent="space-between">
          <Text>Zip Code</Text>
          <Text>{addressData && addressData.zipcode ? addressData.zipcode : "ZipCode"}</Text>
        </HStack>
      </Stack>

      <Button color="rgb(249,243,234)" bgColor="rgb(0,18,51)" onClick={onOpen}>
        {isUpdate ? "Update Address" : "Add Address"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isUpdate ? "Update Address" : "Add Address"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={address.fullname}
                placeholder="Full name"
                onChange={(e) => setAddress({ ...address, fullname: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mobile No</FormLabel>
              <Input
                placeholder="Mobile No"
                value={address.mobile}
                onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
              />
            </FormControl>

            <SimpleGrid columns={2} spacing="10px">
              <FormControl mt={4}>
                <FormLabel>City</FormLabel>
                <Input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>State</FormLabel>
                <Input
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Landmark (Optional)</FormLabel>
                <Input
                  placeholder="Landmark"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  placeholder="Zip Code"
                  value={address.zipcode}
                  onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            {!isUpdate && (
              <Button onClick={HandleAddress} bgColor="rgb(0,18,51)" color="rgb(249,243,234)" mr={3}>
                ADD
              </Button>
            )}
            {isUpdate && (
              <Button onClick={HandleUpdate} bgColor="rgb(0,18,51)" color="rgb(249,243,234)" mr={3}>
                UPDATE
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Address;
