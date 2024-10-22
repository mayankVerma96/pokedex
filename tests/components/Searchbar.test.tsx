import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("Searchbar", () => {
  test("should update the search value when user types something", () => {
    const setSearchValue = jest.fn();
    render(
      <SearchBar
        searchValue=""
        setSearchValue={setSearchValue}
        placeholder="Search Pokemon..."
      />
    );

    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "pikachu" } });

    expect(setSearchValue).toHaveBeenCalledWith("pikachu");
  });

  test("should call setSearchValue when form is submitted", () => {
    const setSearchValue = jest.fn();
    render(
      <SearchBar
        searchValue=""
        setSearchValue={setSearchValue}
        placeholder="Seach Pokemon..."
      />
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(setSearchValue).toHaveBeenCalledWith("");
  });
});
