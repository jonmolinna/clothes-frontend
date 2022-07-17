import { useState } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    const deleteItem = () => setIsDeleting(true);

    return [isOpen, openModal, closeModal, isDeleting, deleteItem];
}

export default useModal;