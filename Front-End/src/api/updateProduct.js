export default async function updateProduct(data) {
    await fetch('http://localhost:3000/update-product', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado com sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro ao atualizar o produto:', error);
        });;
}