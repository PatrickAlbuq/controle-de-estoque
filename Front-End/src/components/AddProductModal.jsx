import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import addProduct from '../api/addProduct'


export default function Modal({ isOpen, setModalOpen }) {
  const { handleSubmit, register, reset } = useForm()

  const handdleSubmitData = async (data) => {
    try {
      await addProduct(data)

      setModalOpen()
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (isOpen) {
    return (
      <div style={{
        position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', backgroundColor: 'rgb(0,0,0, 0.65)', zIndex: '1000'
      }}>
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: '#2e2e2e', borderRadius: '15px', color: 'black'
        }}>
          <div className='closeIcon' style={{ cursor: 'pointer', float: 'right', padding: '15px' }} onClick={setModalOpen}>
            ❌
          </div>
          <div>
            <>
              <h2 style={{ textAlign: 'center', color: 'white' }}>Adicionar produto</h2>
              <form
                onSubmit={handleSubmit(handdleSubmitData)}
                style={{
                  minWidth: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  marginTop: '18px'
                }}
              >
                <input type='text' {...register('code')} placeholder='Código' style={{ margin: '0 10%', padding: '5px' }} />
                <input type='text' {...register('name')} placeholder='Nome' style={{ margin: '0 10%', padding: '5px' }} />
                <input type='text' {...register('description')} placeholder='Descrição' style={{ margin: '0 10%', padding: '5px' }} />
                <input type='number' {...register('quantity')} placeholder='Quantidade' style={{ margin: '0 10%', padding: '5px' }} />

                <div style={{ margin: '20px 10%', display: 'flex', justifyContent: 'space-between' }}>
                  <button type='button' style={{ minWidth: '40%' }} onClick={setModalOpen}>Cancelar</button>
                  <button type='submit' style={{ minWidth: '40%' }}>Adicionar</button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    )
  }

  return null
}