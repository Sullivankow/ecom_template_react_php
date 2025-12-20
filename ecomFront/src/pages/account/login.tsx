



const Login: React.FC = () => {

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500">
						{/* petit logo / icône */}
						<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2L15 8H9L12 2Z" fill="currentColor" />
						</svg>
					</div>
					<h1 className="text-2xl font-semibold">Sign in to your account</h1>
				</div>

				<div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 shadow-lg">
					<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="block w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="block w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								placeholder="••••••••"
							/>
						</div>

						<div className="flex items-center justify-between text-sm">
							<label className="inline-flex items-center text-gray-300">
								<input type="checkbox" className="h-4 w-4 text-indigo-500 rounded bg-gray-800 border-gray-600" />
								<span className="ml-2">Remember me</span>
							</label>
							<a href="/" className="text-indigo-400 hover:text-indigo-300">Forgot password?</a>
						</div>

						<button
							type="submit"
							className="w-full py-3 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:from-indigo-600 hover:to-violet-600 transition"
							>
								Sign in
							</button>
						</form>

						<div className="mt-6">
						<div className="flex items-center">
							<div className="flex-grow border-t border-gray-700" />
							<span className="px-4 text-sm text-gray-400">Or continue with</span>
							<div className="flex-grow border-t border-gray-700" />
						</div>

						<div className="mt-4 grid grid-cols-2 gap-4">
							<button className="flex items-center justify-center gap-2 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">
								<svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<circle cx="12" cy="12" r="10" fill="#ffffff" />
								</svg>
								<span className="text-sm text-gray-100">Google</span>
							</button>

							<button className="flex items-center justify-center gap-2 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">
								<svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" fill="#fff" />
								</svg>
								<span className="text-sm text-gray-100">GitHub</span>
							</button>
						</div>
					</div>
				</div>

				<p className="mt-6 text-center text-sm text-gray-400">Not a member? <a href="/" className="text-indigo-400 hover:text-indigo-300">Start a 14 day free trial</a></p>
			</div>
		</div>
	);

};

export default Login;



