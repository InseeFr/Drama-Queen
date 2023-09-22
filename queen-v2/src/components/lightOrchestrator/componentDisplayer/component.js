import * as lunatic from '@inseefr/lunatic';

import { useCustomLunaticStyles } from 'components/orchestrator/lunaticStyle/style';

export const ComponentDisplayer = ({ components, readonly, pageTag }) => {
  const lunaticClasses = useCustomLunaticStyles();
  return (
    <>
      <lunatic.LunaticComponents
        components={components}
        componentProps={() => ({
          filterDescription: false,
          disabled: readonly,
          readOnly: readonly,
          shortcut: true,
        })}
        wrapper={({ children, id, componentType }) => (
          <div className={`${lunaticClasses.lunatic} ${componentType}`} key={`component-${id}`}>
            {children}
          </div>
        )}
      />{' '}
    </>
  );
};
