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

import { CacheControlDirectives } from '../headers/cacheControl.js'
import { fileExtensionToContentTypeHeader } from '../headers/contentType.js'
import { CachableResponse } from './CachableResponse.js'

/**
 * A cachable request containing HTML content.
 * @category HTTP Responses
 */
export class HTMLResponse extends CachableResponse {
  constructor(
    /** A string containing a full HTML document, or a readable stream. */
    htmlContent: string | ReadableStream,
    /** An optional request to check for etag headers. */
    request?: Request,
    /** An optional etag for the given `json` parameter. */
    etag?: string,
    /** Options to generate a cache control header. */
    cacheControlOptions?: CacheControlDirectives,
    /** Headers to add to the response. */
    headersInit?: HeadersInit
  ) {
    super(htmlContent, request, etag, cacheControlOptions, {
      ...fileExtensionToContentTypeHeader('html'),
      ...headersInit,
    })
  }
}
