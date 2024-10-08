export default async function addProduct(data) {
    const response = await fetch('http://localhost:3000/create-product', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}
