import { z } from "zod";
import {
  ResponseCreateUserSchema,
  createFullUserSchema,
  createUserSchema,
  listUserDetailsSchema,
} from "../schemas/users.schemas";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IUserContextData {
  createUser: UseMutateFunction<
    IResponseCreateUser,
    any,
    ICreateUserMutation,
    unknown
  >;
  listUserDetail: UseMutateFunction<IListUserDetails, any, string, unknown>;
  userDetails: IListUserDetails;
}

export type ICreateUser = z.infer<typeof createUserSchema>;

export type ICreateUserData = z.infer<typeof createFullUserSchema>;

export interface ICreateUserMutation {
  data: ICreateUserData;
}

export type IResponseCreateUser = z.infer<typeof ResponseCreateUserSchema>;

export type IListUserDetails = z.infer<typeof listUserDetailsSchema>;
