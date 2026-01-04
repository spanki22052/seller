import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/entities/auth";
import { useAuth } from "@/shared/contexts/AuthContext";
import { LOGIN_FORM_DEFAULTS } from "../model/constants";
import type { LoginFormValues } from "../model/types";
import * as Styled from "./styled";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginSchema = z.object({
    login: z.string().min(1, t("auth.loginRequired")),
    password: z.string().min(1, t("auth.passwordRequired")),
  });
  const { setAuth } = useAuth();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULTS,
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      setAuth(response.accessToken, response.login);
      // Redirect to dashboard after successful login
      navigate("/dashboard", { replace: true });
    } catch {
      // Error handling is done in the mutation's onError handler
      // setAuth is not called on error, so user stays logged out
    }
  };

  const handleFormFinish = async () => {
    // Use react-hook-form's handleSubmit which validates and provides correct values
    await handleSubmit(onSubmit)();
  };

  return (
    <Styled.Container>
      <Styled.FormWrapper>
        <Styled.Title>{t("auth.adminPanel")}</Styled.Title>
        <Form onFinish={handleFormFinish} layout="vertical" component="form">
          <Form.Item
            label={t("auth.login")}
            validateStatus={errors.login ? "error" : ""}
            help={errors.login?.message}
          >
            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder={t("auth.login")} />
              )}
            />
          </Form.Item>

          <Form.Item
            label={t("auth.password")}
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder={t("auth.password")} />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              block
            >
              {t("auth.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Styled.FormWrapper>
    </Styled.Container>
  );
}
