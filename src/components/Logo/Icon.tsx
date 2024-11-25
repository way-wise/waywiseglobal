import React from 'react'
import { Media } from '../Media';
import { getCachedGlobal } from '@/utilities/getGlobals'

const Icon: React.FC = async () => {
  { /* @ts-expect-error */  }
  const header: Header = await getCachedGlobal('header', 1)();
  const icon = header?.icon;
  return icon && (
      <Media
        resource={icon}
        className="w-[18px] h-[18px]"
      />
    )
}

export default Icon
