import { useState } from 'react';

const useCollapse = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    return [isOpen, handleClick];
};

export default useCollapse;