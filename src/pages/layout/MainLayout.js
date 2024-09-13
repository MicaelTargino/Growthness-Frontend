import NavHeader from "../../components/NavHeader"
import SideBar from "../../components/SideBar"

const MainLayout = ({children, sectionActive}) => {
    return (
        <section className='w-[100vw] max-w-[100vw] h-[100vh] bg-lightest flex'>
            <SideBar SectionActive={sectionActive} />
            <NavHeader absolute={true} />
            <main className='w-full p-2 md:p-6'>
                <section className='mt-16'>
                    {children}
                </section>
            </main>
        </section>
    )
}

export default MainLayout