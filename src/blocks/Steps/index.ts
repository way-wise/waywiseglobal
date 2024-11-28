import type { Block } from 'payload'

import { blockFields } from '../../fields/blockFields'
import { CodeFeature } from '../CodeFeature/config'
import { HoverHighlights } from '../HoverHighlights/config'
import { StickyHighlights } from '../StickyHighlights/config'
import { Content } from '../Content/config'

export const Steps: Block = {
  slug: 'steps',
  labels: {
    singular: 'Steps Block',
    plural: 'Steps Blocks',
  },
  fields: [
    blockFields({
      name: 'stepsFields',
      fields: [
        {
          name: 'steps',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CodeFeature, Content, HoverHighlights, StickyHighlights],
            },
          ],
        },
      ],
    }),
  ],
}
