

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
	// On applique uniquement les styles de base, sans couleur, pour laisser le CSS global gérer le hover
	const base =
		"px-8 py-3 font-semibold rounded-lg shadow transition text-lg focus:outline-none bg-black text-white";
	return (
		<button className={`${base} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
