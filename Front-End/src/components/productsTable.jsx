import React, { useEffect, useState } from 'react';
import getProductsInfo from '../api/getProducts';

const TableComponent = ({ styles }) => {
    const [products, setProducts] = useState([]);

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
                            <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>{item.name}</td>
                            <td style={{ textAlign: 'center', borderRight: '1px solid white', padding: '0 15px' }}>{item.description}</td>
                            <td style={{ textAlign: 'center', padding: '0 15px' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
