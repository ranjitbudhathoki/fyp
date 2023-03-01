import { useState } from 'react';

function Feed() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return <div>Hello</div>;
}

export default Feed;
