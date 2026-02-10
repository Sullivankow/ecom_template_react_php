

import React, { useState } from "react";
// On utilise index.css pour styliser la section FAQ admin
import '../../../index.css';

interface FaqItem {
	id: number;
	question: string;
	answer: string;
}

const initialFaqs: FaqItem[] = [
	{ id: 1, question: "Comment passer une commande ?", answer: "Sélectionnez vos produits, ajoutez-les au panier et validez votre commande." },
	{ id: 2, question: "Quels sont les modes de paiement ?", answer: "Carte bancaire, PayPal, virement bancaire." },
];

export default function AdminFaq() {
	const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
	const [form, setForm] = useState({ question: "", answer: "" });
	const [editId, setEditId] = useState<number | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (form.question.trim() && form.answer.trim()) {
			if (editId === null) {
				setFaqs([...faqs, { id: Date.now(), ...form }]);
			} else {
				setFaqs(faqs.map(faq => faq.id === editId ? { ...faq, ...form } : faq));
				setEditId(null);
			}
			setForm({ question: "", answer: "" });
		}
	};

	const handleEdit = (faq: FaqItem) => {
		setForm({ question: faq.question, answer: faq.answer });
		setEditId(faq.id);
	};

	const handleDelete = (id: number) => {
		setFaqs(faqs.filter(faq => faq.id !== id));
		if (editId !== null && editId === id) {
			setEditId(null);
			setForm({ question: "", answer: "" });
		}
	};

	return (
		<div className="admin-faq-section">
			<h2>Gestion des FAQs</h2>
			<form onSubmit={handleSubmit} className="faq-form">
				<input
					name="question"
					type="text"
					placeholder="Question"
					value={form.question}
					onChange={handleChange}
					required
				/>
				<textarea
					name="answer"
					placeholder="Réponse"
					value={form.answer}
					onChange={handleChange}
					required
				/>
				<button type="submit">{editId === null ? "Ajouter" : "Modifier"}</button>
				{editId === null ? null : (
					<button type="button" onClick={() => { setEditId(null); setForm({ question: "", answer: "" }); }}>Annuler</button>
				)}
			</form>
			<ul className="faq-list">
				{faqs.map(faq => (
					<li key={faq.id} className="faq-item">
						<strong>{faq.question}</strong>
						<p>{faq.answer}</p>
						<button onClick={() => handleEdit(faq)}>Éditer</button>
						<button onClick={() => handleDelete(faq.id)}>Supprimer</button>
					</li>
				))}
			</ul>
		</div>
	);
}


