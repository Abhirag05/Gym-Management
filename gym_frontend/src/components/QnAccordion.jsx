import React, { useState } from 'react';
import './QnAccordion.css';

const QnAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
        <span className={`plus-icon ${isOpen ? 'rotate' : ''}`}>+</span>
      </div>
      {isOpen && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  );
};

export default QnAccordion;
