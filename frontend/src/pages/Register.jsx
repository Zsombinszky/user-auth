import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const registerSchema = z
  .object({
    name: z.string().min(3, "The name must be minimum 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "The password must be at least 6 character long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not matching",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zod validáció
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix your mistakes in the register form");
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Error happened, register failed");
      }

      const data = await res.json();
      login(data.user, data.token);
      toast.success("Successfully registered");
      console.log("User registered", data);
      navigate("/");
    } catch (error) {
      toast.error("Server Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-96"
    >
      <h2 className="text-2xl font-bold mb-b">Register</h2>

      {/* Name  */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
      )}

      {/* Email  */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
      )}

      {/* Password  */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}

      {/* ConfirmPassword  */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="flex w-full bg-blue-500 text-white p-2 rounded text-center items-center justify-center"
      >
        {loading ? <ImSpinner9 className="animate-spin w-6 h-6" /> : "Register"}
      </button>
    </form>
  );
};

export default Register;
