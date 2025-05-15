"use client";

import CustomButton from "@/components/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電子郵件地址" }),
  password: z.string().min(8, { message: "密碼必須至少包含8個字符" }),
});

const LoginClientPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "terryhycheng@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success("登入成功");
    form.reset();
    router.push("/admin/manage-resources");
  };

  return (
    <main className="bg-photo relative flex flex-1 items-center justify-center">
      <div className="flex w-full max-w-xl flex-col rounded-xl bg-white/60 p-10">
        <h1 className="mb-10 text-center text-5xl tracking-[0.5rem]">
          評審登入
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電郵地址</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomButton
              text="登入"
              colour="var(--main-color)"
              icons={{ IconRight: ArrowRightIcon }}
              isWhiteText
              className="w-full"
            />
          </form>
        </Form>
        <Link href="/" className="font-kiwimaru mx-auto mt-4 w-fit underline">
          返回主頁
        </Link>
      </div>
    </main>
  );
};

export default LoginClientPage;
