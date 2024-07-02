import React, { useState } from 'react';
import srtipe from '../../../public/images/Stripe_Logo.png'

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
      

      {isSubmitted ? (
        <section className="relative h-max w-full p-8">
          <div className="h-full w-full rounded-xl bg-white  p-8 shadow-xl flex flex-col justify-center items-center gap-8">
            <figure className="rounded-full w-20 aspect-square">
              <img src="/icon-complete.svg" alt="form completed icon" className="w-full" />
            </figure>
            <h1 className="uppercase text-3xl tracking-widest">Thank you!</h1>
            <p className="text-gray-400">We've added your card details</p>
            <button
              className="btn-continue py-3 px-8 w-full rounded-lg bg-gray-900 text-gray-50 shadow-md focus:outline-none"
              onClick={resetForm}
            >
              Continue
            </button>
          </div>
        </section>
      ) : (
        <section className="relative h-max w-full p-8">
          <form
            className="h-full w-full lg:w-1/2 rounded-xl bg-white p-8 shadow-xl flex flex-col justify-center gap-4 m-auto"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group flex flex-col gap-2">
              <label htmlFor="name" className="uppercase text-xs tracking-widest">
                cardholder name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input text-lg border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-gray-400"
                placeholder="e.g. John Doe"
                value={formData.name || ''}
                onInput={handleInput}
              />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="number" className="uppercase text-xs tracking-widest">
                card number
              </label>
              <input
                type="text"
                name="number"
                id="number"
                className="input text-lg border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-gray-400"
                placeholder="e.g. 1234 5678 9123 0000"
                value={formData.number || ''}
                onInput={handleInput}
              />
            </div>
            <div className="form-group grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="mm" className="">
                  exp. date (MM/YY)
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="mm"
                    id="mm"
                    className="input  w-10 text-lg border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-gray-400"
                    placeholder="MM"
                    value={formData.mm || ''}
                    onInput={handleInput}
                  />
                  <input
                    type="text"
                    name="yy"
                    id="yy"
                    className=" w-16 input text-lg border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-gray-400"
                    placeholder="YY"
                    value={formData.yy || ''}
                    onInput={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cvc" className="mt-3 ml-11">
                  cvc
                </label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  className=" ml-10 input text-lg border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:border-gray-400"
                  placeholder="e.g. 123"
                  value={formData.cvc || ''}
                  onFocus={toggleBackCard}
                  onBlur={toggleBackCard}
                  onInput={handleInput}
                />
              </div>
            </div>
            <button
              className="btn-submit py-3 px-8 w-full rounded-lg bg-gray-900 text-gray-50 shadow-md focus:outline-none"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </section>
      )}
      <figure className="absolute m-24">
        <div className="credit-card w-max h-max relative select-none pointer-events-none m-20">
          {/* Card verso */}
          <div className={`verso z-1 absolute overflow-hidden transform translate-y-12 left-16 w-96 h-56 rounded-2xl bg-gray-400 shadow-2xl ${isBackVisible ? 'block' : 'hidden'}`}>
            <div className="w-full h-12 bg-gray-200 absolute top-10">&nbsp;</div>
            <div className="absolute top-24 left-12 text-lg text-black">{formData.cvc || '000'}</div>
          </div>

          {/* Card recto */}
          <div className={`recto z-2 absolute overflow-hidden w-96 h-56 rounded-2xl px-8 py-6 ml-60 bg-black text-white shadow-xl flex flex-col justify-end gap-6 ${isBackVisible ? 'hidden' : 'block'}`}>
            {/* Visa logo */}
            <div className="logo absolute top-6 right-8 w-16 h-8 flex justify-items-center items-center">
              <img src={srtipe} alt='logo'/>
            </div>

            {/* PIN */}
            <div className="pin w-11 h-7 rounded bg-yellow-100">&nbsp;</div>

            {/* Card number */}
            <div className="number whitespace-nowrap text-2xl font-semibold" style={{ fontFamily: 'Courier new, mono' }}>
              {formData.number || '0000 0000 0000 0000'}
            </div>

            {/* Card infos */}
            <div className="credentials flex gap-8">
              <div className="owner flex flex-col w-max">
                <span className="text-xs uppercase">Card holder</span>
                <span className="whitespace-nowrap text-lg">{formData.name || 'John DOE'}</span>
              </div>
              <div className="expires flex flex-col w-max">
                <span className="text-xs uppercase">Expires</span>
                <span className="whitespace-nowrap text-lg">{formData.mm || '00'}/{formData.yy || '00'}</span>
              </div>
              <div className="cvc flex flex-col w-max">
                <span className="text-xs uppercase">cvc</span>
                <span className="whitespace-nowrap text-lg">{formData.cvc || '000'}</span>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </main>
  );
};

export default CreditCardForm;
