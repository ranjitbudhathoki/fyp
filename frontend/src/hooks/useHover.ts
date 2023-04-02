import React from 'react';

export default function useHover() {
  const [hovering, setHovering] = React.useState(false);

  const onMouseOver: any = () => setHovering(true);
  const onMouseOut: any = () => setHovering(false);

  return [
    hovering,
    {
      onMouseOut,
      onMouseOver,
    },
  ];
}
