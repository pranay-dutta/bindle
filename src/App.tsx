function App({ name }: { name: string }) {
  if (name) return <h1>Hello {name}</h1>;
  return <button>Login</button>
}

export default App;
