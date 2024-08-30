export default async function getProductsInfo() {
    const response = await fetch('http://localhost:3000/products-info');
    const data = await response.json();
    return data;
}
