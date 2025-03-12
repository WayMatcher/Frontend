

const AddressPicker = () => {
    const [address, setAddress] = useState<string | null>(null);

    const handleAddressChange = (newAddress: string) => {
        setAddress(newAddress);
    };

    return (
        <div>
            <input
                type="text"
                value={address || ''}
                onChange={(e) => handleAddressChange(e.target.value)}
            />
            <button onClick={() => setAddress(null)}>Clear</button>
        </div>
    );
};

export default AddressPicker;