import React from 'react';
import PropTypes from 'prop-types';

const styles: any = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
    color: 'white',
  },
};

export default function Loading({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return <p style={styles.content}>{content}</p>;
}
