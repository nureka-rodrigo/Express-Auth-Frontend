import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {apiClient} from "@/api";
import {toast} from "@/hooks/use-toast.tsx";
import Cookies from "js-cookie";

export const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const client = apiClient();
        const response = await client.post("/auth/validate-token");
        if (response.data.user.role !== "admin") {
          localStorage.removeItem("user");
          localStorage.setItem("isLogged", "false");
          Cookies.remove("token");
          navigate("/");
        }
      } catch (error) {
        const response = error.response;
        toast({
          title: "Success",
          description: response.data.message,
        });
        localStorage.removeItem("user");
        localStorage.setItem("isLogged", "false");
        Cookies.remove("token");
        navigate("/");
      }
    };

    validateToken().then(r => r);

    const handleCookieChange = () => {
      validateToken().then(r => r);
    };

    window.addEventListener("cookiechange", handleCookieChange);

    return () => {
      window.removeEventListener("cookiechange", handleCookieChange);
    };
  }, [navigate]);
};
