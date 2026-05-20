import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'
import {apiVersion, dataset, projectId} from './env'
import {structure} from './lib/structure'
import {createPublishWithReadingTimeAction} from './lib/publish-with-reading-time-action'
import {AutoTranslateEnToZhAction, AutoTranslateZhToEnAction} from './lib/auto-translate-action'

export default defineConfig({
  name: 'default',
  title: 'antxz',

  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      const withPublishReadingTime =
        context.schemaType === 'post'
          ? prev.map((originalAction) =>
              originalAction.action === 'publish'
                ? createPublishWithReadingTimeAction(originalAction)
                : originalAction,
            )
          : prev

      if (context.schemaType === 'post' || context.schemaType === 'aboutMe') {
        return [...withPublishReadingTime, AutoTranslateEnToZhAction, AutoTranslateZhToEnAction]
      }

      return withPublishReadingTime
    },
  },
  plugins: [structureTool({structure}), visionTool({defaultApiVersion: apiVersion}), codeInput()],
})
