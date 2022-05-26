/**
 * @file This file is part of the Keywork project.
 * @copyright Nirrius, LLC. All rights reserved.
 * @author Teffen Ellis, et al.
 * @license AGPL-3.0
 *
 * @remark Keywork is free software for non-commercial purposes.
 * You can be released from the requirements of the license by purchasing a commercial license.
 * Buying such a license is mandatory as soon as you develop commercial activities
 * involving the Keywork software without disclosing the source code of your own applications.
 *
 * @see LICENSE.md in the project root for further licensing information.
 */

export const JavaScript = {
  extension: 'js',
  mimeType: 'application/javascript; charset=utf-8',
} as const

export const JavaScriptModule = {
  extension: 'mjs',
  mimeType: 'application/javascript; charset=utf-8',
} as const

export const JSON = {
  extension: 'json',
  mimeType: 'application/json; charset=utf-8',
} as const

export const JSONLinkedData = {
  extension: 'jsonld',
  mimeType: 'application/json+ld; charset=utf-8',
} as const

export const JSONWebManifest = {
  extension: 'webmanifest',
  mimeType: 'application/manifest+json',
}
