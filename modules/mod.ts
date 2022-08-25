/**
 * Keywork is a modular and opinionated library,
 * providing structured guidence as your web app grows,
 * without locking you into a specific pattern.
 *
 * Features are categorized into modules that can be imported directly:
 *
 * ```ts title="worker.ts" runtime="cloudflare"
 * // highlight-next-line
 * import { KeyworkRouter } from 'keywork/router'
 *
 * const app = new KeyworkRouter()
 *
 * app.get('/', () => 'Hello there! 👋')
 *
 * export default app
 * ```
 *
 * ```ts title="./your-project/server/mod.tsx" runtime="deno"
 * // highlight-next-line
 * import { KeyworkRouter } from 'https://deno.land/x/keywork/modules/router/mod.ts'
 * import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
 *
 * const app = new KeyworkRouter()
 * serve((request) => app.fetch(request))
 * ```
 *
 * ```ts title="worker.ts" runtime="browser"
 * // highlight-next-line
 * import { KeyworkRouter } from 'https://esm.sh/keywork/router'
 *
 * const app = new KeyworkRouter()
 *
 * app.get('/', () => 'Hello there! 👋')
 * ```
 *
 * ::: tip
 *
 * While Keywork has many modules,
 * modern bundlers and transpilers such as [ESBuild](https://esbuild.github.io/)
 * will intelligently bundle only the Keywork modules you include in your web app.
 *
 * A full list of Keywork's modules are available in the navigation menu, however
 * the most popular are shown below.
 *
 * :::
 *
 * @packageDocumentation
 * @module Keywork
 *
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

/* eslint-disable header/header */

/**
 * Whether you're handling errors in your V8 Worker, Node.JS, or even the browser,
 * Keywork includes error utilities that pair nicely with HTTP requests.
 *
 * ```ts runtime="node"
 * import { KeyworkResourceError, StatusCodes } from 'keywork/errors'
 *
 * if (isLoggedIn(someUser)) {
 *   throw new KeyworkResourceError("You must be logged in to do that", StatusCodes.UNAUTHORIZED)
 * }
 * ```
 *
 * ```ts runtime="browser"
 * let { KeyworkResourceError, StatusCodes } = await import('https://esm.sh/keywork/errors')
 *
 * if (isLoggedIn(someUser)) {
 *   throw new KeyworkResourceError("You must be logged in to do that", StatusCodes.UNAUTHORIZED)
 * }
 * ```
 *
 * {@link Keywork#Errors **_Explore the Errors Module_ ›**}
 */
export * as Errors from './errors/mod.ts'
//
export * as Events from './events/mod.ts'
//
/**
 * Keywork includes utilities for working with files,
 * such as determining the MIME type while handling an incoming HTTP request.
 *
 * ```ts
 * import { FileUtils } from 'keywork'
 * import * as FileUtils 'keywork/files'
 * ```
 *
 * {@link Keywork#FileUtils **_Explore the File Utilities Module_ ›**}
 */
export * as FileUtils from './files/mod.ts'
//
/**
 * Keywork includes utilities for working with incoming HTTP requests,
 * and extends the native [`Request` class](https://developer.mozilla.org/en-US/docs/Web/API/Request)
 * for use with [Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/request/#requestinitcfproperties)
 *
 * See each of HTTP's submodules for additional details.
 *
 * ```ts
 * import { CachableResponse, ErrorResponse, isRedirection, ...etc } from 'keywork/http'
 * ```
 *
 * {@link Keywork#HTTP **_Explore the HTTP Module_ ›**}
 */
export * as HTTP from './http/mod.ts'
export * as IDUtils from './ids/mod.ts'
//
/**
 * Keywork includes an isomorphic logger available in both browser and worker environments.
 *
 * ```ts
 * import * as mod from 'keywork/logger'
 * const logger = new Logger('Todo API')
 *
 * logger.info('Fetching todo', todoID)
 * logger.error('Unexpected error')
 * ```
 *
 * {@link Keywork#Logger **_Explore the Logger Module_ ›**}
 */
export * as Logger from './logger/mod.ts'
//
/**
 * While optional, Keywork uses React as its primary HTML templating engine.
 *
 * {@link Keywork#ReactUtils **_Explore the React Utilities Module_ ›**}
 */
export * as ReactUtils from './react/mod.ts'
//
/**
 * Designed with familiarity in mind, the server-side routing API
 * is inspired by Express.js, React Router, and the native Cloudflare Workers platform.
 *
 * {@link Keywork#Router **_Explore the Router Module_ ›**}
 *
 * ```ts title="worker.ts" runtime="cloudflare"
 * import { KeyworkRouter } from 'keywork/router'
 *
 * const app = new KeyworkRouter()
 *
 * app.get('/', () => 'Hello there! 👋')
 *
 * export default app
 * ```
 *
 * ```ts title="./your-project/server/mod.tsx" runtime="deno"
 * import { KeyworkRouter } from 'https://deno.land/x/keywork/modules/router/mod.ts'
 * import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
 *
 * const app = new KeyworkRouter()
 * serve((request) => app.fetch(request))
 * ```
 *
 * ```ts title="worker.ts" runtime="browser"
 * import { KeyworkRouter } from 'https://esm.sh/keywork/router'
 *
 * const app = new KeyworkRouter()
 *
 * app.get('/', () => 'Hello there! 👋')
 * ```
 */
export * as Router from './router/mod.ts'
//
/**
 * ```ts
 * import { Session } from 'keywork'
 * import * as Sessionfrom 'keywork/session'
 * ```
 *
 * {@link Keywork#Session **_Explore the Session Module_ ›**}
 */
export * as Session from './session/mod.ts'
//
/**
 * ```ts
 * import {arrayBufferToString, arrayBufferToBase64, ...etc} from 'keywork/strings'
 * ```
 *
 * {@link Keywork#StringUtils **_Explore the String Utilities Module_ ›**}
 */
export * as StringUtils from './strings/mod.ts'
//
/**
 * ```ts
 * import { TimerUtils } from 'keywork'
 * import * as mod from 'keywork/browser/timers'
 * ```
 *
 * {@link Keywork#TimerUtils#Browser **_Explore the Timer Utilities Module_ ›**}
 */
export * as TimerUtils from './timers/browser/mod.ts'
//
/**
 * Keywork uses JavaScript's built-in [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) to create pattern matchers.
 * The syntax is based on [path-to-regexp](https://github.com/pillarjs/path-to-regexp).
 * Wildcards, named capture groups, regular groups, and group modifiers are all supported.
 *
 * ```ts
 * import { URIUtils } from 'keywork'
 * import * as mod 'keywork/uri'
 * ```
 *
 * {@link Keywork#URIUtils **_Explore the URI Module_ ›**}
 */
export * as URIUtils from './uri/mod.ts'
