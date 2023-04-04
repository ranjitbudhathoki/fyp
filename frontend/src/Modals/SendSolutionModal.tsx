import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CodeEditor from '../components/Feed/CodeEditor';
import axios from '../utils/axios-instance';

const SendSolutionModal = ({
  onSubmit,
  postId,
  userId,
  language,
  preferredGender,
}) => {
  return (
    <div className="h-[500px] w-[720px] overflow-auto">
      <CodeEditor
        postId={postId}
        preferredGender={preferredGender}
        userId={userId}
        onSubmit={onSubmit}
        language={language}
      />
    </div>
  );
};

export default SendSolutionModal;
