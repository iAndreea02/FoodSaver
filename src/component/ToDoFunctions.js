const ToDoFunctions = (props) => {
    // Input handling for new items
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        props.setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Input handling for editing items
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        props.setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    // Calculate days until expiration
    const calculateRemainingDays = (expirationDate) => {
        const diffTime = new Date(expirationDate) - new Date();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Get item status based on conditions
    const getStatus = (item) => {
        const remainingDays = calculateRemainingDays(item.expirationDate);
        if (item.status === "consumed") return "Consumed";
        if (item.status === "rotten") return "Rotten";
        if (item.status === "trash") return "Trash";
        if (remainingDays < 0) return `Expired (${Math.abs(remainingDays)} days ago)`;
        return `${remainingDays} days remaining`;
    };

    // Create new item
    const handleAddItem = () => {
        if (isFormFilled) {
            const newItem = props.storageService.addItem(props.formData);
            props.setItems(prev => [...prev, newItem]);
            props.setFormData({ text: "", expirationDate: "", quantity: 1, unit: "pieces" });
            props.showNotification('Item added successfully');
        }
    };

    // Handle modal confirmations for updates/deletes
    const handleModalConfirm = (modalAction, setShowModal) => {
        const { type, item, status } = modalAction;
        if (type === 'delete') {
            props.storageService.deleteItem(item.id);
            props.setItems(prev => prev.filter(i => i.id !== item.id));
            props.showNotification('Item deleted successfully');
        } else if (type === 'update') {
            const updated = props.storageService.updateItem(item.id, { status });
            props.setItems(prev => prev.map(i => i.id === item.id ? updated : i));
            props.showNotification('Item updated successfully');
        }
        setShowModal(false);
    };

    // Start item edit mode
    const handleEdit = (item) => {
        props.setEditItem(item);
        props.setEditFormData({
            text: item.text,
            expirationDate: item.expirationDate,
            quantity: item.quantity,
            unit: item.unit
        });
    };

    // Save edited item
    const saveEditItem = () => {
        if (props.editItem) {
            const updated = props.storageService.updateItem(props.editItem.id, props.editFormData);
            props.setItems(prev => prev.map(item => item.id === props.editItem.id ? updated : item));
            props.setEditItem(null);
            props.showNotification('Item updated successfully');
        }
    };

    // Helper functions for UI
    const calculateProgress = days => Math.min(100, ((365 - days) / 365) * 100);
    const getStatusColor = status => status.includes("Expired") ? "text-warning" : 
                                   status === "Consumed" ? "text-success" : 
                                   status === "Rotten" ? "text-danger" : "text-primary";
    const getBorderColor = item => item.status === "consumed" ? "border-success" : 
                                  item.status === "rotten" ? "border-danger" : 
                                  getStatus(item).includes("Expired") ? "border-warning" : "border-primary";
    const isFormFilled = props.formData.text && props.formData.expirationDate && props.formData.quantity && props.formData.unit;

    return {
        handleInputChange,
        handleEditInputChange,
        handleAddItem,
        handleModalConfirm,
        calculateRemainingDays,
        calculateProgress,
        handleEdit,
        saveEditItem,
        isFormFilled,
        getStatus,
        getStatusColor,
        getBorderColor
    };
};

export default ToDoFunctions;
