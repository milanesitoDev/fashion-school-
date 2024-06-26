import React, { useState } from 'react';


interface FormData {
  name: string | null;
  number: string | null;
  mm: string | null;
  yy: string | null;
  cvc: string | null;
}

const CreditCardForm: React.FC = () => {
  const initialFormData: FormData = {
    name: null,
    number: null,
    mm: null,
    yy: null,
    cvc: null,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(false);

  const toggleBackCard = () => {
    setIsBackVisible(!isBackVisible);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'number') {
      e.target.value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (name === 'mm' || name === 'yy') {
      e.target.value = value.toString().replace(/[^0-9]/g, '').substring(0, 2);
    }
    if (name === 'mm' && Number(value) > 12) {
      e.target.value = '12';
    }
    if (name === 'cvc') {
      e.target.value = value.toString().replace(/[^0-9]/g, '').substring(0, 3);
    }

    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const value = formData[key as keyof FormData];
        if (!value) {
          handleError(key as keyof FormData, 'Can\'t be blank');
        } else {
          handleError(key as keyof FormData, '', 'remove');
        }
      }
    }

    if (formData.number) {
      if (formData.number.length < 19) {
        handleError('number', 'Number is too short');
      } else if (formData.number.match(/[^0-9\s]/g)) {
        handleError('number', 'Wrong format, numbers only');
      } else {
        handleError('number', '', 'remove');
      }
    }

    if (formData.cvc) {
      if (formData.cvc.length < 3) {
        handleError('cvc', 'CVC is too short');
      } else {
        handleError('cvc', '', 'remove');
      }
    }

    if (!formData.mm) {
      handleError('mm', 'Can\'t be blank');
    }
    if (!formData.yy) {
      handleError('yy', 'Can\'t be blank');
    }

    if (document.querySelectorAll('.input--error').length === 0) {
      setIsSubmitted(true);
    }
  };

  const handleError = (target: keyof FormData, message: string = 'Error', type: 'add' | 'remove' = 'add') => {
    const submitBtn = document.querySelector('.btn-submit') as HTMLElement;
    submitBtn.classList[type === 'add' ? 'add' : 'remove']('shake');
    submitBtn.addEventListener('animationend', () => submitBtn.classList.remove('shake'));

    const infoElement = document.querySelector(`.info-${target}`) as HTMLElement;
    infoElement.innerHTML = message;
    infoElement.classList[type === 'add' ? 'remove' : 'add']('info--hidden');

    const inputElement = document.querySelector(`[name="${target}"]`) as HTMLElement;
    inputElement.classList[type]('input--error');
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setIsBackVisible(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
      {!isSubmitted ? (
        <form className="bg-white w-full max-w-3xl mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col lg:flex-row cardForm" onSubmit={handleSubmit}>
          <label className="labelname">
            Cardholder Name
            <input type="text" placeholder="e.g. Jane Appleseed" onChange={handleInput} name="name" className="card-input border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400" />
          </label>
          <p className="info info-name info--hidden" aria-live="polite"></p>

          <label className="labelnumber">
            Card Number
            <input type="text" placeholder="e.g. 1234 5678 9123 0000" onChange={handleInput} name="number" className="card-input border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400" minLength={19} />
          </label>
          <p className="info info-number info--hidden" aria-live="polite"></p>

          <div className="cvc-mmyy">
            <label className="labelmm labelyy">
              Exp. Date (MM/YY)
              <div>
                <input type="text" placeholder="MM" onChange={handleInput} name="mm" className="card-input border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400" />
                <input type="text" placeholder="YY" onChange={handleInput} name="yy" className="card-input border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400" />
              </div>
            </label>
            <p className="info info-mm info--hidden" aria-live="polite"></p>

            <label className="labelcvc">
              CVC
              <input type="text" placeholder="e.g. 123" onChange={handleInput} name="cvc" className="card-input border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400" />
            </label>
            <p className="info info-cvc info--hidden" aria-live="polite"></p>

            <button type="submit" className="btn-submit btn-primary">
              Confirm
            </button>
          </div>
        </form>
      ) : (
        <div className="cardThanks">
          <img src={''} alt="Thank You Icon" className="mx-auto pb-6" />
          <p className="tracking-widest p-4">Thank you!</p>
          <p>We've added your card details</p>
          <button className="btn-primary pt-2" onClick={resetForm}>
            Continue
          </button>
        </div>
      )}

      <aside className="">
        <div className="from-indigo-500 via-purple-500 to-pink-500">
          <span>{formData.number || '0000 0000 0000 0000'}</span>
          <div>
            <span>{formData.name || 'Jane Appleseed'}</span>
            <span>{formData.mm || '00'}/{formData.yy || '00'}</span>
          </div>
        </div>

        <div className={`cardBack ${isBackVisible ? 'seeBack' : ''}`} onClick={toggleBackCard}>
          <span>{formData.cvc || '000'}</span>
        </div>
      </aside>
    </main>
  );
};

export default CreditCardForm;
