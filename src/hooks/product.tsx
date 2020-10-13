import React, { createContext, useCallback, useContext, useState } from 'react';

interface ProductContextState {
    product_id: string;
    content_id: string;
    setProductId(id: string): void;
    setContentId(id: string): void;
}

const ProductContext = createContext<ProductContextState>({} as ProductContextState);

export function useProduct(): ProductContextState {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('productContext must be used within an Provider');
    }

    return context;
}

export const ProductProvider: React.FC = ({ children }) => {
    const [productId, setProductId] = useState('');
    const [contentId, setContentId] = useState('');

    const handleSetProductId = useCallback((id: string) => {
        setProductId(id);
    }, [setProductId]);

    const handleSetContentId = useCallback((id: string) => {
        setContentId(id);
    }, [setContentId]);

    return (
        <ProductContext.Provider value={{
            product_id: productId,
            content_id: contentId,
            setProductId: handleSetProductId,
            setContentId: handleSetContentId
        }}>
            {children}
        </ProductContext.Provider>
    )
}