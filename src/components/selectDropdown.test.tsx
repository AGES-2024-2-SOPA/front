import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from './selectDropdown';

describe('Dropdown Component', () => {
    const mockFetchOptions = jest.fn().mockResolvedValue(['Option 1', 'Option 2', 'Option 3']);
    const mockOnOptionSelect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the dropdown with description', () => {
        render(<Dropdown description="Select an option" fetchOptions={mockFetchOptions} />);
        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    test('fetches and displays options when opened', async () => {
        render(<Dropdown description="Select an option" fetchOptions={mockFetchOptions} />);
        fireEvent.click(screen.getByText('Select an option'));

        await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    test('filters options based on search term', async () => {
        render(<Dropdown description="Select an option" fetchOptions={mockFetchOptions} enableSearch={true} />);
        fireEvent.click(screen.getByText('Select an option'));

        await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledTimes(1));
        fireEvent.change(screen.getByPlaceholderText('Pesquisar...'), { target: { value: 'Option 2' } });

        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });

    test('calls onOptionSelect when an option is selected', async () => {
        render(<Dropdown description="Select an option" fetchOptions={mockFetchOptions} onOptionSelect={mockOnOptionSelect} />);
        fireEvent.click(screen.getByText('Select an option'));

        await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledTimes(1));
        fireEvent.click(screen.getByText('Option 1'));

        expect(mockOnOptionSelect).toHaveBeenCalledWith('Option 1');
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    test('closes the dropdown when clicking outside', async () => {
        render(<Dropdown description="Select an option" fetchOptions={mockFetchOptions} />);
        fireEvent.click(screen.getByText('Select an option'));

        await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledTimes(1));
        fireEvent.mouseDown(document);

        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
});