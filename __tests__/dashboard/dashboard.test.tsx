import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/owner/dashboard/page";

describe("Dashboard Page", () => {

  test("dashboard shows loading state", () => {
    render(<DashboardPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

});