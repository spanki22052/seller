import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface CurrentAdmin {
  id: string;
  login: string;
}

export const CurrentAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentAdmin => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
