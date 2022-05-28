import React, { useState, useRef } from 'react';

function Tabs({ children, onChange }) {
  const activeIndex = useRef(null);
  const [, forceUpdate] = useState({});
  const tabList = [];
  let renderActiveComponent = null;
  const avtiveStyle = { color: 'red' };
  const handlerClick = (tabItem, e) => {
    activeIndex.current = tabItem.name;
    onChange(tabItem);
    forceUpdate({});
  };
  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child) && child.type.displayName === 'tabItem') {
      const { name, active, children: c } = child.props;
      const { key } = child;
      let item = {
        key,
        name,
        active: activeIndex.current ? activeIndex.current === name : active || false,
        component: c,
      };
      if (item.active) {
        renderActiveComponent = c;
        item.style = avtiveStyle;
      }
      tabList.push(item);
    }
  });
  return (
    <div>
      <div>
        {tabList.map((item) => {
          return (
            <div key={item.key} onClick={handlerClick.bind(null, item)} style={item.style}>
              {item.name}
            </div>
          );
        })}
      </div>
      <div>{renderActiveComponent}</div>
    </div>
  );
}
function TabItem({ name }) {
  return <div>{name}</div>;
}
TabItem.displayName = 'tabItem';

function CompositePattern() {
  const tabsCallback = (tab) => {
    console.log(tab);
  };
  return (
    <div>
      <Tabs onChange={tabsCallback}>
        <TabItem key="1" name="tab-1">
          <div>Lorem.</div>
        </TabItem>
        <TabItem key="2" name="tab-2" active={true}>
          <div>Lorem, ipsum.</div>
        </TabItem>
        <TabItem key="3" name="tab-3">
          <div>Lorem, ipsum dolor.</div>
        </TabItem>
      </Tabs>
    </div>
  );
}

export default CompositePattern;
