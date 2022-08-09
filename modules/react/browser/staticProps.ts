/**
 * @file This file is part of the Keywork project.
 * @copyright Nirrius, LLC. All rights reserved.
 * @author Teffen Ellis, et al.
 * @license AGPL-3.0
 *
 * @remarks Keywork is free software for non-commercial purposes.
 * You can be released from the requirements of the license by purchasing a commercial license.
 * Buying such a license is mandatory as soon as you develop commercial activities
 * involving the Keywork software without disclosing the source code of your own applications.
 *
 * @see LICENSE.md in the project root for further licensing information.
 */

import { KeyworkResourceError } from '../../errors/mod.ts'
import { globalScopeSSRKey, GlobalScopeWithKeyworkSSRProps, SSRPropsLike } from '../isomorphic/mod.ts'

export function globalScopeHasSSRProps<SSRProps extends SSRPropsLike>(
  globalScope: unknown
): globalScope is GlobalScopeWithKeyworkSSRProps<SSRProps> {
  return Boolean(globalScope && globalScopeSSRKey in (globalScope as any))
}

/**
 *
 * @param globalScope In most cases, this is either `window` or `self`.
 * @returns SSRProps
 */
export function getSSRPropsFromScope<SSRProps extends SSRPropsLike>(globalScope: unknown): SSRProps {
  if (!globalScopeHasSSRProps<SSRProps>(globalScope)) {
    console.error(`Looking for ${globalScopeSSRKey} in scope:`, globalScope)
    throw new KeyworkResourceError('SSR props not in provided scope.')
  }

  const staticProps = globalScope[globalScopeSSRKey]

  if (typeof staticProps === 'undefined') {
    throw new KeyworkResourceError(
      'SSR Props is empty. To indicate there are no props, return null from `getStaticProps`'
    )
  }

  globalScope[globalScopeSSRKey] = null as any

  if (globalScope.document) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(globalScope.document as any)?.getElementById(globalScopeSSRKey)?.remove()
  }

  return staticProps
}
