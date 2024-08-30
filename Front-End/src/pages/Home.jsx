import { useState } from 'react'
import Modal from '../components/AddProductModal'
import TableComponent from '../components/productsTable'

function Home({ style }) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Sistema de Controle de Estoque</h1>
            <div className='Home' style={{ ...style }}>
                <div style={{ width: '75em' }}>
                    <button onClick={() => setOpenModal(true)} style={{ margin: '20px' }}>Adicionar Produto</button>
                </div>
                <div style={{ width: '75em', border: '2px solid grey', borderRadius: '40px / 40px' }}>
                    <h1 style={{ margin: '15px', borderBottom: '0.5px solid grey', paddingBottom: '10px' }}>Produtos</h1>
                    <TableComponent />
                </div>
                <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

            </div >
        </>
    )
}

export default Home
