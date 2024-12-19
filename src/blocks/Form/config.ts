import type { Block } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../Banner/config'
import { SpacerBlock } from '../SpacerBlock/config'
import { CallToAction } from '../CallToAction/config'
import { MediaBlock } from '../MediaBlock/config'
import { HeadingBlock } from '../HeadingBlock/config'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'oneThird',
      options: [
        {
          label: 'One Third',
          value: 'oneThird',
        },
        {
          label: 'Half',
          value: 'half',
        },
        {
          label: 'Two Thirds',
          value: 'twoThirds',
        },
        {
          label: 'One Fourth',
          value: 'oneFourth',
        },
        {
          label: 'Three Fourths',
          value: 'threeFourths',
        },
        {
          label: 'Full',
          value: 'full',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'contentForm',
      options: [
        {
          label: 'Content + Form',
          value: 'contentForm',
        },
        {
          label: 'Form + Content',
          value: 'formContent',
        },
      ],
      admin: {
        description: 'Choose how to align the content for this block.',
        width: '50%',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({
              blocks: [Banner, SpacerBlock, CallToAction, MediaBlock, HeadingBlock],
            }),
          ]
        },
      }),
      label: 'Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
