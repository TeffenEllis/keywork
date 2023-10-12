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

import { FetchEventProvider, IsomorphicFetchEvent } from 'keywork/events'
import { ImportMap } from 'keywork/files'
import { PageElementComponent } from 'keywork/http'
import { KeyworkLogger } from 'keywork/logging'
import { KeyworkHTMLDocument, KeyworkHTMLDocumentComponent } from './KeyworkHTMLDocument.js'
import { KeyworkProviders, KeyworkProvidersComponent } from './KeyworkProvidersComponent.js'
import { KeyworkSSREmbed } from './KeyworkSSREmbed.js'

export interface RequestDocumentOverrideProps {
  /**
   * A HTML Document React component which wraps the entire application.
   * Use this if you need to replace the default HTML Document.
   */
  DocumentComponent?: KeyworkHTMLDocumentComponent
  /**
   * A React component which wraps the SSR routes.
   * Use this if you need to inject a provider into the SSR pipeline.
   */
  Providers?: KeyworkProvidersComponent

  logger?: KeyworkLogger
}

export interface RequestDocumentProps extends RequestDocumentOverrideProps {
  event: IsomorphicFetchEvent<any, any, any>
  importMap?: ImportMap
  pageElement: PageElementComponent
}

/**
 * @internal
 */
export const RequestDocument: React.FC<RequestDocumentProps> = ({
  pageElement,
  logger = new KeyworkLogger('Keywork SSR'),
  DocumentComponent = KeyworkHTMLDocument,
  Providers = KeyworkProviders,
  event,
  importMap,
}) => {
  const staticProps = pageElement.props

  const appDocument = (
    <FetchEventProvider event={event} logger={logger}>
      <Providers>
        <DocumentComponent event={event} importMap={importMap}>
          {pageElement}
          <KeyworkSSREmbed eventInit={event.toJSON()} staticProps={staticProps} />
        </DocumentComponent>
      </Providers>
    </FetchEventProvider>
  )

  return appDocument
}
