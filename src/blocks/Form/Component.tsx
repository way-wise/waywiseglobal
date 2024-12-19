'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { FormBlock as FormBlockprops } from '@/payload-types'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { cn } from '@/utilities/cn'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  className: string
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
} & FormBlockprops

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    content,
    size = 'oneThird',
    className,
    alignment,
    position = 'default',
  } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
    oneFourth: '3',
    threeFourths: '9',
  }
  const colsSpanReverseClasses = {
    full: '12',
    half: '6',
    oneThird: '8',
    twoThirds: '4',
    oneFourth: '9',
    threeFourths: '3',
  }

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div
      className={cn(
        '',
        {
          container: position === 'default',
        },
        className,
      )}
    >
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        <div
          className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
            'md:col-span-2': size !== 'full',
            'order-first': alignment === 'formContent',
            'order-last': alignment === 'contentForm',
          })}
        >
          <FormProvider {...formMethods}>
            {enableIntro && introContent && !hasSubmitted && (
              <RichText className="mb-8" content={introContent} enableGutter={false} />
            )}
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText content={confirmationMessage} />
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap justify-between space-y-4 mb-6 last:mb-0">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType]
                      if (Field) {
                        return (
                          <Field
                            key={index}
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        )
                      }
                      return null
                    })}
                </div>

                <Button form={formID} type="submit" variant="default">
                  {submitButtonLabel}
                </Button>
              </form>
            )}
          </FormProvider>
        </div>
        <div
          className={cn(`col-span-4 lg:col-span-${colsSpanReverseClasses[size!]}`, {
            'md:col-span-2': size !== 'full',
          })}
        >
          {content && <RichText className="mb-8" content={content} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
