import React, { useEffect, useState } from 'react';
import getProductsInfo from '../api/getProducts';
import { FaEdit, FaSave } from 'react-icons/fa';
import updateProduct from '../api/updateProduct';

const TableComponent = ({ styles }) => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});


    const editProduct = (editedObject) => {
        const updatedProducts = products.map(product => {
            if (product.id === editedObject.id) {
                return {
                    ...product,
                    name: editedObject.name,
                    description: editedObject.description,
                    quantity: editedObject.quantity,
                }; // Atualiza a quantidade
            }
            return product; // Retorna o produto inalterado
        });
        setProducts(updatedProducts); // Atualiza o estado com a nova lista
    };

    const handleEditProduct = (id) => {
        setEditProductId(id);
        const product = products.find((product) => product.id === id);
        setEditedProduct(product);
    };

    const handleSaveProduct = async () => {
        const { code, ...editedObject } = editedProduct;
        await updateProduct(editedObject);
        setEditProductId(null);
        editProduct(editedObject)
    };

    useEffect(() => {
        async function getProducts() {
            const result = await getProductsInfo();
            setProducts(result.data);
        }
        getProducts();
    }, [products]);


    return (
        <div style={{ widows: '100%' }}>
            <table style={{ ...styles, width: '100%', borderCollapse: 'separate', borderSpacing: '0 25px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', padding: '0 15px' }}>Código</th>
                        <th style={{ textAlign: 'center', padding: '0 15px' }}>Nome</th>
                        <th style={{ textAlign: 'center', padding: '0 15px' }}>Descrição</th>
                        <th style={{ textAlign: 'center', padding: '0 15px' }}>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id} style={{ textAlign: 'center' }}>
                            <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>{item.code}</td>
                            {/* <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>{item.name}</td> */}
                            <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>
                                {editProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProduct.name}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            {/* <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>{item.description}</td> */}
                            <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>
                                {editProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProduct.description}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>
                            {/* <td style={{ textAlign: 'center', padding: '0 15px' }}>{item.quantity}</td> */}
                            <td>
                                {editProductId === item.id ? (
                                    <input
                                        type="number"
                                        value={editedProduct.quantity}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                                    />
                                ) : (
                                    item.quantity
                                )}
                            </td>
                            <td>
                                {editProductId === item.id ? (
                                    <FaSave onClick={handleSaveProduct} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <FaEdit onClick={() => handleEditProduct(item.id)} style={{ cursor: 'pointer' }} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
