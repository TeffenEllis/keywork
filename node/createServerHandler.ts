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

import type { IncomingMessage, ServerResponse } from 'node:http'
import type { RequestRouter } from '../router/index.js'
import { respondWithRouter } from './respondWithRouter.js'

/**
 * Node-compatible callback for use with `http.createServer`
 */
export type ServerHandler = (req: IncomingMessage, res: ServerResponse) => void

/**
 * Given a `RequestRouter`, creates a Node-compatible server handler.
 *
 * ```ts
 * import * as http from 'node:http'
 * import { RequestRouter } from './router/index.js'
 * import { createServerHandler, applyNodeKeyworkPolyfills } from 'keywork'
 *
 * await applyNodeKeyworkPolyfills()
 *
 * const router = new RequestRouter()
 * http.createServer(createNodeServerHandler(router))
 * ```
 *
 * @see {respondWithRouter}
 * @beta Node support is currently experimental and may change in the near future.
 */
export function createNodeServerHandler<BoundAliases = {}>(router: RequestRouter<BoundAliases>): ServerHandler {
  return (req, res) => respondWithRouter<BoundAliases>(router, req, res)
}
