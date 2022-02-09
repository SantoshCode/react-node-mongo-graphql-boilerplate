import { gql, useMutation, useQuery } from "@apollo/client"
import { FC } from "react"
import { DeleteProduct as DeleteProductData, DeleteProductVariables } from "./__generated__/DeleteProduct"
import { Products as ProductData } from "./__generated__/Products"

const PRODUCTS = gql`
    query Products {
        products {
            id
            title
            image
            price
        }
    }
`

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const Products: FC<Props> = ({ title }) => {
    const { data, refetch, loading, error } = useQuery<ProductData>(PRODUCTS)
    const [handleDeleteProduct, { loading: deleteProductLoading, error: deleteProductError }] = useMutation<
        DeleteProductData,
        DeleteProductVariables
    >(DELETE_PRODUCT)

    const deleteProduct = async (id: string) => {
        await handleDeleteProduct({ variables: { id } })
        refetch()
    }
    const products = data ? data.products : null

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2 style={{ color: "red" }}>Uh oh! Something went wrong - please try again later :(</h2>

    const deleteProductLoadingMessage = deleteProductLoading ? <h4>Deletion in progress...</h4> : null
    const deleteProductErrorMessage = deleteProductError ? <h4>Uh oh! Something went wrong - please try again later :(</h4> : null

    return (
        <div>
            <h2>{title}</h2>

            {products &&
                products.map((product) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <button onClick={() => deleteProduct(product.id)}>Delete a product!</button>
                    </div>
                ))}
            {deleteProductLoadingMessage}
            {deleteProductErrorMessage}
        </div>
    )
}
