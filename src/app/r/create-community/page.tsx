"use client";

import { BackBtn } from "@components";
import { Button } from "@components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form/Form";
import { Input } from "@components/ui/form/Input";
import {
  createCommunitySchema,
  createCommunityValues,
} from "@lib/validators/forms/createCommunity";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useCreateCommunity from "@hooks/fetch-data/useCreateCommunity";

const CreateCommunity = () => {
  const form = useForm<createCommunityValues>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      title: "",
    },
  });

  const [conflictTitle, setConflictTitle] = useState<boolean>(false);
  const { data: session } = useSession();

  const { mutateAsync: createCommunity, isLoading } =
    useCreateCommunity(setConflictTitle);

  const onSubmit = async (values: createCommunityValues) => {
    await createCommunity({
      ...values,
      superAdmin: session?.user?._id as string,
    });
  };

  return (
    <section>
      <div className="container">
        <BackBtn />
        <article className="max-w-md mx-auto text-center mt-10 bg-white p-6 rounded-md drop-shadow-md">
          <header>
            <h2 className="font-bold text-xl">Create Community</h2>
          </header>

          {/* Form */}
          <Form {...form}>
            <form
              className="mt-6 text-start"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <div className="relative">
                      <span className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500">
                        /r
                      </span>
                      <FormControl>
                        <Input type="text" {...field} className="pl-8" />
                      </FormControl>
                    </div>
                    <FormMessage>
                      {conflictTitle &&
                        "Title is already exist. Try another one."}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-black hover:bg-black/80 mt-6 w-full"
                isLoading={isLoading}
              >
                Create
              </Button>
            </form>
          </Form>
        </article>
      </div>
    </section>
  );
};

export default CreateCommunity;
