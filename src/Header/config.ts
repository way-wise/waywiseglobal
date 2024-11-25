import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { admins } from '@/access/admins'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: admins,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'logo_dark',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'callback',
      type: 'text',
      required: false,
    },
    {
      name: 'fixedTop',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sticky',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'scrollSticky',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'subNavItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 15,
        },
      ],
      maxRows: 10,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
