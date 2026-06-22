function SearchBar({
    value,
    onChange
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search products..."
            className="
                w-full
                p-4
                rounded-xl
                border
                border-neutral-700
                bg-neutral-900
            "
        />
    );
}

export default SearchBar;