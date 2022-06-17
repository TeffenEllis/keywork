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

import { StatusCodes } from 'http-status-codes'
import { KeyworkRequestHandler } from './KeyworkRequestHandler.js'

/**
 * A higher-order function for redirecting requests via `KeyworkRequestHandler`.
 *
 * @returns The incoming request handler.
 *
 * @example
 * Creating a Worker that just redirects incoming requests.
 *
 * ```ts
 * const redirectToExample = new RedirectHandler('https://example.com')
 *
 * export default redirectToExample
 * ```
 *
 * @category Incoming Request Handlers
 * @public
 */
export class RedirectHandler extends KeyworkRequestHandler {
  constructor(
    /** URL A url-like string or URL object */
    public destinationURL: string | URL,
    /** An optional status code. Defaults to `302` */
    public statusCode: number = StatusCodes.MOVED_TEMPORARILY
  ) {
    super()
  }

  public onRequest: PagesFunction = ({ request }) => {
    this.logger.info(`Redirect from ${request.url} to ${this.destinationURL.toString()}`)

    return Response.redirect(this.destinationURL.toString(), this.statusCode)
  }
}
