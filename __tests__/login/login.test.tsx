import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { loginApi } from "@/lib/api/auth.api";

jest.mock("@/lib/api/auth.api");

describe("Login Page Tests", () => {
  
  test("renders welcome message", () => {
    render(<LoginPage />);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  test("renders email label", () => {
    render(<LoginPage />);
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
  });

  test("renders email input", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/you@example/i)).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("login button exists", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("user can type email", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/you@example/i);

    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    });

    expect(emailInput).toHaveValue("test@test.com");
  });

  test("user can type password", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(passwordInput).toHaveValue("123456");
  });

  test("calls loginApi when login button clicked", async () => {
    (loginApi as jest.Mock).mockResolvedValue({ token: "fake" });

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(loginApi).toHaveBeenCalled();
    });
  });

  test("shows Store Sync branding", () => {
    render(<LoginPage />);
    const branding = screen.getAllByText(/store sync/i);
    expect(branding.length).toBeGreaterThan(0);
  });

  test("shows store management tagline", () => {
    render(<LoginPage />);
    expect(screen.getByText(/manage your store/i)).toBeInTheDocument();
  });

  test("shows sign in subtitle", () => {
    render(<LoginPage />);
    expect(screen.getByText(/sign in to your/i)).toBeInTheDocument();
  });

  test("shows revenue analytics card", () => {
    render(<LoginPage />);
    expect(screen.getByText(/total revenue/i)).toBeInTheDocument();
  });

  test("shows net profit card", () => {
    render(<LoginPage />);
    expect(screen.getByText(/net profit/i)).toBeInTheDocument();
  });

});