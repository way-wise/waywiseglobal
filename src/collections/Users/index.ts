import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { admins } from '@/access/admins'
import { checkRole } from './checkRole'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    hidden: ({ user }) => !checkRole(['admin'], user as any),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Operation',
          value: 'operation',
        },
        {
          label: 'Customer',
          value: 'customer',
        },
      ],
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
}
