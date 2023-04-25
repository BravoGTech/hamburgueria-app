import { z } from "zod";
import {
  ResponseCreateUserSchema,
  createFullUserSchema,
  createUserSchema,
} from "../schemas/users.schemas";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IUserContextData {
  createUser: UseMutateFunction<
    IResponseCreateUser,
    any,
    ICreateUserMutation,
    unknown
  >;
}

export type ICreateUser = z.infer<typeof createUserSchema>;

export type ICreateUserData = z.infer<typeof createFullUserSchema>;

export interface ICreateUserMutation {
  data: ICreateUserData;
}

export type IResponseCreateUser = z.infer<typeof ResponseCreateUserSchema>;
