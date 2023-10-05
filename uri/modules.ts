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

import { KeyworkResourceError } from 'keywork'
import { isValidElement } from 'react'
import type { RoutePatternEntries, RoutePatternsProps } from './URLPatternRouteMap.js'

export interface KeyworkClientModule {
  default: React.ReactElement<RoutePatternsProps>
}

export function isKeyworkClientModule(module: any): module is KeyworkClientModule {
  return module && typeof module === 'object' && isKeyworkClientModuleDefault(module.default)
}

export function isKeyworkClientModuleDefault(
  moduleExport: any
): moduleExport is React.ReactElement<RoutePatternsProps> {
  return isValidElement<RoutePatternsProps>(moduleExport)
}

export type ClientModuleInput = React.ReactElement<RoutePatternsProps> | KeyworkClientModule

export function pluckClientModuleRoutes(moduleLike: any): RoutePatternEntries {
  if (isKeyworkClientModuleDefault(moduleLike)) {
    return moduleLike.props.routes
  }

  if (isKeyworkClientModule(moduleLike)) {
    return pluckClientModuleRoutes(moduleLike.default)
  }

  throw new KeyworkResourceError("Cannot pluck routes from module. It doesn't appear to be a Keywork client module.")
}
