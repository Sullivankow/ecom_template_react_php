import { useState, useEffect, useCallback } from 'react';

// Type d'un article du panier (à adapter selon ton modèle produit)
export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
}

const CART_KEY = 'cart';

function getInitialCart(): CartItem[] {
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(CART_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {
				return [];
			}
		}
	}
	return [];
}

export function useCart() {
	const [cart, setCart] = useState<CartItem[]>(getInitialCart);

	// Persistance dans le localStorage
	useEffect(() => {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
	}, [cart]);

	// Ajouter un produit
	const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
		setCart(prev => {
			const found = prev.find(p => p.id === item.id);
			if (found) {
				return prev.map(p =>
					p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
				);
			}
			return [...prev, { ...item, quantity }];
		});
	}, []);

	// Supprimer un produit
	const removeFromCart = useCallback((id: string) => {
		setCart(prev => prev.filter(p => p.id !== id));
	}, []);

	// Modifier la quantité
	const updateQuantity = useCallback((id: string, quantity: number) => {
		setCart(prev =>
			prev.map(p =>
				p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
			)
		);
	}, []);

	// Vider le panier
	const clearCart = useCallback(() => {
		setCart([]);
	}, []);

	// Total
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		total,
	};
}
