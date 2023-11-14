export const HotPost = ({hideModal}) => {
    return (
        <>
        <div className=" w-1/4 fixed float-left">
        <ul className="bg-red-500 rounded-lg m-2">
            <li className="border-b py-1 black text-center">Hot Post</li>
            <li className="border-b black">1</li>
            <li className="border-b black">1</li>
            <li className="border-b black">1</li>
            <li className="border-b black">1</li>
            <li className="border-b black">1</li>
            <li className="border-b black">1</li>
        </ul>
        <button onClick={() => hideModal(true)} className="m-2 bg-blue-300 py-2 px-3 rounded-lg text-white">Create your own content </button>
    </div>
    
        </>
    )
}