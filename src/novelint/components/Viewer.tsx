import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { LinterResult, LinterResultMarkNode } from '../types';

const MarkWithToolTip: React.FC<{ node: LinterResultMarkNode }> = ({ node, children }) => {
  const targetId = `mark-${node.index}`;
  return (
    <>
      <mark id={targetId} {...node.markProps}>
        {node.link ? (
          <a href={node.link} rel="noreferrer noopener" target="_blank">
            {children}
          </a>
        ) : (
          children
        )}
      </mark>
      {node.tooltip ? (
        <UncontrolledTooltip id={`tooltip-${targetId}`} target={targetId}>
          {node.tooltip}
        </UncontrolledTooltip>
      ) : null}
    </>
  );
};

const MarkNode: React.FC<{ nodes: LinterResultMarkNode['nodes'] }> = ({ nodes }) => (
  <>
    {nodes.map(
      (node, i) =>
        /* eslint-disable react/no-array-index-key */
        node && typeof node === 'object' ? (
          <MarkWithToolTip key={i} node={node}>
            <MarkNode nodes={node.nodes} />
          </MarkWithToolTip>
        ) : (
          <React.Fragment key={i}>{node}</React.Fragment>
        )
      /* eslint-enable react/no-array-index-key */
    )}
  </>
);

const Viewer: React.FC<{
  result: LinterResult;
}> = ({ result }) => <MarkNode nodes={result.markNode.nodes} />;

export default Viewer;
