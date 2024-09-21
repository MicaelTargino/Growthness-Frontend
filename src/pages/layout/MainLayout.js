import NavHeader from "../../components/NavHeader"
import SideBar from "../../components/SideBar"

const MainLayout = ({children, sectionActive}) => {
    return (
        <section className='box-border w-[100vw] max-w-[100vw] overflow-x-hidden h-[100%] min-h-[100vh] bg-lightest flex'>
            <SideBar SectionActive={sectionActive} />
            <NavHeader absolute={true} />
            <main className='box-border w-full p-1 sm:p-2 md:p-6'>
                <section className='mt-16'>
                    {children}
                </section>
            </main>
        </section>
    )
}

export default MainLayout