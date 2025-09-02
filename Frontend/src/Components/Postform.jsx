import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button  from "./Button";
import Input  from "./Input";
import Select  from "./Select";
import RTE  from "./RTE";
import service from "../api/posts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0] || null;
      const dbPost = await service.updatePost(post.slug || post.$id, {
        title: data.title,
        content: data.content,
        status: data.status,
        featuredImage: post.featuredImage,
        image: file,
      });
      if (dbPost) navigate(`/post/${dbPost.slug || dbPost._id}`);
    } else {
      const file = data.image?.[0] || null;
      const dbPost = await service.createPost({
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        userId: userData?._id || userData?.$id,
        image: file,
      });
      if (dbPost) navigate(`/post/${dbPost.slug || dbPost._id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input label="Title" {...register("title", { required: true })} />
      <Input label="Slug" {...register("slug", { required: true })} />
      <RTE name="content" control={control} defaultValue={post?.content} />
      <Select
        label="Status"
        options={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        {...register("status", { required: true })}
      />
      <Input type="file" label="Featured Image" accept="image/*" {...register("image")} />
      <Button type="submit">{post ? "Update" : "Create"} Post</Button>
    </form>
  );
}

export default Postform;
