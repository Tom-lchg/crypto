import React, { FC, useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));

 
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mt-1 border rounded p-2 bg-black"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mt-1 border rounded p-2 bg-black"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
