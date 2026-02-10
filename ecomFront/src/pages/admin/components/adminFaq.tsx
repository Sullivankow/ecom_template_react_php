import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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
		<div className="admin-faq-section max-w-xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
			<h2 className="text-xl md:text-2xl font-bold mb-8 text-center sm:text-left text-black">Gestion des FAQs</h2>
			<form onSubmit={handleSubmit} className="faq-form space-y-6">
				<input
					name="question"
					type="text"
					placeholder="Question"
					value={form.question}
					onChange={handleChange}
					required
					className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600 text-gray-700"
				/>
				<textarea
					name="answer"
					placeholder="Réponse"
					value={form.answer}
					onChange={handleChange}
					required
					className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600 text-gray-700"
				/>
				<div className="flex gap-2">
					<button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold flex items-center gap-2">
						<FaPlus /> {editId === null ? "Ajouter" : "Modifier"}
					</button>
					{editId === null ? null : (
						<button type="button" onClick={() => { setEditId(null); setForm({ question: "", answer: "" }); }} className="px-6 py-2 bg-gray-300 text-blue-600 rounded-md hover:bg-gray-400 transition font-semibold">Annuler</button>
					)}
				</div>
			</form>
			<ul className="faq-list mt-6">
				{faqs.map(faq => (
					<li key={faq.id} className="faq-item bg-white border border-gray-200 rounded-xl mb-4 p-4 shadow-sm">
						<strong className="text-black text-base md:text-lg font-semibold">{faq.question}</strong>
						<p className="text-gray-700 mb-2">{faq.answer}</p>
						<div className="flex gap-2">
							<button onClick={() => handleEdit(faq)} className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium flex items-center gap-2">
								<FaEdit /> Éditer
							</button>
							<button onClick={() => handleDelete(faq.id)} className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium flex items-center gap-2">
								<FaTrash /> Supprimer
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}


