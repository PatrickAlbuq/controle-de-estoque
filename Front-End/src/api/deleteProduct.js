export default async function updateProduct(id) {
    await fetch('http://localhost:3000/delete-product', {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado com sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro ao atualizar o produto:', error);
        });;
}