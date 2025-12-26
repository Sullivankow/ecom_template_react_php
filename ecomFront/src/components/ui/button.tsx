

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


// Bouton corbeille rouge pour suppression
interface ButtonDeletedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title?: string;
}

export const ButtonDeleted: React.FC<ButtonDeletedProps> = ({ title = "Supprimer", className = "", ...props }) => {
	return (
		<button
			title={title}
			className={`p-2 rounded-full hover:bg-red-100 transition ${className}`}
			style={{ color: '#e3342f', background: '#fff' }}
			{...props}
		>
			{/* Icône corbeille moderne (Heroicons outline) */}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#e3342f" width={22} height={22}>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 7h-15M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m3 0v12a2 2 0 01-2 2H6.5a2 2 0 01-2-2V7h15z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11v6M14 11v6" />
			</svg>
		</button>
	);
};

export default Button;





