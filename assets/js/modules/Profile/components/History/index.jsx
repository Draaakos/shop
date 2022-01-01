import React from 'react';
import HorizontalPod from 'ui/HorizontalPod';

const History = ({ historyList }) => (
  <section className="page-wrapper">
    <div className="item-list">
      { historyList.map((data, index) => <HorizontalPod data={data} key={`pod-${index}`} />) }
    </div>
  </section>
);

export default History;
