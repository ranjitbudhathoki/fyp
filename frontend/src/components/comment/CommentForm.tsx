import { useState } from 'react';

export function CommentForm({
  onSubmit,
  autoFocus = false,
  initialValue = '',
}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('this is from the handle submit');
    if (!message) return alert('Missing Required Fields');
    onSubmit({ body: message });
  }

  return (
    <form
      id="submit-message"
      onSubmit={handleSubmit}
      className="flex items-center flex-grow"
    >
      <input
        type="text"
        value={message}
        autoFocus={autoFocus}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter a comment..."
        className="py-2 pl-2 pr-10 border-2  border-dark-gray w-full  text-black focus:outline-none text-sm rounded-2xl"
      />
    </form>
  );
}

export default CommentForm;
