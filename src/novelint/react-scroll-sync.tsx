/* eslint-disable no-param-reassign */

import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

const ScrollSyncContext = React.createContext({
  registerPane: (_node: HTMLElement) => {},
  unregisterPane: (_node: HTMLElement) => {},
});

export const ScrollSync: React.FC<{}> = ({ children }) => {
  const [panes, setPanes] = useState<HTMLElement[]>([]);

  const registerPane = useCallback((node: HTMLElement) => {
    setPanes((prevPanes) => {
      if (prevPanes.indexOf(node) === -1) {
        return [...prevPanes, node];
      }

      return prevPanes;
    });
  }, []);

  const unregisterPane = useCallback((node: HTMLElement) => {
    setPanes((prevPanes) => {
      const index = prevPanes.indexOf(node);

      if (index !== -1) {
        node.onscroll = null;
        return [...prevPanes.slice(0, index), ...prevPanes.slice(index + 1)];
      }

      return prevPanes;
    });
  }, []);

  useEffect(() => {
    const onScroll = (evt: Event): void => {
      const scrolledPane = evt.target as HTMLElement;

      window.requestAnimationFrame(() => {
        panes.forEach((pane) => {
          if (pane !== scrolledPane) {
            pane.onscroll = null;

            const {
              scrollTop,
              scrollHeight,
              clientHeight,
              scrollLeft,
              scrollWidth,
              clientWidth,
            } = scrolledPane;
            const scrollTopOffset = scrollHeight - clientHeight;
            const scrollLeftOffset = scrollWidth - clientWidth;
            const paneHeight = pane.scrollHeight - clientHeight;
            const paneWidth = pane.scrollWidth - clientWidth;

            if (scrollTopOffset > 0) {
              pane.scrollTop = (paneHeight * scrollTop) / scrollTopOffset;
            }
            if (scrollLeftOffset > 0) {
              pane.scrollLeft = (paneWidth * scrollLeft) / scrollLeftOffset;
            }

            window.requestAnimationFrame(() => {
              pane.onscroll = onScroll;
            });
          }
        });
      });
    };

    panes.forEach((node) => {
      node.onscroll = onScroll;
    });
  }, [panes]);

  return (
    <ScrollSyncContext.Provider
      value={{
        registerPane,
        unregisterPane,
      }}
    >
      {children}
    </ScrollSyncContext.Provider>
  );
};

export const ScrollSyncPane: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { registerPane, unregisterPane } = useContext(ScrollSyncContext);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      registerPane(node);
    }

    return (): void => {
      if (node) {
        unregisterPane(node);
      }
    };
  }, [registerPane, unregisterPane]);

  return React.Children.only(React.cloneElement(children, { ref }));
};
