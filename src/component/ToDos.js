// Import necessary dependencies and components
import React, { useState, useContext, useEffect } from "react";
import './style/ToDos.css';
import { ThemeContext } from '../App';
import ToDoFunctions from './ToDoFunctions';
import ItemCard from './ItemCard';
import ConfirmationModal from './ConfirmationModal';
import NotificationAlert from './NotificationAlert';
import StorageService from '../services/StorageService';
import CelebrationAnimation from './CelebrationAnimation';
import WasteWarningAnimation from './WasteWarningAnimation';

const List = ({ minDate }) => {
    // Store list of all food items
    const [items, setItems] = useState([]);
    
    // Track which item is currently being edited
    const [editItem, setEditItem] = useState(null);
    
    // Store form data for new item creation
    const [formData, setFormData] = useState({ 
        text: "", 
        expirationDate: "", 
        quantity: 1, 
        unit: "pieces" 
    });
    
    // Store form data for editing existing items
    const [editFormData, setEditFormData] = useState({ 
        text: "", 
        expirationDate: "", 
        quantity: 1, 
        unit: "pieces" 
    });
    
    // Current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);
    
    // Current filter selection (all, consumed, rotten, etc.)
    const [filter, setFilter] = useState("all");
    
    // Control visibility of confirmation modal
    const [showModal, setShowModal] = useState(false);
    
    // Store current action details for confirmation modal
    const [modalAction, setModalAction] = useState({ 
        type: '',    // Type of action (delete, update)
        item: null,  // Item to be modified
        status: ''   // New status for item
    });
    
    // Control notification display and message
    const [notification, setNotification] = useState({ 
        show: false,   // Show/hide notification
        message: '',   // Notification message
        type: ''      // Notification type (success/error)
    });
    
    // Control celebration animation display
    const [showCelebration, setShowCelebration] = useState(false);
    
    // Control waste warning animation display
    const [showWasteWarning, setShowWasteWarning] = useState(false);

    const { theme } = useContext(ThemeContext);
    const storageService = new StorageService();
    const itemsPerPage = 9;

    // Load items from storage on component mount
    useEffect(() => {
        setItems(storageService.getItems());
    }, []);

    // Display notification message with auto-hide
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    // Get functions from ToDoFunctions
    const todoFunctions = ToDoFunctions({ 
        formData, setFormData, editFormData, setEditFormData,
        setItems, setEditItem, items, editItem, storageService, showNotification
    });

    // Filter items based on selected category
    const filteredItems = items.filter(item => filter === "all" || item.status === filter);
    
    // Calculate pagination
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle modal confirmation and show appropriate animation
    const handleModalConfirm = () => {
        if (modalAction.type === 'update') {
            if (modalAction.status === 'consumed') {
                setShowCelebration(true);
            } else if (modalAction.status === 'trash') {
                setShowWasteWarning(true);
            }
        }
        todoFunctions.handleModalConfirm(modalAction, setShowModal);
    };

    return (
        <>
            <div className="todos-spacer"></div>
            <div className={`container`} style={{ marginTop: '10px' }}>
                {/* Form for adding new items */}
                <AddItemForm 
                    theme={theme}
                    formData={formData}
                    handleInputChange={todoFunctions.handleInputChange}
                    handleAddItem={todoFunctions.handleAddItem}
                    isFormFilled={todoFunctions.isFormFilled}
                    minDate={minDate}
                />

                {/* Filter buttons */}
                <FilterButtons setFilter={setFilter} />

                {/* Items grid */}
                <div className="row g-4">
                    {currentItems.map(item => (
                        <div key={item.id} className="col-md-4">
                            <ItemCard 
                                key={item.id}
                                item={item}
                                theme={theme}
                                editItem={editItem}
                                formData={editFormData}
                                handleInputChange={todoFunctions.handleEditInputChange}
                                saveEditItem={todoFunctions.saveEditItem}
                                setEditItem={setEditItem}
                                confirmAction={(type, item, status) => {
                                    setModalAction({ type, item, status });
                                    setShowModal(true);
                                }}
                                handleEdit={todoFunctions.handleEdit}
                                status={todoFunctions.getStatus(item)}
                                statusColor={todoFunctions.getStatusColor(todoFunctions.getStatus(item))}
                                borderColor={todoFunctions.getBorderColor(item)}
                                progress={todoFunctions.calculateProgress(
                                    todoFunctions.calculateRemainingDays(item.expirationDate)
                                )}
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <Pagination 
                    totalPages={totalPages} 
                    setCurrentPage={setCurrentPage} 
                    theme={theme} 
                />

                <ConfirmationModal 
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onConfirm={handleModalConfirm}
                    actionType={modalAction.type}
                    status={modalAction.status}
                />

                {showCelebration && (
                    <CelebrationAnimation onComplete={() => setShowCelebration(false)} />
                )}
                {showWasteWarning && (
                    <WasteWarningAnimation onComplete={() => setShowWasteWarning(false)} />
                )}

                <NotificationAlert notification={notification} />
            </div>
        </>
    );
};

// Component for adding new items to the list
const AddItemForm = ({ theme, formData, handleInputChange, handleAddItem, isFormFilled, minDate }) => (
    <div className="mb-3">
        <input type="text" className={`form-control mb-2 ${theme}`} name="text" placeholder="New Ingredient" value={formData.text} onChange={handleInputChange} />
        <input type="date" className={`form-control mb-2 ${theme}`} name="expirationDate" min={minDate} value={formData.expirationDate} onChange={handleInputChange} />
        <input type="number" className={`form-control mb-2 ${theme}`} name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} />
        <select className={`form-control ${theme}`} name="unit" value={formData.unit} onChange={handleInputChange}>
            <option value="pieces">Pieces</option>
            <option value="liter">Liter</option>
            <option value="kg">Kg</option>
            <option value="grams">Grams</option>
        </select>
        <button className="btn btn-primary mt-2" onClick={handleAddItem} disabled={!isFormFilled}>Add</button>
    </div>
);

// Filter buttons component for category selection
const FilterButtons = ({ setFilter }) => (
    <div className="mb-3 filter-buttons">
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("all")}>All</button>
        <button className="btn btn-outline-success me-2" onClick={() => setFilter("consumed")}>Consumed</button>
        <button className="btn btn-outline-danger me-2" onClick={() => setFilter("rotten")}>Rotten</button>
        <button className="btn btn-outline-warning me-2" onClick={() => setFilter("trash")}>Trash</button>
        <button className="btn btn-outline-info" onClick={() => setFilter("active")}>Active</button>
    </div>
);

// Pagination controls component
const Pagination = ({ totalPages, setCurrentPage, theme }) => (
    <nav>
        <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
                <li key={index} className="page-item">
                    <button onClick={() => setCurrentPage(index + 1)} className={`page-link ${theme}`}>
                        {index + 1}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

export default List;