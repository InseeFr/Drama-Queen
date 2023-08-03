import { memo, useEffect, useState } from 'react';
import { useStyles } from './component.style';
import { Panel } from './panel';

const LoopPanelNotMemo = ({ loopVariables = [], getData, pager, goToPage }) => {
  const noLoopVariables = loopVariables.length === 0 || loopVariables[0] === undefined;

  const classes = useStyles();

  const [datas, setDatas] = useState(null);

  const {
    page: currentPage,
    subPage: currentSubPage,
    iteration: currentIteration,
    lastReachedPage,
  } = pager;

  useEffect(() => {
    if (!noLoopVariables) setDatas(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noLoopVariables, loopVariables]);

  if (noLoopVariables) return null;

  // use page to select loopVariables depth
  const depth = 0;
  const targetVariable = loopVariables[depth];
  const targetData = datas?.COLLECTED[targetVariable];
  const COLLECTED = targetData?.COLLECTED;
  if (COLLECTED && (COLLECTED.length === 0 || COLLECTED[0] === null)) return null;

  // get max page/subPage/iteration from lastReachedPage :
  // handle subPage/iteration starting from 1 in lastReachedPage while starting from 0 in pager
  const maxPage = parseInt(lastReachedPage.split('.')[0], 10);
  const maxSubPage = parseInt(lastReachedPage.split('.')[1], 10) - 1;
  const maxIteration = parseInt(lastReachedPage.split('#')[1], 10) - 1;
  const isReached = iteration => {
    if (currentPage < maxPage) return true;
    // same page => check subPage
    if (currentSubPage < maxSubPage) return true;
    // same subPage => check iteration
    return iteration < maxIteration;
  };
  return (
    <div className={classes.loops}>
      {COLLECTED?.map((value, index) => {
        return (
          <Panel
            key={`panel-${index}`}
            value={value?.toUpperCase() ?? ''}
            current={currentIteration === index}
            reachable={isReached(index)}
            onClick={() =>
              goToPage({
                page: currentPage,
                iteration: index,
                subPage: currentSubPage,
              })
            }
          />
        );
      })}
    </div>
  );
};

export const LoopPanel = memo(LoopPanelNotMemo);
