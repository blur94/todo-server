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
  LoadingOverlay,
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
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const { handleError, handleInfo, handleSuccess } = useNotification();
  const { push } = useRouter();

  const [visible, setVisible] = useState(false);

  const schema = z.object({
    emailOrUserName: z.string().min(1, "Email or User Name is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    initialValues: { emailOrUserName: "", password: "" },
    validate: zodResolver(schema),
  });
  const createUser = async (data: FormData) => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    const { emailOrUserName, password } = form.values;

    try {
      setVisible(true);

      const user = await signIn("credentials", {
        emailOrUserName: emailOrUserName,
        password: password,
        redirect: false,
      });

      if (user?.error && !user.ok)
        return handleError("Login Failed", "Incorrect details");

      handleSuccess("Login Successful", "Welcome back");

      // handleSuccess("Registration successful", res.message);
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
    <Center className="w-screen h-screen" pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
      <Card w={500} shadow="md" p="xl" component="form" action={createUser}>
        <Title order={2} mb={20}>
          Log In to{" "}
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
            name="emailOrUserName"
            label={label("Email / User Name")}
            placeholder="Enter Email / User Name"
            mb="md"
            size="md"
            {...form.getInputProps("emailOrUserName")}
          />
        </Box>

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

        <Text fz={12} mt={20}>
          Not a member yet?{" "}
          <Text
            inherit
            component={Link}
            variant="gradient"
            gradient={{ from: "yellow", to: "pink" }}
            href={"/auth/register"}
          >
            Register
          </Text>
        </Text>
      </Card>
    </Center>
  );
}
