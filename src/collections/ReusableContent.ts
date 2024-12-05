import type { CollectionConfig } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { admins } from '@/access/admins'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaContentSection } from '@/blocks/MediaContentSection/config'
import { ServiceSection } from '@/blocks/ServiceSection/config'
import { MediaSection } from '@/blocks/MediaSection/config'
import { FeatureSection } from '@/blocks/FeatureSection/config'
import { MapEmbed } from '@/blocks/MapEmbed/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { BreadcrumbBlock } from '@/blocks/BreadcrumbBlock/config'
import { PricingBlock } from '@/blocks/PricingBlock/config'
import { TeamBlock } from '@/blocks/TeamBlock/config'
import { TestimonialBlock } from '@/blocks/TestimonialBlock/config'
import { HeadingBlock } from '@/blocks/HeadingBlock/config'
import { SpacerBlock } from '@/blocks/SpacerBlock/config'
import { Code } from '@/blocks/Code/config'
import { Content } from '@/blocks/Content/config'

export const ReusableContent: CollectionConfig = {
  slug: 'reusable-content',
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    readVersions: admins,
    update: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Banner,
        Code,
        Content,
        MediaBlock,
        Archive,
        FormBlock,
        MediaContentSection,
        ServiceSection,
        MediaSection,
        FeatureSection,
        MapEmbed,
        FaqBlock,
        BreadcrumbBlock,
        PricingBlock,
        TeamBlock,
        TestimonialBlock,
        HeadingBlock,
        SpacerBlock
      ],
      required: true,
    },
  ],
  labels: {
    plural: 'Reusable Contents',
    singular: 'Reusable Content',
  },
}
