import * as lunatic from '@inseefr/lunatic';

import { useCustomLunaticStyles } from 'components/lightOrchestrator/lunaticStyle/style';

export const ComponentDisplayer = ({ components, readonly, pageTag }) => {
  const lunaticClasses = useCustomLunaticStyles();
  return (
    <lunatic.LunaticComponents
      autoFocusKey={pageTag}
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
    />
  );
};
