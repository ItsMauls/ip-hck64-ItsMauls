export const LandingPage = () => {
    return (
    <>
    <nav className="bg-blue-50">
        <ul>
            <li><img className="h-24" src="src/assets/transparent_maukucing.png" alt="" /></li>
        </ul>
    </nav>
 
     <img src="src/assets/background-kucing_cropped.png" alt="" />   

        <div className=" bg-cyan-50 z-40 bottom-40 left-2/4 absolute mx-auto w-1/4 rounded-xl border-2 border-red-900">
            <h1 className="bg-red-100 border-b-2 text-center py-4 border-red-900 rounded-t-xl">Gerbang Untuk Menuju MauKucing</h1>
            <h1 className="text-center my-4 text-5xl text-red-900 font-bold">MAUKUCING</h1>
            <input className="block px-14 mx-auto rounded-lg text-center bg-cyan-500 py-2 placeholder:text-white" type="email" placeholder="Email"/>
            <input className="block px-14 mx-auto rounded-lg text-center bg-orange-200 py-2 my-8 placeholder:text-white"  type="password" placeholder="Password"/>
            <button className="mx-auto bg-cyan-500 flex justify-center items-center my-6 rounded-xl px-4 py-2 text-white">Login Sekarang Yuk</button>
        </div>
    
    </>
    )
}