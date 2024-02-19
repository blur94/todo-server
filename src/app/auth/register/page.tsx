"use client";

import useNotification from "@/hooks/useNotification";
import { RegisterSchema, RegisterValues } from "@/utils/auth";
import { label } from "@/utils/label";
import Notification from "@/utils/notification";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function Register() {
  const { handleError, handleInfo, handleSuccess } = useNotification();
  const { push } = useRouter();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    initialValues: RegisterValues,
    validate: zodResolver(RegisterSchema),
  });
  const createUser = async (data: FormData) => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    const { fullName, email, userName, password, confirmPassword } =
      form.values;

    setVisible(true);
    try {
      const { data: res } = await axios.post("/api/register", {
        fullName,
        email,
        userName,
        password,
        confirmPassword,
      });

      handleSuccess("Registration successful", res.message);
      push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const status = error.response?.status;

        if (status === 409)
          return handleInfo("Registration failed", data.message);
        return handleError("Registration failed", data.message);
      }
      handleError("Registration failed", "Something went wrong!");
    } finally {
      setVisible(false);
    }
  };
  return (
    <Center className="w-screen h-screen">
      <Card w={500} shadow="md" p="xl" component="form" action={createUser}>
        <Title order={2} mb={20}>
          Register to{" "}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "pink", to: "yellow" }}
          >
            Gilead&apos;s Todo
          </Text>
        </Title>

        <Box w="100%">
          <TextInput
            name="fullName"
            label={label("Full Name")}
            placeholder="Enter Full Name"
            mb="md"
            size="md"
            {...form.getInputProps("fullName")}
          />
        </Box>
        <Box w="100%">
          <TextInput
            name="userName"
            label={label("Username")}
            placeholder="Enter Username"
            mb="md"
            size="md"
            {...form.getInputProps("userName")}
          />
        </Box>
        <Box w="100%">
          <TextInput
            name="email"
            label={label("Email")}
            placeholder="Enter Email"
            mb="md"
            size="md"
            {...form.getInputProps("email")}
          />
        </Box>
        <Flex gap={20}>
          <Box w="100%">
            <PasswordInput
              name="password"
              label={label("Password")}
              placeholder="Enter Password"
              mb="md"
              size="md"
              {...form.getInputProps("password")}
            />
          </Box>
          <Box w="100%">
            <PasswordInput
              name="confirmPassword"
              label={label("Confirm Password")}
              placeholder="Confirm Password"
              mb="md"
              size="md"
              {...form.getInputProps("confirmPassword")}
            />
          </Box>
        </Flex>

        <Flex gap={20} justify="space-between" mt={30}>
          <Button variant="outline" w={200} color="yellow">
            Cancel
          </Button>
          <Button
            w={200}
            bg="pink"
            variant="gradient"
            gradient={{ from: "pink", to: "yellow" }}
            type="submit"
            loading={visible}
          >
            Submit
          </Button>
        </Flex>
      </Card>
    </Center>
  );
}
