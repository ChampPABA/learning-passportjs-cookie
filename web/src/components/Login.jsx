const Login = () => {
  const handleLogin = () => {
    const googleLoginURL =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      new URLSearchParams({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: "http://localhost:8888/auth/google/callback",
        response_type: "code",
        scope: "profile email",
      });

    window.location.href = googleLoginURL;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Google
    </button>
  );
};

export default Login;
