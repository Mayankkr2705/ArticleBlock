import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import { useNavigate } from "react-router-dom";
import { updateArticle,createArticle } from "../api/api";



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
  const submit = async (data) => {
    try {
      let dbPost;
      
      if (post) {
        const file = data.image?.[0] || null;
        const response = await updateArticle(post.slug || post.$id, {
          ...data,
          image: file,
        });
        dbPost = response.data;

        if (dbPost) navigate(`/article/${dbPost.slug}`);
      } else {
  
        const file = data.image?.[0] || null;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        const response = await createArticle({
          ...data,
          ownerId: user._id || user.$id, 
          image: file,
        });
        dbPost = response.data;

        if (dbPost) navigate(`/article/${dbPost.slug}`);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
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
