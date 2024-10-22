import { render, screen } from "@testing-library/react";
import DetailPage from "@/app/details/[id]/page";
import { getPokemonDetails } from "@/api/items";
import { notFound } from "next/navigation";

jest.mock("@/api/items");
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/components/FavoriteButton", () => {
  return function MockFavoriteButton() {
    return <button data-testid="favorite-button">Favorite</button>;
  };
});

describe("DetailPage", () => {
  const mockPokemonDetails = {
    name: "bulbasaur",
    id: 1,
    height: 20,
    weight: 40,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "https://pokeapi.co/api/v2/";
  });

  it("renders Pokemon details correctly when data is fetched", async () => {
    (getPokemonDetails as jest.Mock).mockResolvedValue(mockPokemonDetails);

    //creating a test component that will await the async component since detailspage is an async server component
    const TestComponent = async () => {
      const Component = await DetailPage({ params: { id: "bulbasaur" } });
      return Component;
    };

    // we have to render the test component
    render(await TestComponent());

    expect(screen.getByText("Name: BULBASAUR")).toBeInTheDocument();
    expect(screen.getByText("Height: 20")).toBeInTheDocument();
    expect(screen.getByText("Weight: 40")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });

  it("calls notFound when Pokemon does not exist", async () => {
    (getPokemonDetails as jest.Mock).mockResolvedValue(null);

    const TestComponent = async () => {
      const Component = await DetailPage({ params: { id: "nonexistent" } });
      return Component;
    };

    try {
      await TestComponent();
    } catch (error) {}

    expect(notFound).toHaveBeenCalled();
  });
});
