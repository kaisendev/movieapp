import React from 'react';

export const Heading = ({heading, headStyle}) => {
  return (
      <div className={headStyle}> {heading} </div>
  )
};
