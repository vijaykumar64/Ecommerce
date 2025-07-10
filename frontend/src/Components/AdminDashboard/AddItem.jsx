import React, { useState } from "react";
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
  Textarea, // ✅ Import Textarea
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AddProduct } from "../../redux/adminSlice";

export const Additem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productinfo, setinfo] = useState({
    title: "",
    cost: "",
    category: "",
    image: "",
    description: "",
  });

  const dispatch = useDispatch();
  const toast = useToast();

  const addproduct = () => {
    const { title, cost, category, image, description } = productinfo;

    const isValid =
      title.trim().length > 5 &&
      category.trim().length > 3 &&
      image.trim().length > 5 &&
      description.trim().length > 5 &&
      !isNaN(parseFloat(cost)) &&
      parseFloat(cost) > 0;

    if (isValid) {
      dispatch(AddProduct({ ...productinfo, cost: Number(cost) }, toast));
      onClose();
      setinfo({ title: "", cost: "", category: "", image: "", description: "" });
      console.log("✅ Product added successfully", productinfo);
    } else {
      toast({
        title: "Invalid Input",
        description: "All input fields are required and must be valid.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        m="auto"
        justifyContent={"left"}
        minW={"170px"}
        bgColor={"rgb(0,18,51)"}
        color="white"
        leftIcon={<MdAdd />}
        onClick={onOpen}
      >
        Add Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Product Title</FormLabel>
              <Input
                placeholder="Title"
                value={productinfo.title}
                onChange={(e) =>
                  setinfo((state) => ({ ...state, title: e.target.value }))
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Eg. SkinCare"
                value={productinfo.category}
                onChange={(e) =>
                  setinfo((state) => ({ ...state, category: e.target.value }))
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Product description"
                value={productinfo.description}
                onChange={(e) =>
                  setinfo((state) => ({ ...state, description: e.target.value }))
                }
              />
            </FormControl>

            <SimpleGrid columns={2} spacing="10px" mt={4}>
              <FormControl>
                <FormLabel>Cost</FormLabel>
                <Input
                  type="number"
                  placeholder="Eg. 2999"
                  value={productinfo.cost}
                  onChange={(e) =>
                    setinfo((state) => ({ ...state, cost: e.target.value }))
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Product Image</FormLabel>
                <Input
                  placeholder="Image URL"
                  value={productinfo.image}
                  onChange={(e) =>
                    setinfo((state) => ({ ...state, image: e.target.value }))
                  }
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button bgColor="rgb(0,18,51)" color="rgb(249,243,234)" onClick={addproduct}>
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
