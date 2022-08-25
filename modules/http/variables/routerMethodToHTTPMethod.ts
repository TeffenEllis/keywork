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

import { HTTPMethod } from '../types/HTTPMethod.ts'
import { RouterMethod } from '../types/RouterMethod.ts'
import { methodVerbToRouterMethod } from './methodVerbToRouterMethod.ts'

/**
 * Given a standardized uppercase method verb such as `GET`, return the normalized form.
 */
export const routerMethodToHTTPMethod = new Map<RouterMethod, HTTPMethod>(
  Array.from(methodVerbToRouterMethod.entries(), ([httpMethod, routerMethod]) => {
    return [routerMethod, httpMethod]
  })
)
