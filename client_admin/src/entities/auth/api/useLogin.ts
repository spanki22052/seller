import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { login } from "./authApi";
import { LoginDto, LoginResponseDto } from "../model/types";
import { authKeys } from "../model/keys";

export function useLogin() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<LoginResponseDto, Error, LoginDto>({
    mutationFn: (dto: LoginDto) => login(dto),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.current(), data);
      message.success(t("auth.loginSuccess"));
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : t("auth.invalidCredentials");
      message.error(errorMessage);
    },
  });
}
