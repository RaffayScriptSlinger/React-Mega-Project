import React, { useCallback, useEffect } from 'react'
import { RITE, Button, Input, Select } from '../index'
import appwriteService from '../../appwrite/databaseConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function postForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector(state.user.userData)
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      status: post?.status || "",
    }
  })
  const submit = async (data) => {
    if (post) {
      const file = await appwriteService.uploadFile(data.image[0]) || null

      if (file) {
        appwriteService.deleteFile(post.featureImage)
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data, featureImage: file ? file.$id : undefined,
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await appwriteService.uploadFile(data.image ? data.image[0] : null)

      if (file) {
        const fileId = file.$id
        data.featureImage = fileId

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      setValue("slug", slug)
      return slug
      // return value
      // .trim()
      // .toLowerCase()
      // .replace(/[^a-zA-Z/d/s]+/g, "-")
      // .replace(/\s\g,`-`)

    }
    return " "

  }, [])

  useEffect(() => {
    const subscribtion = watch((value, { name }) => {
      if (name === "title") {
        setValue("Slug", slugTransform(value.title, { shouldValidate: true }))

      }
    })

    return () => {
      subscribtion.unsubscribe()
    }

  }, [watch, slugTransform, setValue])



  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
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
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>

    </div>
  )
}

export default postForm