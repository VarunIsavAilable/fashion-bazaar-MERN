import Address from '../../models/Address.js'

// Add Address
const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const newlyCreatedAddress = new Address({ userId, address, city, pincode, notes, phone });

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Server error while adding address.'
        });
    }
};

// Fetch All Addresses
const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.'
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addressList
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching addresses.'
        });
    }
};

// Edit Address
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and Address ID are required.'
            });
        }

        const address = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            formData,
            { new: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: address
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Server error while editing address.'
        });
    }
};

// Delete Address
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and Address ID are required.'
            });
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully.',
            data: address
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting address.'
        });
    }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
