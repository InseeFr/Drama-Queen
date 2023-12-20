import D from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { useStyles } from './component.style';

const getNewPage = page => iteration => {
  if (page.includes('.')) {
    return `${page}#${iteration + 1}`;
  }
  return page;
};

const hasToBlock = (prevProps, nextProps) => {
  const prevSubseqId = prevProps?.subsequence?.id;
  const prevSeqId = prevProps?.sequence?.id;
  const nextSubseqId = nextProps?.subsequence?.id;
  const nextSeqId = nextProps?.sequence?.id;
  const prevPage = `${prevProps?.pager?.page}.${prevProps?.pager?.subPage}#${prevProps?.pager?.iteration}`;
  const nextPage = `${nextProps?.pager?.page}.${nextProps?.pager?.subPage}#${nextProps?.pager?.iteration}`;
  return prevSeqId === nextSeqId && prevSubseqId === nextSubseqId && prevPage === nextPage;
};

const BreadcrumbQueen = ({ sequence, subsequence, pager, setPage }) => {
  const classes = useStyles({ sequence, subsequence });
  const changePage = page => {
    const { iteration } = pager;
    const newPage = getNewPage(page)(iteration);
    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <div aria-label="breadcrumb">
        <button
          type="button"
          className={classes.breadcrumbButton}
          title={`${D.goToNavigation} ${sequence.label}`}
          onClick={() => changePage(sequence.page)}
        >
          {sequence.label}
        </button>
        {subsequence?.label && (
          <button
            className={`${classes.breadcrumbButton} ${classes.subsequenceButton}`}
            type="button"
            title={`${D.goToNavigation} ${subsequence.label}`}
            onClick={() => changePage(subsequence.page)}
          >
            {subsequence.label}
          </button>
        )}
      </div>
    </div>
  );
};

BreadcrumbQueen.propTypes = {
  sequence: PropTypes.shape({
    label: PropTypes.string,
    page: PropTypes.string,
  }).isRequired,
  subsequence: PropTypes.shape({
    label: PropTypes.string,
    page: PropTypes.string,
  }),
  pager: PropTypes.shape({
    page: PropTypes.string,
    maxPage: PropTypes.string,
    subPage: PropTypes.number,
    nbSubPages: PropTypes.number,
    iteration: PropTypes.number,
    nbIterations: PropTypes.number,
    lastReachedPage: PropTypes.string,
  }),
  setPage: PropTypes.func,
};

BreadcrumbQueen.defaultProps = {
  subsequence: null,
};

export default React.memo(BreadcrumbQueen, hasToBlock);
