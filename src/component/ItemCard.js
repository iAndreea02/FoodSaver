// Import necessary dependencies and components
import React from 'react';
import ProgressBar from './ProgressBar';
import { FaCheck, FaTrash, FaEdit, FaTimes, FaSkull, FaRegSave, FaUndo, FaExclamationTriangle } from 'react-icons/fa';
import './style/ItemCard.css';

// Main ItemCard component - Displays a food item with its details and action buttons
const ItemCard = ({ 
    item,  // Item data object
    theme, // Current theme (light/dark)
    editItem, // Item being edited
    formData, // Form data for editing
    handleInputChange, // Handler for input changes
    saveEditItem, // Handler for saving edits
    setEditItem, // Setter for edit state
    confirmAction, // Handler for confirming actions
    handleEdit, // Handler for edit mode
    status, // Current item status
    statusColor, // Color based on status
    borderColor, // Border color based on status
    progress // Progress value for progress bar
}) => {
    // Check if this item is being edited
    const isEditing = editItem && editItem.id === item.id;
    return (
        <div className={`card ${theme} ${borderColor} ${isEditing ? 'editing' : ''}`}>
            <div className="card-body">
                {editItem && editItem.id === item.id ? (
                    <EditForm 
                        theme={theme}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        saveEditItem={saveEditItem}
                        setEditItem={setEditItem}
                    />
                ) : (
                    <CardContent 
                        item={item}
                        status={status}
                        statusColor={statusColor}
                        progress={progress}
                        confirmAction={confirmAction}
                        handleEdit={handleEdit}
                    />
                )}
            </div>
        </div>
    );
};

// CardContent component - Displays the non-editing view of the card
const CardContent = ({ item, status, statusColor, progress, confirmAction, handleEdit }) => (
    <>
        <h5 className="card-title" style={{ textDecoration: item.completed ? "line-through" : "none" }}>
            {item.text} - {item.quantity} {item.unit}
        </h5>
        <p className={`card-text ${statusColor}`}>{status}</p>
        {item.status !== "consumed" && item.status !== "rotten" && item.status !== "trash" && (
            <ProgressBar progress={progress} />
        )}
        {status.includes("Expired") && (
            <FaExclamationTriangle className="expired-icon" onClick={() => confirmAction('update', item, 'rotten')} />
        )}
        <div className="action-buttons">
            {item.status === "consumed" || item.status === "trash" || item.status === "rotten" ? (
                <>
                    <button className="btn btn-info" onClick={() => confirmAction('update', item, 'active')}>
                        <FaUndo />
                        <span className="tooltip-custom">Restore Item</span>
                    </button>
                    <button className="btn btn-danger" onClick={() => confirmAction('delete', item)}>
                        <FaTrash />
                        <span className="tooltip-custom">Delete Permanently</span>
                    </button>
                </>
            ) : (
                <>
                    <button className="btn btn-success" onClick={() => confirmAction('update', item, 'consumed')}>
                        <FaCheck />
                        <span className="tooltip-custom">Mark as Consumed</span>
                    </button>
                    <button className="btn btn-danger" onClick={() => confirmAction('update', item, 'trash')}>
                        <FaSkull />
                        <span className="tooltip-custom">Mark as Wasted</span>
                    </button>
                    <button className="btn btn-warning" onClick={() => confirmAction('delete', item)}>
                        <FaTrash />
                        <span className="tooltip-custom">Delete Item</span>
                    </button>
                    <button className="btn btn-info" onClick={() => handleEdit(item)}>
                        <FaEdit />
                        <span className="tooltip-custom">Edit Item</span>
                    </button>
                </>
            )}
        </div>
    </>
);

// EditForm component - Displays the editing form for the card
const EditForm = ({ theme, formData, handleInputChange, saveEditItem, setEditItem }) => (
    <>
        <input type="text" className={`form-control mb-2 ${theme}`} name="text" value={formData.text} onChange={handleInputChange} />
        <input type="date" className={`form-control mb-2 ${theme}`} name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} />
        <input type="number" className={`form-control mb-2 ${theme}`} name="quantity" value={formData.quantity} onChange={handleInputChange} />
        <select className={`form-control mb-2 ${theme}`} name="unit" value={formData.unit} onChange={handleInputChange}>
            <option value="pieces">Pieces</option>
            <option value="liter">Liter</option>
            <option value="kg">Kg</option>
            <option value="grams">Grams</option>
            <option value="litru">Litru</option>
            <option value="gram">Gram</option>
        </select>
        <div className="edit-buttons">
            <button className="btn btn-primary" onClick={saveEditItem}>
                <FaRegSave />
                <span className="tooltip-custom">Save Changes</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setEditItem(null)}>
                <FaTimes />
                <span class="tooltip-custom">Cancel Edit</span>
            </button>
        </div>
    </>
);

export default ItemCard;
