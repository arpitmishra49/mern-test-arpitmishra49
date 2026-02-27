import { registerStudent, loginStudent } from '../services/authService.js';


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const result = await registerStudent({ name, email, password });
    res.status(201).json({ message: 'Registration successful', ...result });
  } catch (error) {
    const status = error.message === 'Email already registered' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const result = await loginStudent({ email, password });
    res.json({ message: 'Login successful', ...result });
  } catch (error) {
    const status = error.message === 'Invalid email or password' ? 401 : 500;
    res.status(status).json({ message: error.message });
  }
};

export { register, login };