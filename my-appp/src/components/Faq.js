import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase if it is in original condition." },
        { question: "Do you offer free shipping?", answer: "Yes, we offer free shipping on orders over $50." },
        { question: "How can I track my order?", answer: "Once your order is shipped, you will receive an email with a tracking number." },
        { question: "Can I change my shipping address after placing an order?", answer: "Yes, but you must contact support within 24 hours of placing the order." },
        { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase if it is in original condition." },
        { question: "Do you offer free shipping?", answer: "Yes, we offer free shipping on orders over $50." },
        { question: "How can I track my order?", answer: "Once your order is shipped, you will receive an email with a tracking number." },
        { question: "Can I change my shipping address after placing an order?", answer: "Yes, but you must contact support within 24 hours of placing the order." },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="text-center mb-5">
                <h2 className="fw-bold" style={{ color: 'rgb(190, 110, 2)' }}>Frequently Asked Questions</h2>
                <p className="text-muted">Find answers to the most common questions below.</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="list-group">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="list-group-item list-group-item-action border-0 mb-3 shadow-sm p-4 rounded" 
                                style={{ backgroundColor: '#fff', cursor: 'pointer', transition: '0.3s', borderLeft: openIndex === index ? '5px solid rgb(190, 110, 2)' : 'none' }}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0" style={{ color: 'rgb(190, 110, 2)' }}>{faq.question}</h5>
                                    <span style={{ fontSize: '1.5rem', color: 'rgb(190, 110, 2)' }}>{openIndex === index ? '-' : '+'}</span>
                                </div>
                                {openIndex === index && <p className="mt-3 text-muted">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
