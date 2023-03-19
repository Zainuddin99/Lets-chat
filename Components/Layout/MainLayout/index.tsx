import Header from "../../Basics/Header"
import { Layout } from "../types"

function MainLayout({ children }: Layout) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default MainLayout