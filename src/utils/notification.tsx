"us client";

import useNotification from "@/hooks/useNotification";
import { Box } from "@mantine/core";

type SuccessError = {
  title: string;
  msg: string;
};

type Props = {
  children: React.ReactNode;
  success?: SuccessError;
  error?: SuccessError;
  info?: SuccessError;
};

export default function Notification({
  children,
  info,
  success,
  error,
}: Props) {
  const { handleError, handleInfo, handleSuccess } = useNotification();

  if (info) {
    handleInfo(info.title, info.msg);
  }

  if (success) {
    handleSuccess(success.title, success.msg);
  }

  if (error) {
    handleError(error.title, error.msg);
  }

  return <Box>{children}</Box>;
}
