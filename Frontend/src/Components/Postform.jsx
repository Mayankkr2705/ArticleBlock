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
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="w-full lg:w-2/3 px-2 space-y-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={post?.content} />
      </div>
      <div className="w-full lg:w-1/3 px-2 space-y-4 mt-4 lg:mt-0">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && post.image && (
          <div className="w-full mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={[{value: "active", label: "Active"}, {value: "inactive", label: "Inactive"}]}
          label="Status :"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;
