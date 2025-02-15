
class StorageService {
    // Key used for storing items in localStorage
    storageKey = 'foodSaverItems';

    // Get all items from localStorage
    getItems() {
        const items = localStorage.getItem(this.storageKey);
        return items ? JSON.parse(items) : [];
    }

    // Save items array to localStorage
    saveItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    // Add new item with generated ID and active status
    addItem(item) {
        const items = this.getItems();
       
        const newItem = {
            ...item,
            id: Date.now().toString(),
            status: 'active'
        };

        items.push(newItem);
        this.saveItems(items);
        return newItem;
    }

    // Update existing item by ID
    // Returns updated item or null if not found
    updateItem(id, updates) {
        const items = this.getItems();
        const itemIndex = items.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            // Keep existing status if a new one is not specified
            const currentItem = items[itemIndex];
            const updatedItem = {
                ...currentItem,
                ...updates,
                status: updates.status || currentItem.status
            };
            
            items[itemIndex] = updatedItem;
            this.saveItems(items); // Use saveItems method with the correct key
            return updatedItem;
        }
        return null;
    }

    // Delete item by ID
    // Returns true after successful deletion
    deleteItem(id) {
        const items = this.getItems();
        const filteredItems = items.filter(item => item.id !== id);
        this.saveItems(filteredItems);
        return true;
    }

    // Clear all stored items
    clearItems() {
        localStorage.removeItem(this.storageKey);
    }
}

export default StorageService;
