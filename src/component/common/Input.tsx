import { UseFormRegisterReturn } from 'react-hook-form';

function Input({
  label,
  type,
  id,
  register,
  error,
  defaultValue,
}: {
  label?: string;
  type: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  defaultValue?: string | number;
}) {
  return (
    <div className="flex flex-col  justify-center w-full items-center gap-5 mt-5 text-xl">
      {label && (
        <label htmlFor={id} className="text-4xl">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          defaultValue={defaultValue}
          placeholder={id}
          className="border rounded-lg p-2 h-52 max-w-3xl w-full resize-none text-2xl"
          {...register}
        />
      ) : (
        <input
          type={type}
          defaultValue={defaultValue}
          id={id}
          className="border rounded-lg p-1"
          {...register}
        />
      )}{' '}
      {error && <span className="text-red-500 text-lg">{error}</span>}
    </div>
  );
}

export default Input;
