import type { Block } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { blockFields } from '@/fields/blockFields'
import richText from '@/fields/richText'
import { linkGroup } from '@/fields/linkGroup'

export const ContentGrid: Block = {
  slug: 'contentGrid',
  fields: [
    blockFields({
      name: 'contentGridFields',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'style',
              type: 'select',
              defaultValue: 'gridBelow',
              label: 'Style',
              options: [
                { label: 'Grid Below', value: 'gridBelow' },
                { label: 'Side by Side', value: 'sideBySide' },
              ],
            },
            {
              name: 'showNumbers',
              type: 'checkbox',
            },
          ],
        },
        richText({
          name: 'content',
          label: 'Content',
          required: false,
        }),
        linkGroup({
          appearances: false,
          overrides: {},
        }),
        {
          name: 'cells',
          type: 'array',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => rootFeatures,
              }),
              required: true,
            },
          ],
          maxRows: 8,
          minRows: 1,
        },
      ],
    }),
  ],
}
