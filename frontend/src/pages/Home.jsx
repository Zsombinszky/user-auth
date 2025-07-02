import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      {user ? (
        <h1 className="text-2xl font-semibold">Welcome back, {user.name}!</h1>
      ) : (
        <h1>Welcome to the homepage! Please sign in or register.</h1>
      )}
    </div>
  );
};

export default Home;
