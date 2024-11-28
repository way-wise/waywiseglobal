import type { CollectionConfig } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { BlogContent } from '@/blocks/BlogContent/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Callout } from '@/blocks/Callout/config'
import { CardGrid } from '@/blocks/CardGrid/config'
import { Code } from '@/blocks/Code/config'
import { CodeFeature } from '@/blocks/CodeFeature/config'
import { Content } from '@/blocks/Content/config'
import { ContentGrid } from '@/blocks/ContentGrid/config'
import { HoverHighlights } from '@/blocks/HoverHighlights/config'
import { LogoGrid } from '@/blocks/LogoGrid/config'
import { MediaContentAccordion } from '@/blocks/MediaContentAccordion/config'
import { Slider } from '@/blocks/Slider/config'
import { Statement } from '@/blocks/Statement/config'
import { Steps } from '@/blocks/Steps'
import { StickyHighlights } from '@/blocks/StickyHighlights/config'
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
        BlogContent,
        Callout,
        CallToAction,
        CardGrid,
        Code,
        CodeFeature,
        ContentGrid,
        HoverHighlights,
        LogoGrid,
        MediaContentAccordion,
        Slider,
        Statement,
        Steps,
        StickyHighlights,
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
