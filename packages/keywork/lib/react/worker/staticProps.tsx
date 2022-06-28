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

import { convertJSONToETaggableString, generateETag } from 'keywork/caching'
import { getBrowserIdentifier } from 'keywork/headers'
import { ErrorResponse, HTMLResponse, JSONResponse } from 'keywork/responses'

import { RouteProvider, SSRPropsLike, StaticPropsProvider } from 'keywork/react/common'
import type { FC } from 'react'
import { IncomingRequestEvent } from '../../routing/common.js'
import { KeyworkHTMLDocument, KeyworkHTMLDocumentComponent } from './KeyworkHTMLDocument.js'
import { KeyworkProviders, KeyworkProvidersComponent } from './KeyworkProvidersComponent.js'
import { _SSRPropsEmbed } from './SSRPropsEmbed.js'
import { ReactRenderStreamResult, renderReactStream } from './stream.js'

export async function renderStaticPropsAsJSON(
  request: Request,
  staticProps: NonNullable<SSRPropsLike>
): Promise<Response> {
  const etag = await generateETag(convertJSONToETaggableString(staticProps))

  return new JSONResponse(staticProps, request, etag)
}

export async function renderStaticPropsAsComponentStream<StaticProps extends NonNullable<SSRPropsLike>>(
  context: IncomingRequestEvent<any, any, any>,
  staticProps: StaticProps,
  /** The React component to render for this specific page. */
  PageComponent: FC<StaticProps>,
  DocumentComponent?: KeyworkHTMLDocumentComponent,
  Providers?: KeyworkProvidersComponent
): Promise<Response> {
  const location = new URL(context.request.url)

  const browserIdentifier = getBrowserIdentifier(context.request)
  DocumentComponent = DocumentComponent || KeyworkHTMLDocument
  Providers = Providers || KeyworkProviders

  const appDocument = (
    <StaticPropsProvider staticProps={staticProps}>
      <RouteProvider initialLocation={location}>
        <Providers>
          <DocumentComponent browserIdentifier={browserIdentifier} location={location}>
            <PageComponent {...staticProps} />

            <_SSRPropsEmbed staticProps={staticProps} />
          </DocumentComponent>
        </Providers>
      </RouteProvider>
    </StaticPropsProvider>
  )

  let result: ReactRenderStreamResult

  try {
    result = await renderReactStream(appDocument)
  } catch (error) {
    console.error(error)

    // TODO: render some fallback HTML.
    return ErrorResponse.fromUnknownError(error, 'An error occured during rendering...')
  }

  if (result.error) {
    // TODO: render some fallback HTML.
    return ErrorResponse.fromUnknownError(result.error, 'An error occured during rendering...')
  }

  return new HTMLResponse(result.stream)
}
