"use client";

import { Button } from "@components/ui/Button";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import useCreatePost from "@hooks/fetch-data/useCreatePost";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostFormValues,
  PostPayload,
  postFormValidator,
} from "@lib/validators/post";

// Types
interface props {
  community: CommunityResponse | null;
}

const AppEditor: FC<props> = ({ community }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const uploader = (await import("@ajite/editorjs-image-base64")).default;
    const LinkTool = (await import("@editorjs/link")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        inlineToolbar: true,
        onReady() {
          editorRef.current = editor;
          titleRef.current?.focus();
        },
        tools: {
          header: Header,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              uploader,
            },
          },
          link: {
            class: LinkTool,
            config: {
              endpoint: "/api/v1/editor-link",
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    initEditor();
  }, []);

  const { mutateAsync: createPost } = useCreatePost();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormValidator),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: PostFormValues) => {
    const blocks = await editorRef.current?.save();
    const postPayload: PostPayload = {
      title: values.title,
      content: blocks,
      community: community?._id as string,
    };

    console.log(postPayload);

    await createPost(postPayload);
  };

  const { ref: regTitleRef, ...rest } = register("title");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <TextareaAutosize
          className="w-full p-2 resize-none"
          ref={(element) => {
            titleRef.current = element;
            regTitleRef(element);
          }}
          {...rest}
        />
        {errors?.title && (
          <p className="text-red-500 text-sm">{errors?.title?.message}</p>
        )}
      </div>

      {/* Rich Editor */}
      <div>
        <label className="block mb-2">Content</label>
        <div id="editor" className="bg-white" />
      </div>

      <Button type="submit" className="block mx-auto mt-6">
        Create Post
      </Button>
    </form>
  );
};

export default AppEditor;
