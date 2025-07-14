import {
  Checkbox,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../redux/userSlice";

const User = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const auth = useSelector((state) => state.user.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(loginUser(loginData, toast));
  };

  const handleRegister = async () => {
    await dispatch(signupUser(registerData, toast));
    setRegisterData({
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <Container bgColor={"rgb(0,18,51)"} minW="100%" minH={"500px"}>
      <Center>
        <Tabs
          margin={"40px"}
          minH={{ md: "400px" }}
          minW={{ md: "400px" }}
          borderRadius="10px"
          maxW="400px"
          bgColor="white"
          padding={"20px"}
          isFitted
          variant="enclosed"
        >
          <TabList>
            <HStack minW="100%" justifyContent={"center"}>
              <Tab>LOGIN</Tab>
              <Tab>REGISTER</Tab>
            </HStack>
          </TabList>

          <TabPanels>
          
            <TabPanel>
              <Center>
                <VStack>
                  <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                    <Checkbox mt="20px" defaultChecked>
                      Remember me
                    </Checkbox>
                    <Button
                      mt="30px"
                      minW="100%"
                      bgColor="rgb(202,225,249)"
                      color="rgb(0,18,51)"
                      onClick={handleLogin}
                    >
                      LOGIN
                    </Button>
                  </FormControl>
                </VStack>
              </Center>
            </TabPanel>

         
            <TabPanel>
              <Center>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                  />
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                  <Button mt="30px" minW="100%" onClick={handleRegister}>
                    REGISTER
                  </Button>
                </FormControl>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Container>
  );
};

export default User;
