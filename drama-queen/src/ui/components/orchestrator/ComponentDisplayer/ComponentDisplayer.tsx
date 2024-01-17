import * as lunatic from '@inseefr/lunatic'
import { useLunaticStyles } from './lunaticStyle'
import { FilledLunaticComponentProps } from '@inseefr/lunatic/lib/src/use-lunatic/commons/fill-components/fill-components'
import { ReactElement } from 'react'

type ComponentDisplayerProps = {
  components: unknown
  features: lunatic.LunaticState['features']
  readonly: boolean
  savingType: lunatic.LunaticState['savingType']
}

export function ComponentDisplayer(props: ComponentDisplayerProps) {
  const { components, features, readonly, savingType } = props
  const { classes } = useLunaticStyles()

  return (
    <>
      {components.map(function (component) {
        console.log(component)
        const { id, componentType, response, storeName, ...other } = component
        const Component = lunatic[componentType]
        return (
          <div
            className={`${classes.lunatic} ${componentType}`}
            key={`component-${id}`}
          >
            <Component
              id={id}
              response={response}
              {...other}
              {...component}
              labelPosition="TOP"
              unitPosition="AFTER"
              features={features}
              writable
              readOnly={readonly}
              disabled={readonly}
              savingType={savingType}
              shortcut={true}
            />
          </div>
        )
      })}
    </>
  )
}
