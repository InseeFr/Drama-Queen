import * as lunatic from '@inseefr/lunatic'
import { useLunaticStyles } from './lunaticStyle'

export function ComponentDisplayer({
  components,
  features,
  readonly,
  savingType,
}) {
  const { classes } = useLunaticStyles()
  return (
    <>
      {components.map(function (component) {
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
