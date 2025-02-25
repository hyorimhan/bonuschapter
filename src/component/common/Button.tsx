import { Link } from 'react-router-dom';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  link?: string;
  name?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Button({
  type,
  onClick,
  link,
  name,
  children,
  className,
  disabled,
}: ButtonProps) {
  return link ? (
    <Link to={link} className="cursor-pointer">
      {' '}
      {name || children}
    </Link>
  ) : (
    <div className="flex justify-center items-center text-3xl my-3 cursor-pointer">
      <button
        type={type}
        onClick={onClick}
        className={className}
        disabled={disabled}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
