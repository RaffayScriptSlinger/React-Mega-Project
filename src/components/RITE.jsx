import React from 'react'
import { Editor } from 'tinymce'
import { Controller } from 'react-hook-form'

export default function RITE({ name, label, control, defaultValue = "" }) {
    return (
        <Controller
            name={name || "Content"}
            label ={label || "Content"}
            control={control}
            render={({ field: { onChange } }) => (
                <Editor
                    initialValue="default Value"
                    init={
                        {
                            branding: false,
                            height: "500",
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_Style: "body {font-family: Arail }"

                        }
                    }
                    onEditorChange={onChange}
                />
            )}
        >
        </Controller>
    )
}

