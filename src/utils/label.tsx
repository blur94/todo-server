import { Text } from "@mantine/core";
import { ReactElement } from "react";

export const label = (text: string, required?: boolean): ReactElement => (
  <Text size={"xs"} fw={500} mb={10}>
    {text} {required && <span style={{ color: "red" }}>*</span>}
  </Text>
);
